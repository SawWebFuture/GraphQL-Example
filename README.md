# GraphQL-Example with GraphQL Interface
Providing a GraphQL Example for Employers. Ask for what you need, get exactly that!

### Description
Using Node JS and Express, we create a GraphQL example. GraphQL is a powerful query language for API. It allows us to target specific information without having to have many different requests. 

### GraphQL in use
GraphQL provides a complete and understandable description of the data in an API. We get to ask for exactly what we need need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

#### TODO
With more time, I will be creating a full database web app in the coming weeks. This was simply a quick overview.

#### Dummy Data

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

#### Install instructions

1. Download
2. run 'npm install' to import packages
3. start with 'npm devStart'
4. Open localhost http://localhost:5000/graphql?
5. Try commands:

//All Album names
{
	albums {
		name
	}
}

//All Musician names
{
	musicians {
		name
	}
}

//Single Album
{
	album( id:1 ){
    name
  }
}

//Single Musician
{
	musician( id:1 ){
    name
  }
}

//Add album
mutation{
  addAlbum(name: "Tropical", musicianId: 1){
    id
    name
  }
}

//Add musician
mutation{
  addMusician(name: "Tom Ze"){
    id
    name
  }
}

etc...

#### Play and be happy!
