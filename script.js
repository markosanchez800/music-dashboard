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
       "Authorization": "Bearer " + "BQD0qmr5gYZvyz74hoLBHUN7Yptk_h3IB2kTp9BvgDonB4qcaveLVOIWm5EFHj4V_OKUNceMYckJvzv0K18DboT_BI7k3uYFyzzHqnw7nkcCKcnUI-Gk9mHS6eMc9LYJ8IrYiKZGSXag_YI3HIqFe5U"
   },
   success: function(response) {
       artistInfo.setAttribute("background-image",response.artists.items[0].images[0].url);
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
         "Authorization": "Bearer " + "BQD0qmr5gYZvyz74hoLBHUN7Yptk_h3IB2kTp9BvgDonB4qcaveLVOIWm5EFHj4V_OKUNceMYckJvzv0K18DboT_BI7k3uYFyzzHqnw7nkcCKcnUI-Gk9mHS6eMc9LYJ8IrYiKZGSXag_YI3HIqFe5U"
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

document.getElementById('search-form').addEventListener('submit', function(e) {
 e.preventDefault();
 console.log('success!')
 searchArtists(document.getElementById('searchbox').value);
}, false);





// musix key 0d49953ffed1270bd1dd131b139e95d1






