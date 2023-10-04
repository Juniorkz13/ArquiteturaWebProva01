const mongoose = require('mongoose')
const Markers = mongoose.model('Markers', {
    name: String,
    position: [Number]
})

module.exports = Markers
