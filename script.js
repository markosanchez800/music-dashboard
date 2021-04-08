
/*const spotifyAPIController = (function() {
    
    const clientID = '9577ec53580a46c686cbb0729d57118e';
    const clientSecret = '903925af8da34bbabffe55187620ca4b';

    // private methods
    const _getToken = async () => {

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
    }

    const _getMusic = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/search?q=name:${search}&type=artist` , {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    };
       
    return {
        getToken() {
            return _getToken();
        },
        getMusic(token) {
            return _getMusic(token);
        },
    }

}); 

showMusic = (function(data){

})

*/

/*
var getArtist = function(input){
    input = 'prince';
    clientID = '9577ec53580a46c686cbb0729d57118e';
    clientSecret = '903925af8da34bbabffe55187620ca4b';
    oAuth = 'BQDHSLIcmF4IYbV1OCYO0uNFyaxlEPSv5ulEBajVZF3oWX7m6nMaRb5x9YykWMN3NoEi4XEYGW4qiY3vWE5hggZxtaau8d7akdQnUthRLp9RCsb8uGFPYvMPlDH_lveJVdQG6Cb29rAGxaaqZ1bgDes'
    var apiUrl = 'https://api.spotify.com/v1/search?q=' + input + '&type=artist' + '/authorize?response_type=code&client_id=' + clientSecret + clientID;
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                //displayWeather(data,city);
                console.log(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function(error){
        alert('Unable to connect to Spotify');
    });
};

getArtist();
*/

// find template and compile it
var templateSource = document.getElementById('results-template').innerHTML,
  template = Handlebars.compile(templateSource),
  resultsPlaceholder = document.getElementById('results'),
  artistName = document.getElementById('artistname')
  
   clientID = '9577ec53580a46c686cbb0729d57118e';
   clientSecret = '903925af8da34bbabffe55187620ca4b';

  const _getToken = async () => {

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
   

}

var fetchTracks = function(albumId, callback) {
  $.ajax({
    url: 'https://api.spotify.com/v1/albums/' + albumId,
    success: function(response) {
      callback(response);
    }
  });
};

var searchAlbums = function(query) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'artist'
    },
    headers: {
        "Authorization": "Bearer " + "BQCv2_5nrOUmh_jZ_ZSlTOz74Bjg4dI4TACqMiti_PSMk-XNOi9Zfmlz_-qlh-AU2_X-iJCHJapjCUuwwHdIKKK1PGoem40Luj31qrF7C8MsoupGTFfV8_Zq9TcTCZYJLeO5lFLlEYf6DgCv5xj7fu8"
    },
    success: function(response) {
        resultsPlaceholder.innerHTML = JSON.stringify(response.artists.items[0].name + ' ' + response.artists.items[0].genres);
      console.log(response);
    }
  });
};


document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  searchAlbums(document.getElementById('query').value);
}, false);





// musix key 0d49953ffed1270bd1dd131b139e95d1






