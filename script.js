const APIController = (function() {
    
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
});

//2h7nX8Uc7KpgkKmZnE4tnBGP0yzawyfLAwqFGW8zSSuqDCj55bkMDGMgUcqPbxDP

//pLkW4rvh-hn0_OaH47JxklZao3TDp2v1oRNBfNZJHr4VloIPx8-dHIswV-LsFbQEPiv5cT5c6o4aqD5D1kYM8w


