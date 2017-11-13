# ES6 project

In this project we will create an IMDB like website

# Preperation
es6 modules, classes, etc (import, export)
promises
fetch
async, await
css grid and/or flexbox

## CSS
Use pure css for styling (no css frameworks)
Use CSS grids & flexbox for layout
Use font-awesome for icons

### Responsiveness
minimum resolution 360px
360px to 1024px
above 1024px

## Directory structure

* server
    * db.json
    * package.json
* client
    * css
    * scripts
    * index.html - home page
    * movie.html - shows the full movie details
    * editmovie.html - has two modes, edit and new movie
    * package.json

## Milestone - prepare the server
1. install json-server: https://github.com/typicode/json-server 
1. serve the db.json file found
1. test it using Postman, preform the following tasks:
    * GET the movies
    * Update a movie with POST
    * Create a new movie with PUT
    * DELETE a movie

## Milestone - prepare the client
1. create a client directory structure, an index.html and style.css
1. install http-server: https://www.npmjs.com/package/http-server 
1. add a fetch to get the data from the server 
1. serve it and check everything works properly


## Milestone - Home page
1. create the site layout: header, main, aside
1. fetch the movies data
1. create the rendering logic to display all the movies
1. check responsiveness

## Milestone - Sidebar
1. in the sidebar, display an aggrigate of directors. displaying each directors name and the number of films he directed in parastasis
1. likewise for actors
1. clicking an actor/director name will display all the movies by him/her

## Milestone - Search
1. Add a search field above the movies main section
1. writing in the search field will filter the movies according to the title name

## Milestone - Movie Page
1. clicking on a movie in the homepage will lead to a movie page that will display all its info

## Milestone - Delete movie
1. add a delete button in the movie page
1. clicking it will display a confirm message. if confirmed it will delete the movie from the db and redirect to the home page

## Milestone - Add movie
1. Add an add button in the home page. clicking it will lead to `editmovie.html?new=true`
1. this page will contain a form that allows to add a movie to the db

## Milestone - Edit movie
1. Add an edit button in the movie page. clicking it will lead to `editmovie.html?id={movieId}`
2. this will lead to the same page as the add functionality but it will be prefilled with the movie details.