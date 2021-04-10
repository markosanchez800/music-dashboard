artist = document.getElementById('artistname'),
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
lyricBox = document.getElementById('lyrics'),
followerTitle = document.getElementById('montlhylisteners')
//var redirect_uri = "https://markosanchez800.github.io/music-dashboard/index.html"
//var AUTHORIZE = "https://accounts.spotify.com/authorize"

var artists;
var searchHistory = localStorage.getItem("artists");

if(searchHistory === null){
    artists = [];
}
else{artists = JSON.parse(searchHistory);}
 
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
       "Authorization": "Bearer " + 'BQA3BDJgabbx9Ly-k5GpUta396o9642VAY5hEYjufYW_TiaIM_KH5Q7CBAMydDKe5ssN9ZDfz0fLMTtV6Fj8RT_2OGFePqMWteJFYyHz2UZLSM5_w4Ag23uDnt33IejyOROUhcaZaEN6sMoM7QrLpco'
   },
   
   success: function(response) {
       tempPic = response.artists.items[0].images[0].url;
       artistInfo.setAttribute("style","background-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(255,0,0,0)), url(" + tempPic + ")");
       artist.innerHTML = JSON.stringify(response.artists.items[0].name);
       monthlyListen.innerHTML = JSON.stringify(response.artists.items[0].followers.total);
       id = response.artists.items[0].id;
       getTopTracks(query,id);
     console.log(response);
   }
 });
 
};

function addButtons(){
  
  var form = document.getElementById("search-form");
  var button = document.createElement("button");
  var buttonText = document.createTextNode(artistName);
  button.appendChild(buttonText);
  form.appendChild(button);}

function createButtons(){
  for(var i =0; i<artists.length; i++){
      function addButton(){
          var buttonText = document.createTextNode(artists[i]);
          var form = document.getElementById("search-form");
          button = document.createElement("button");
          button.appendChild(buttonText);
          button.setAttribute("value",artists[i])
          button.addEventListener("click", function(e){
            e.preventDefault();
          searchArtists(button.textContent);
          getMusicVideos(button.textContent);
          });
          form.appendChild(button);
      
      }
          addButton();
  }
          }
/*
          clientID = '6bdb7686b8a94fa48e6e7aa60d7c4c72';
          clientSecret = 'cbc3d5f4c71143278b1bc315f060fb0c';
          
        function requestAuthorization(){
        var url = AUTHORIZE; 
        url +="?client_id="+clientID;
        url +="&response_type=code";
        url +="&redirect_uri="+encodeURI(redirect_uri);
        url +="&show_dialog=true";
        window.location.href = url;
        
          }
        
        function onPageLoad(){
          if ( window.location.search.length > 0){
            handleRedirect();
          }
        }
        function handleRedirect(){
          let code = getCode();
          fetchAccessToken( code );
          window.history.pushState("","",redirect_uri);
        }
        
        function fetchAccessToken ( code ){
          var body = "grant_type=authorization_code"; 
          body += "$code="+code;
          body += "&redirect_uri="+encodeURI(redirect_uri);
          body += "&client_id="+clientID;
          body += "&client_secret="+clientSecret;
          callAuthorizationApi(body);
        }
        
        function callAuthorizationApi(body){
          var xhr = new XMLHttpRequest();
          xhr.open("POST", TOKEN, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', 'Basic '+btoa(clientID + ':' + clientSecret));
          xhr.send(body);
          xhr.onload = handleAuthorizationResponse;
        }
        
        
        
        function handleAuthorizationResponse(){
          if (this.status==200){
            var data = JSON.parse(this.responseText);
            console.log(data);
            var data = JSON.parse(this.responseText);
            if (data.access_token != undefined){
              access_token=data.access_token;
              localStorage.setItem("access_token", access_token);
            }
            if(data.refresh_token != undefined){
              refresh_token = data.refresh_token;
              localStorage.setItem("refresh_token", refresh_token);
            }
            onPageLoad();
          }
          else{console.log(this.responseText);
            alert(this.responseText)
          }
        }
        
        
        
        function getCode(){
          var code= null;
          var queryString = window.location.search;
          if ( queryString.length > 0){
            var urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code')
          }
          return code;
        }
*/

var getTopTracks = function(query,id) {
   $.ajax({
     url: 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?market=US',
     headers: {
         "Authorization": "Bearer " + 'BQA3BDJgabbx9Ly-k5GpUta396o9642VAY5hEYjufYW_TiaIM_KH5Q7CBAMydDKe5ssN9ZDfz0fLMTtV6Fj8RT_2OGFePqMWteJFYyHz2UZLSM5_w4Ag23uDnt33IejyOROUhcaZaEN6sMoM7QrLpco'
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
 addButtons();
}, false);



var apiKey= "AIzaSyAqMcywe4dEC4LFFRqaRmNyIPp3OK7DsMU";
var maxResults = 10;
var searchQuery = document.getElementById("searchbox")
var video = ""
var musicVideos = document.getElementById("musicvideos")

function getMusicVideos(){
    $("#musicvideos").empty();
 artistName = document.getElementById("searchbox").value;
fetch('https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&type=video&part=snippet&maxResults='+maxResults+'&q='+artistName)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    artists.push(artistName);
    localStorage.setItem("artists", JSON.stringify( artists ) );
        for(var i =0; i<data.items.length; i++){
            console.log(data.items[i].id.videoId)
            function addVideo(){
                var vidID = data.items[i].id.videoId;
                var video = document.createElement("iframe");
                video.setAttribute("width","210");
                video.setAttribute("height", "158");
                video.setAttribute("src","https://www.youtube.com/embed/"+vidID)
                musicVideos.appendChild(video);
            
            }
                addVideo();
        }
                

  });

}
//requestAuthorization();
createButtons();

