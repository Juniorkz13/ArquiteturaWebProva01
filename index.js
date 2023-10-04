const express = require('express')
const mongoose = require('mongoose')
const Markers = require('./models/Markers')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/newlocation', async (req, res) => {
    const { name, position } = req.body
    const location = { name, position }
    try {
        const newLocation = await Markers.create(location)
        res.status(201).json(newLocation)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/location', async (req, res) => {
    try {
        const location = await Markers.find()
        res.json(location)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/location/:id', async (req, res) => {
    const { id } = req.params
    try {
        const location = await Markers.findById(id)
        res.json(location)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.patch('/updatelocation/:id', async (req, res) => {
    const { id } = req.params
    const { name, position } = req.body
    const location = { name, position }
    try {
        if (name) {
            await Markers.updateOne({ _id: id }, { $set: { name } })
        } else if (position) {
            await Markers.updateOne({ _id: id }, { $set: { position } })
        }
        res.json({ message: 'Atualiazado' }, location)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.delete('/deletelocation/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Markers.deleteOne({ _id: id })
        res.json({ message: 'Deletado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/', (req, res) => {
    res.json({ message: 'Funcionando' })
})

mongoose
    .connect(
        'mongodb+srv://admin:admin@apicluster.evtkx.mongodb.net/Maps?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(
        app.listen(3000, () => {
            console.log('Conectado')
        })
    )
    .catch((err) => {
        console.log(err)
    })
