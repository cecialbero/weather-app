const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCoding = require('./utils/geocoding.js');
const forecast = require('./utils/forecast.js');

const app = express()
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

const data = {
    title: 'Weather App',
    name: 'Ceci'
}

// Setting routes

// Render: render the handlebar template with the data
app.get('', (req, res) => {
    res.render('index', data)
})

app.get('/about', (req, res) => {
    res.render('about', data)
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCoding(req.query.address, (data, error) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(data.lat, data.lon, (info, error) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: info,
                location: data.location,
                address: req.query.address
            })
        })
    });
})


app.get('/help', (req, res) => {
    res.send({
        name: 'Ceci',
        age: 39
    })
})

// For sub pages coming from help
app.get('/help/*', (req, res) => {
    res.send('No help article founds')
})

// Send: send data back to the view, 404 needs to be the last route
app.get('*', (req, res) => {
    res.render('404', data)
})

// To work locally
// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})