 artistName = document.getElementById('artistname'),
 monthlyListen = document.getElementById('monthlylisteners')
 
  
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
        artistName.innerHTML = JSON.stringify(response.artists.items[0].name);
      console.log(response);
    }
  });
};


document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('success!')
  searchAlbums(document.getElementById('searchbox').value);
}, false);
