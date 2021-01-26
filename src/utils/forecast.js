const request = require('postman-request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=69e84b14567cd69a8cf296e1f0f59ff4&query=${lat},${lon}`
  
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback(undefined, 'Unable to connect to the Weather server')
        } else {
            if(response.body.error) {
                callback(undefined, 'Please specify a valid location identifier using the query parameter')
            } else {
                callback(`The temperature in ${response.body.location.name} is ${response.body.current.temperature} degrees with ${response.body.current.precip}% chances of rain`, undefined)
            }
        }
    }); 
}

module.exports = forecast;

