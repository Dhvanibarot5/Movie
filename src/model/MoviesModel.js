const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

const imagefolder = '/uploads'

const movieschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    releasedate: {
        type: Date,
        required: true
    },
    actors: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
})

const storage = multer.diskStorage({
    destination: function(request, file, callback){
        callback(null, path.join(__dirname, '..', imagefolder))
    },
    filename: function(request, file, callback){
        callback(null, file.fieldname + '-' + Date.now())
    }
})

movieschema.statics.uploadimage = multer({storage: storage}).single('poster')
movieschema.statics.imagepath = imagefolder

module.exports = mongoose.model('Movie', movieschema)