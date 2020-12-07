const express = require('express')
const { graphqlHTTP } = require("express-graphql");

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const app = express()

const musicians = [
    { id: 1, name: 'Jorge Ben Jor' },
    { id: 2, name: 'Gilberto Gil' },
    { id: 3, name: 'Arnaldo Antunes' }
]

const albums = [
    { id: 1, name: 'A Tabula de Esmeralda', musicianId: 1 },
    { id: 2, name: 'Afica Brasil', musicianId: 1 },
    { id: 3, name: 'Samba Esquema Novo', musicianId: 1 },
    { id: 4, name: 'Realce', musicianId: 2 },
    { id: 5, name: 'Naya Ngan Daya', musicianId: 2 },
    { id: 6, name: 'Luar', musicianId: 2 },
    { id: 7, name: 'Ninguem', musicianId: 3 },
    { id: 8, name: 'Um Som', musicianId: 3 },
    { id: 9, name: 'Nome', musicianId: 3 }
]

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    description: 'This represents an album by a musician',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        musicianId: { type: GraphQLNonNull(GraphQLInt) },
        musician: {
            type: MusicianType,
            resolve: (album) => {
                return musicians.find(musician => musician.id === album.musicianId)
            }
        }
    })
})

const MusicianType = new GraphQLObjectType({
    name: 'Musician',
    description: 'This represents an musician of an album',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        albums: {
            type: new GraphQLList(AlbumType),
            resolve: (musician) => {
                return albums.filter(album => album.musicianId === musician.id)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        album: {
            type: AlbumType,
            description: 'A single album',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => albums.find(album => album.id === args.id)
        },
        albums: {
            type: new GraphQLList(AlbumType),
            description: 'List of all albums',
            resolve: () => albums
        },
        musicians: {
            type: new GraphQLList(MusicianType),
            description: 'List of all musicians',
            resolve: () => musicians
        },
        musician: {
            type: MusicianType,
            description: 'A single musician',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => musicians.find(musician => musician.id === args.id)
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addAlbum: {
            type: AlbumType,
            description: 'Add an album',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                musicianId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const album = { id: albums.length + 1, name: args.name, musicianId: args.musicianId }
                albums.push(album)
                return album
            }
        },
        addMusician: {
            type: MusicianType,
            description: 'Add a musician',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const musician = { id: musicians.length + 1, name: args.name }
                musicians.push(musician)
                return musician
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(5000., () => console.log('Server Running'))