
const spotifyAPIController = (function() {
    
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
       
    return getToken {
        getToken();
    },

}); 



// musix key 0d49953ffed1270bd1dd131b139e95d1






