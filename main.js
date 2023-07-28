
//function to get low-rpm sounds (input is aircraft id)
function fetchAircraftSoundsLow(aircraft1) {
try {
if (aircraft1 == 1) {
   return "https://www.geo-fs.com/sounds/rotax/rpm1.ogg"
}
if (aircraft1 == 2) {
   return "https://www.geo-fs.com/sounds/o235/rpm1.ogg"
}
if (aircraft1 == 3) {
   return "https://www.geo-fs.com/sounds/jet/rpm1.ogg"
}
if (aircraft1 == 4) {
   return "https://www.geo-fs.com/sounds/737/rpm0.ogg"
}
if (aircraft1 == 5) {
   return "https://www.geo-fs.com/sounds/phenom/rpm0.ogg"
}
if (aircraft1 == 6) {
   return "https://www.geo-fs.com/sounds/737/rpm0.ogg" //this is the Twin Otter but the sounds are not 6 sec long
}
if (aircraft1 == 7) {
   return "https://www.geo-fs.com/sounds/f16/rpm0.ogg"
}
if (aircraft1 == 8) {
   return "https://www.geo-fs.com/sounds/pitts/rpm1.ogg"
}
if (aircraft1 == 9) {
   return "https://www.geo-fs.com/sounds/ec135/rpm2.ogg"
}
if (aircraft1 == 10) {
   return "https://www.geo-fs.com/sounds/a380/rpm1.ogg"
}
if (aircraft1 == 12) {
   return "https://www.geo-fs.com/sounds/pc7/turbine.ogg"
}
if (aircraft1 == 13) {
   return "https://www.geo-fs.com/models/aircraft/premium/dhc2/sounds/rpm0.ogg"
}
if (aircraft1 == 14) {
   return "https://www.geo-fs.com/models/aircraft/premium/cricri/sounds/rpm1.ogg"
}
if (aircraft1 == 15) {
   return "https://www.geo-fs.com/sounds/p38/rpm0.ogg"
}
if (aircraft1 == 16) {
   return "https://www.geo-fs.com/sounds/dc3/rpm1.ogg"
}
if (aircraft1 == 18) {
   return "https://www.geo-fs.com/sounds/su35/rpm1.ogg"
}
} catch(error) {
throw("Error: sound loading failed 1. " + error)
}
}
//function to get high-rpm sounds (input is, again, aircraft id)
function fetchAircraftSoundsHigh(aircraft2) {
try {
if (aircraft2 == 1) {
   return "https://www.geo-fs.com/sounds/rotax/rpm4.ogg"
}
if (aircraft2 == 2) {
   return "https://www.geo-fs.com/sounds/o235/rpm4.ogg"
}
if (aircraft2 == 3) {
   return "https://www.geo-fs.com/sounds/jet/rpm3.ogg"
}
if (aircraft2 == 4) {
   return "https://www.geo-fs.com/sounds/737/rpm2.ogg"
}
if (aircraft2 == 5) {
   return "https://www.geo-fs.com/sounds/737/rpm2.ogg"
}
if (aircraft2 == 6) {
   return "https://www.geo-fs.com/sounds/737/rpm2.ogg"
}
if (aircraft2 == 7) {
   return "https://www.geo-fs.com/sounds/f16/rpm2.ogg"
}
if (aircraft2 == 8) {
   return "https://www.geo-fs.com/sounds/pitts/rpm3.ogg"
}
if (aircraft2 == 9) {
   return "https://www.geo-fs.com/sounds/ec135/rpm2.ogg"
}
if (aircraft2 == 10) {
   return "https://www.geo-fs.com/sounds/a380/rpm4.ogg"
}
if (aircraft2 == 12) {
   return "https://www.geo-fs.com/sounds/pc7/prop.ogg"
}
if (aircraft2 == 13) {
   return "https://www.geo-fs.com/models/aircraft/premium/dhc2/sounds/rpm1.ogg"
}
if (aircraft2 == 14) {
   return "https://www.geo-fs.com/models/aircraft/premium/cricri/sounds/rpm2.ogg"
}
if (aircraft2 == 15) {
   return "https://www.geo-fs.com/sounds/p38/rpm2.ogg"
}
if (aircraft2 == 16) {
   return "https://www.geo-fs.com/sounds/dc3/rpm4.ogg"
}
if (aircraft2 == 18) {
   return "https://www.geo-fs.com/sounds/su35/rpm4.ogg"
}
} catch(error) {
throw("Error: sound loading failed 2. " + error)
}
}
var lastAirspeed = null;
//control sound playing
var soundPlaying = null;
function computeSounds() {
//for every visible user
Object.values(multiplayer.visibleUsers).forEach(function(e){
//previous airspeed
lastAirspeed = e.lastUpdate.st.as
//after one second, has airspeed changed?
setTimeout(() => {
	if (e.referencePoint.lla[2] - geofs.aircraft.instance.llaLocation[2] <= 1000 && geofs.aircraft.instance.llaLocation[2] - e.referencePoint.lla[2] <= 1000 && e.distance < 1000 && e.lastUpdate.st.as >= 50 && (e.lastUpdate.st.as - lastAirspeed) >= -5 && soundPlaying != true) {
audio.impl.html5.playFile(fetchAircraftSoundsHigh(e.aircraft))
//sound is playing
soundPlaying = true;
//set sound to not playing when it finishes in about 6 seconds
setTimeout(() => {
   soundPlaying = false;
},6000)
	} else if (e.referencePoint.lla[2] - geofs.aircraft.instance.llaLocation[2] <= 1000 && geofs.aircraft.instance.llaLocation[2] - e.referencePoint.lla[2] <= 1000 && e.distance < 1000 && e.lastUpdate.st.as <= 49 && (e.lastUpdate.st.as - lastAirspeed) >= 5 && soundPlaying != true) {
audio.impl.html5.playFile(fetchAircraftSoundsHigh(e.aircraft))
e.soundPlaying = true;
setTimeout(() => {
   soundPlaying = false;
},6000)
	} else if (e.referencePoint.lla[2] - geofs.aircraft.instance.llaLocation[2] <= 1000 && geofs.aircraft.instance.llaLocation[2] - e.referencePoint.lla[2] <= 1000 && e.distance < 1000 && soundPlaying != true) {
audio.impl.html5.playFile(fetchAircraftSoundsLow(e.aircraft))
e.soundPlaying = true;
setTimeout(() => {
   soundPlaying = false;
},6000)
	}
	},1000)
})
};
multiplayerSoundInterval = setInterval(function(){computeSounds()},1000)
//debug loop
setInterval(function(){console.log(soundPlaying)},500)
