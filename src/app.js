const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.get('', (req, res)=> {
    res.render('index', {
        title: "Weather App",
        name:"Created by hgarg"
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address please.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        } 
            
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: location,
                forecastData: forecastData
            })
        })
        
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: "About me",
        name:"Himanshu Garg"
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help',
        helpText: "Help text"
    })
})

app.get('*', (req, res) => {
    res.send('My 404 page.')
})

app.listen(port, () => {
    console.log('Server is up!')
})

