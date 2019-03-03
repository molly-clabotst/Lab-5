let url = 'https://api.wheretheiss.at/v1/satellites/25544';

let issLat = document.querySelector('#iss-lat');
let issLong = document.querySelector('#iss-long');
let time = document.querySelector('#time');

var issMarker;
var update = 10000;

let map = L.map('ISS-Map').setView([0,0],1);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={access token}',{
    attribution: 'Map data &copy: <a href="https://www.openstreetmap.org/">OpenStreeMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9sbHlkZXZkb3QiLCJhIjoiY2pzNWJucDZjMGUzdjQ0bzdmMnVwaHgxMCJ9.fRp9Lg8R5UAZ8clmrGmG5Q'
}).addTo(map);

var icon = L.icon({
    iconUrl:'iss.png',
    iconSize:[50,50],
    iconAnchor:[25,25]
})

let max_failed_attempts = 3;
iss(max_failed_attempts);

function iss(attempts){
    if(attempts<=0){
        console.log('Too many errors, abandoning requests to get ISS position.')
        return
    }
    fetch(url)
        .then( res => res.json())
        .then( issData =>{
            console.log(issData);
            let lat = issData.latitude;
            let long = issData.longitude;
            issLat.innerHTML = lat;
            issLong.innerHTML = long;

            if(!issMarker){
                issMarker = L.marker([lat, long], {icon: icon}).addTo(map);
            } else {
                issMarker.setLatLng([lat, long]);
            }
            let date = new Date();
            time.innerHTML = date.toString();
        })
        .catch( err =>{
            console.log(err)
        })
        .finally( () =>{
            setTimeout(iss, update, attempts)
    })
}

