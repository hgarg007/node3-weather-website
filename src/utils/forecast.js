const request = require('request')

const forecast = ( latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/21f5ddb6bc60052f9627c6645c833501/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, { body }) => {

        if(error) {
            callback('Network error', undefined)
        } else if(body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            const temp = body.currently.temperature
            const percip = body.currently.percipProbability
            callback(undefined, 'It is currently ' + temp + ' degrees out.')
        }
    })
}

module.exports = forecast