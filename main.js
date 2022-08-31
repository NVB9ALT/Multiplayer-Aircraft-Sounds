//function to get low-rpm sounds (input is aircraft id)
function fetchAircraftSoundsLow(aircraft1) {
try {
if (aircraft1 == 1) {
   return "https://geo-fs.com/sounds/rotax/rpm1.ogg"
}
if (aircraft1 == 2) {
   return "https://geo-fs.com/sounds/o235/rpm1.ogg"
}
if (aircraft1 == 3) {
   return "https://geo-fs.com/sounds/jet/rpm1.ogg"
}
if (aircraft1 == 4) {
   return "https://geo-fs.com/sounds/737/rpm0.ogg"
}
if (aircraft1 == 5) {
   return "https://geo-fs.com/sounds/phenom/rpm0.ogg"
}
if (aircraft1 == 6) {
   return "https://geo-fs.com/sounds/737/rpm0.ogg" //this is the Twin Otter but the sounds are not 6 sec long
}
if (aircraft1 == 7) {
   return "https://geo-fs.com/sounds/f16/rpm0.ogg"
}
if (aircraft1 == 8) {
   return "https://geo-fs.com/sounds/pitts/rpm1.ogg"
}
if (aircraft1 == 9) {
   return "https://geo-fs.com/sounds/ec135/rpm2.ogg"
}
if (aircraft1 == 10) {
   return "https://geo-fs.com/sounds/a380/rpm1.ogg"
}
if (aircraft1 == 12) {
   return "https://geo-fs.com/sounds/pc7/turbine.ogg"
}
if (aircraft1 == 13) {
   return "https://geo-fs.com/models/aircraft/premium/dhc2/sounds/rpm0.ogg"
}
if (aircraft1 == 14) {
   return "https://geo-fs.com/models/aircraft/premium/cricri/sounds/rpm1.ogg"
}
if (aircraft1 == 15) {
   return "https://geo-fs.com/sounds/p38/rpm0.ogg"
}
if (aircraft1 == 16) {
   return "https://geo-fs.com/sounds/dc3/rpm1.ogg"
}
if (aircraft1 == 18) {
   return "https://geo-fs.com/sounds/su35/rpm1.ogg"
}
} catch(error) {
throw("Error: sound loading failed 1. " + error)
}
}
//function to get high-rpm sounds (input is, again, aircraft id)
function fetchAircraftSoundsHigh(aircraft2) {
try {
if (aircraft2 == 1) {
   return "https://geo-fs.com/sounds/rotax/rpm4.ogg"
}
if (aircraft2 == 2) {
   return "https://geo-fs.com/sounds/o235/rpm4.ogg"
}
if (aircraft2 == 3) {
   return "https://geo-fs.com/sounds/jet/rpm3.ogg"
}
if (aircraft2 == 4) {
   return "https://geo-fs.com/sounds/737/rpm2.ogg"
}
if (aircraft2 == 5) {
   return "https://geo-fs.com/sounds/737/rpm2.ogg"
}
if (aircraft2 == 6) {
   return "https://geo-fs.com/sounds/737/rpm2.ogg"
}
if (aircraft2 == 7) {
   return "https://geo-fs.com/sounds/f16/rpm2.ogg"
}
if (aircraft2 == 8) {
   return "https://geo-fs.com/sounds/pitts/rpm3.ogg"
}
if (aircraft2 == 9) {
   return "https://geo-fs.com/sounds/ec135/rpm2.ogg"
}
if (aircraft2 == 10) {
   return "https://geo-fs.com/sounds/a380/rpm4.ogg"
}
if (aircraft2 == 12) {
   return "https://geo-fs.com/sounds/pc7/prop.ogg"
}
if (aircraft2 == 13) {
   return "https://geo-fs.com/models/aircraft/premium/dhc2/sounds/rpm1.ogg"
}
if (aircraft2 == 14) {
   return "https://geo-fs.com/models/aircraft/premium/cricri/sounds/rpm2.ogg"
}
if (aircraft2 == 15) {
   return "https://geo-fs.com/sounds/p38/rpm2.ogg"
}
if (aircraft2 == 16) {
   return "https://geo-fs.com/sounds/dc3/rpm4.ogg"
}
if (aircraft2 == 18) {
   return "https://geo-fs.com/sounds/su35/rpm4.ogg"
}
} catch(error) {
throw("Error: sound loading failed 2. " + error)
}
}
//some method of correcting for wind is needed (i think)
var lastAirspeed = null;
function computeSounds() {
//for every visible user
Object.values(multiplayer.visibleUsers).forEach(function(e){
//previous airspeed
lastAirspeed = e.lastUpdate.st.as
//after five seconds, has airspeed changed or something?
setTimeout(() => {
	if (e.referencePoint.lla[2] - geofs.aircraft.instance.llaLocation[2] <= 1000 && geofs.aircraft.instance.llaLocation[2] - e.referencePoint.lla[2] <= 1000 && e.distance < 500 && e.lastUpdate.st.as >= 50 && (e.lastUpdate.st.as - lastAirspeed) >= -1) {
audio.impl.html5.playFile(fetchAircraftSoundsHigh(e.aircraft))
	} else if (e.referencePoint.lla[2] - geofs.aircraft.instance.llaLocation[2] <= 1000 && geofs.aircraft.instance.llaLocation[2] - e.referencePoint.lla[2] <= 1000 && e.distance < 500 && e.lastUpdate.st.as <= 49 && (e.lastUpdate.st.as - lastAirspeed) >= 5) {
audio.impl.html5.playFile(fetchAircraftSoundsHigh(e.aircraft))
	} else if (e.referencePoint.lla[2] - geofs.aircraft.instance.llaLocation[2] <= 1000 && geofs.aircraft.instance.llaLocation[2] - e.referencePoint.lla[2] <= 1000 && e.distance < 500) {
audio.impl.html5.playFile(fetchAircraftSoundsLow(e.aircraft))
	}
	},5750)
})
};
//most aircraft sound files are about six seconds long - so we set the interval to that
multiplayerSoundInterval = setInterval(function(){computeSounds()},6000)
