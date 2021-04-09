artistName = document.getElementById('artistname'),
monthlyListen = document.getElementById('monthlyNumber'),
artistInfo = document.getElementById('artistInfo'),
trackOne = document.getElementById('trackOne'),
trackTwo = document.getElementById('trackTwo'),
trackThree = document.getElementById('trackThree'),
trackFour = document.getElementById('trackFour'),
trackFive = document.getElementById('trackFive'),
trackSix = document.getElementById('trackSix'),
trackSeven = document.getElementById('trackSeven'),
trackEight = document.getElementById('trackEight'),
trackNine = document.getElementById('trackNine'),
trackTen = document.getElementById('trackTen'),
searchArea = document.getElementById('searchHistoree'),
lyricBox = document.getElementById('lyrics')
var searchStorage = localStorage.getItem("artists");
var artists;
if(searchStorage === null){
    artists = [];
}
else{artists = JSON.parse(searchStorage);}
 
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
       "Authorization": "Bearer " + "BQBXpJ1qL5buZwR97yapox-QYobB99w7gwYKsZRs0OrILC1AiaqJ38kHcNPVrmV-TM8VbVcuHxTzimPBpjhayD5gizBkgpPdiutoiYlBXr7PPmPiG_WVoKucI_vNEXAtJ2NZIncZn9imzk0j6P7W78c"
   },
   
   success: function(response) {
       tempPic = response.artists.items[0].images[0].url;
       artistInfo.setAttribute("style","background-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(255,0,0,0)), url(" + tempPic + ")");
       artistName.innerHTML = JSON.stringify(response.artists.items[0].name);
       monthlyListen.innerHTML = JSON.stringify(response.artists.items[0].followers.total);
       id = response.artists.items[0].id;
       getTopTracks(query,id);
     console.log(response);
   }
 });
 
};

var getTopTracks = function(query,id) {
   $.ajax({
     url: 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?market=US',
     headers: {
         "Authorization": "Bearer " + "BQBXpJ1qL5buZwR97yapox-QYobB99w7gwYKsZRs0OrILC1AiaqJ38kHcNPVrmV-TM8VbVcuHxTzimPBpjhayD5gizBkgpPdiutoiYlBXr7PPmPiG_WVoKucI_vNEXAtJ2NZIncZn9imzk0j6P7W78c"
     },
     success: function(response) {
         trackOne.innerHTML = response.tracks[0].name;
         trackOne.addEventListener("click", function(){
         getLyrics(query,response.tracks[0].name);
         })
         trackTwo.innerHTML = response.tracks[1].name;
         trackTwo.addEventListener("click", function(){
          getLyrics(query,response.tracks[1].name);
          })
         trackThree.innerHTML = response.tracks[2].name;
         trackThree.addEventListener("click", function(){
          getLyrics(query,response.tracks[2].name);
          })
         trackFour.innerHTML = response.tracks[3].name;
         trackFour.addEventListener("click", function(){
          getLyrics(query,response.tracks[3].name);
          })
         trackFive.innerHTML = response.tracks[4].name;
         trackFive.addEventListener("click", function(){
          getLyrics(query,response.tracks[4].name);
          })
         trackSix.innerHTML = response.tracks[5].name;
         trackSix.addEventListener("click", function(){
          getLyrics(query,response.tracks[5].name);
          })
         trackSeven.innerHTML = response.tracks[6].name;
         trackSeven.addEventListener("click", function(){
          getLyrics(query,response.tracks[6].name);
          })
         trackEight.innerHTML = response.tracks[7].name;
         trackEight.addEventListener("click", function(){
          getLyrics(query,response.tracks[7].name);
          })
         trackNine.innerHTML = response.tracks[8].name;
         trackNine.addEventListener("click", function(){
          getLyrics(query,response.tracks[8].name);
          })
         trackTen.innerHTML = response.tracks[9].name;
         trackTen.addEventListener("click", function(){
          getLyrics(query,response.tracks[9].name);
          })
       console.log(response);
     }
   });
 };

 var getLyrics = function(query,arg){
     $.ajax({
         url: "https://api.lyrics.ovh/v1/" + query + "/" + arg,
         success: function(response) {
             console.log(response);
             lyricStuff = response.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
             lyricBox.innerHTML = lyricStuff;
         }
     })
 }


 document.getElementById('search-form').addEventListener('submit', function(e) {
 e.preventDefault();
 console.log('success!')
 searchArtists(document.getElementById('searchbox').value);
 getMusicVideos(document.getElementById('searchbox').value);
 //searchHistory(document.getElementById('searchbox').value);
}, false);

document.getElementById('search-form').addEventListener('submit', function(e) {
  searchHistory();
})

var apiKey= "AIzaSyAqMcywe4dEC4LFFRqaRmNyIPp3OK7DsMU";
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
               // addVideo();
        }
                

  });

}

/*
function searchHistory() {
    //artists.push(artistName);
    //localStorage.setItem("artists", JSON.stringify(artists) );
    button = document.createElement("button");
    button.setAttribute("style","width:100px");
    button.innerHTML = artistName.value;
    document.querySelectorAll('button')
    .forEach(button => {
      button.addEventListener('click', function() {
        searchArtists(target.textContent);
        getMusicVideos(target.textContent);
      });
    });
   
   
    // button.onclick = function(){
    //    searchArtists(target.textContent);
    //    getMusicVideos(target.textContent);
   // }

    searchArea.appendChild(button);
}


*/

