const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGdhcmcwMDciLCJhIjoiY2p1YjU3ZDhzMDl1bjN5bWw5dTVqZnltcCJ9.Ru61ZiS999pfz2GyqrSXQA&limit=1'

    request({url, json: true}, (error, { body }) => {
    
        if(error) {
            callback('Network error', undefined)
        } else if(body.features.length == 0) {
            callback('Unable to find the location.', undefined)
        } else {
            const lat = body.features[0].center[0] 
            const long = body.features[0].center[1] 
            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode