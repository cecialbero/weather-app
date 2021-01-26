const request = require('postman-request');

const geoCoding = (place, callback) => {
  const token = 'pk.eyJ1IjoiY2VjaWFsYmVybyIsImEiOiJja2prY3d6YXU4NXc5MnVyeG9xZDE1MGppIn0.-7Re-3za5qe8GA4bti_WSg'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${token}`

  request({url: url, json:true}, (error, response) => {
    if(error) {
      callback(undefined, 'Unable to connect to the MapBox server')
    } else {
      if(response.body.features.length === 0) {
        callback(undefined, 'Location not found')
      } else {
        callback({
          lat: response.body.features[0].center[1],
          lon: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        }, undefined) 
      }
    }    
  })
}

module.exports = geoCoding;
