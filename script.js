artistName = document.getElementById('artistname'),
monthlyListen = document.getElementById('monthlyNumber')
artistInfo = document.getElementById('artistInfo')
trackOne = document.getElementById('trackOne')
trackTwo = document.getElementById('trackTwo')
trackThree = document.getElementById('trackThree')
trackFour = document.getElementById('trackFour')
trackFive = document.getElementById('trackFive')
trackSix = document.getElementById('trackSix')
trackSeven = document.getElementById('trackSeven')
trackEight = document.getElementById('trackEight')
trackNine = document.getElementById('trackNine')
trackTen = document.getElementById('trackTen')
 
  clientID = '9577ec53580a46c686cbb0729d57118e';
  clientSecret = '903925af8da34bbabffe55187620ca4b';

 /*const _getToken = async () => {

   const result = await fetch('https://accounts.spotify.com/api/token', {
       method: 'POST',
       headers: {
           'Content-Type' : 'application/x-www-form-urlencoded', 
           'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
       },
       body: 'grant_type=client_credentials'
   });


   const data = await result.json();
   return data.access_token;
  

}*/

var fetchTracks = function(albumId, callback) {
 $.ajax({
   url: 'https://api.spotify.com/v1/albums/' + albumId,
   success: function(response) {
     callback(response);
   }
 });
};

var searchArtists = function(query) {
 $.ajax({
   url: 'https://api.spotify.com/v1/search',
   data: {
     q: query,
     type: 'artist'
   },
   headers: {
       "Authorization": "Bearer " + "BQCjy4MW9zK9O6nkIxp5y0n2XSV5dwxAs94joiIAD7i0xQZeHJ7O5Nn8-TkaWXL3re8m0jJWF8NWKNb6OZJLUp2Lvv0mirH3JnIbs_40Cny5V3VuNCc8fCBvvo5IniADV9SmHrLw-y7PNuhQLvwf3sA"
   },
   success: function(response) {
       tempPic = response.artists.items[0].images[0].url;
       artistInfo.setAttribute("style","background-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(255,0,0,0)), url(" + tempPic + ")");
       artistName.innerHTML = JSON.stringify(response.artists.items[0].name);
       monthlyListen.innerHTML = JSON.stringify(response.artists.items[0].followers.total);
       id = response.artists.items[0].id;
       getTopTracks(id);
     console.log(response);
   }
 });
 
};

var getTopTracks = function(id) {
   $.ajax({
     url: 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?market=US',
     headers: {
         "Authorization": "Bearer " + "BQCjy4MW9zK9O6nkIxp5y0n2XSV5dwxAs94joiIAD7i0xQZeHJ7O5Nn8-TkaWXL3re8m0jJWF8NWKNb6OZJLUp2Lvv0mirH3JnIbs_40Cny5V3VuNCc8fCBvvo5IniADV9SmHrLw-y7PNuhQLvwf3sA"
     },
     success: function(response) {
         trackOne.innerHTML = response.tracks[0].name;
         trackTwo.innerHTML = response.tracks[1].name;
         trackThree.innerHTML = response.tracks[2].name;
         trackFour.innerHTML = response.tracks[3].name;
         trackFive.innerHTML = response.tracks[4].name;
         trackSix.innerHTML = response.tracks[5].name;
         trackSeven.innerHTML = response.tracks[6].name;
         trackEight.innerHTML = response.tracks[7].name;
         trackNine.innerHTML = response.tracks[8].name;
         trackTen.innerHTML = response.tracks[9].name;
       console.log(response);
     }
   });
 };

 var getLyrics = function(arg){
     $.ajax({
         url: 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=' + arg + '&quorum_factor=1&apikey=0d49953ffed1270bd1dd131b139e95d1',
         success: function(response) {
             console.log(response);
         }
     })
 }


 document.getElementById('search-form').addEventListener('submit', function(e) {
 e.preventDefault();
 console.log('success!')
 searchArtists(document.getElementById('searchbox').value);
 getMusicVideos(document.getElementById('searchbox').value);
 getLyrics(document.getElementById('trackOne').textContent);
}, false);


var apiKey= "AIzaSyADNoOQ9XzgB7BUXeHVLhgIFbXlbjVRq5c";
var maxResults = 10;
var searchQuery = document.getElementById("searchbox")
var video = ""
var musicVideos = document.getElementById("musicvideos")

function getMusicVideos(){
    $("#musicvideos").empty();
var artistName = document.getElementById("searchbox").value;
fetch('https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&type=video&part=snippet&maxResults='+maxResults+'&q='+artistName)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
        for(var i =0; i<data.items.length; i++){
            console.log(data.items[i].id.videoId)
            function addVideo(){
                var vidID = data.items[i].id.videoId;
                var video = document.createElement("iframe");
                video.setAttribute("width","210");
                video.setAttribute("height", "158");
                video.setAttribute("src","http://www.youtube.com/embed/"+vidID )
                musicVideos.appendChild(video);
            
            }
                addVideo();
        }
                

  });

}


// musix key 0d49953ffed1270bd1dd131b139e95d1






