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

  keyGen = function(){
      tempPass = '';
      charLim = 57;
    possibleKeys= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z","0","1","2","3","4","5","6","7","8","9","_",".","-","~"];
    for ( i=0; i < charLim; i++){
        tempPass += possibleKeys[Math.floor(Math.random()*possibleKeys.length)];
      }
      console.log(tempPass);
      return tempPass;
      
  }();

  _getToken = function(){

    result = fetch('https://accounts.spotify.com/api/token', {
       method: 'POST',
       headers: {
           'Content-Type' : 'application/x-www-form-urlencoded', 
           'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
       },
       body: 'grant_type=client_credentials'
   });


    data = result;
    console.log(data);
   return data.access_token;
   
   

}();


var searchArtists = function(query) {
 $.ajax({
   url: 'https://api.spotify.com/v1/search',
   data: {
     q: query,
     type: 'artist'
   },
   headers: {
       "Authorization": "Bearer " + "BQC6wZf3OTPanpreZ0o7xiYkHEATe34i4krQetGZYpAf5TNZtsA7ld6r0i8omch1ku9PA_-PCTmfzmhqH0OQeGOe4QQCwgmLu0_ZJBAqQcdNyTHfjKMh-BLJwtSUky5SBJDIo0SMb9lzTLXAAm04SYU"
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
         "Authorization": "Bearer " + "BQC6wZf3OTPanpreZ0o7xiYkHEATe34i4krQetGZYpAf5TNZtsA7ld6r0i8omch1ku9PA_-PCTmfzmhqH0OQeGOe4QQCwgmLu0_ZJBAqQcdNyTHfjKMh-BLJwtSUky5SBJDIo0SMb9lzTLXAAm04SYU         "
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
         getLyrics(response.tracks[0].name);
         searchLyrics(response.tracks[0].name);
       console.log(response);
     }
   });
 };

 var getLyrics = function(arg){
     $.ajax({
         url: 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=' + arg + '&quorum_factor=1&page_size=1&apikey=0d49953ffed1270bd1dd131b139e95d1',
         success: function(response) {
             console.log(response);
             
            //getRealLyrics(response.)
         }
     })
 }

 var searchLyrics = function(arg){
    $.ajax({
        url:'http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=',
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

