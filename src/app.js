const express = require('express')
const path = require('path')
const filehandler = require('fs')
const database = require('./config/db')
const moviemodel = require('./model/MoviesModel')

const portnumber = 8002
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded())

app.get("/", async function(request, response){
    let allmovies = await moviemodel.find({})
    response.render("DashBoard", {
        'pagetitle': "Movie Collection",
        'movies': allmovies
    })
})

app.post("/addmovie", moviemodel.uploadimage, async function(request, response){
    if(request.file){
        request.body.poster = moviemodel.imagepath + '/' + request.file.filename
    }
    await moviemodel.create(request.body)
    return response.redirect("/")
})

app.get("/removemovie/:movieid", async function(request, response){
    let movie = await moviemodel.findById(request.params.movieid)
    if(movie.poster){
        let imagepath = path.join(__dirname, movie.poster)
        await filehandler.unlinkSync(imagepath)
    }
    await moviemodel.findByIdAndDelete(request.params.movieid)
    return response.redirect("/")
})

app.get("/editmovie", async function(request, response){
    let movie = await moviemodel.findById(request.query.movieid)
    return response.render('EditMovie', {
        movie,
        movieid: request.query.movieid
    })
})

app.post("/updatemovie/:id", async function(request, response){
    if(request.file){
        request.body.poster = moviemodel.imagepath + '/' + request.file.filename
    }
    await moviemodel.findByIdAndUpdate(request.params.id, request.body)
    return response.redirect("/")
})

app.get("/addmoviepage", function(request, response){
    return response.render("AddMovies") 
})

app.listen(portnumber, function(error){
    if(error) console.log(error)
    else console.log('Server running')
})