let url = "https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let issTimestamp = document.querySelector('#iss-timestamp')

let update = 10000
let maxFailedAttempts = 3
let issMarker
let issIcon = L.icon( {
    iconUrl: 'iss_icon.png', //needs to be exactly iconUrl, not iconURL
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})

let map = L.map('iss-map').setView([0, 0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailedAttempts) // call function one time to start
// setInterval(iss, update) // 10 seconds

function iss(attempts) {

    if (attempts <= 0) {
        alert('Failed to reach server after several attempts')
        return
    }

    fetch(url).then( (res) => { //promise
        return res.json() //procuess response into JSON
    }).then( (issData) => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
        let timestamp = Date()
        issTimestamp.innerHTML = `At ${timestamp} the ISS is over the following coordinates:`
        // create marker if it doesn't exist
        // move marker if it does exist

        if (!issMarker) {
            //create marker
            issMarker = L.marker([lat, long], {icon: issIcon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }
    }).catch( (err) => {
        attempts = attempts - 1 
        console.log('ERROR!', err)
    }).finally( () => {
        setTimeout(iss, update, attempts)
    })

}

/* could also be written more simply because of only one argument:
fetch(url).then( res => res.json()
.then( (issData) => {
    console.log(issData)
}).catch( (err) => {
    console.log('ERROR!', err)
})

*/