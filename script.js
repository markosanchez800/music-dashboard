var apiKey= "AIzaSyADNoOQ9XzgB7BUXeHVLhgIFbXlbjVRq5c";
var maxResults = 10;
var searchQuery = document.getElementById("searchbox")
var video = ""
var musicVideos = document.getElementById("musicvideos")

function getMusicVideos(){
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
                
    // data.items.forEach(item => {
    //     videos = `<iframe width="420" height="315" src="http://www.youtube.com/embed${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`
    //     musicVideos.append(video)
    // })

  });

}

document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
  });
  document.getElementById("submit").addEventListener("click",getMusicVideos);