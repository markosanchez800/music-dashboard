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
    data.items.forEach(item => {
        videos = `

        <iframe width="420" height="315" src="http://www.youtube.com/embed${item.id.videoId}" frameborder="0" allowfullscreen></iframe>


        `
        musicVideos.append(video)
    })

  });

}

document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
  });
  document.getElementById("submit").addEventListener("click",getMusicVideos);