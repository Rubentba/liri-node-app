require("dotenv").config();

const keys = require("./keys.js"),
      axios = require("axios"),
      fs = require("fs"),
      Spotify = require("node-spotify-api")

var search = process.argv[2],
    term = process.argv.slice(3).join(" ")

var APIs = function() {

    this.spotifyThis = function(song) {

        var spotify = new Spotify(keys.spotify)

        spotify.search({ type: 'track', query: song }, function(error, data) {
           
            if (error) {
                console.log(error)
            } else { 
                for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                    console.log("Artist: " + data.tracks.items[0].artists[0].name)
                    console.log("Song: " + data.tracks.items[0].name)
                    console.log("Preview Link: " + data.tracks.items[0].preview_url)
                    console.log("Album: " + data.tracks.items[0].album.name)
				}
            }
        })
    }

    this.movieThis = function(movie) {
    }

    this.concertThis = function(concert) {
    }

    this.doWhatThis = function(doWhat) {
    }
}

var apis = new APIs()

// State what API you're calling, then prints response.
if (search === "concert-this") {
    console.log("Searching for concerts...")
    apis.concertThis(term)
} 

else if(search === "spotify-this-song") {
    console.log("Searching for song...")
    apis.spotifyThis(term)
}

else if(search === "movie-this") {
    console.log("Searching for movie...")
    apis.movieThis(term)
}

else if(search === "do-what-it-says") {
    console.log("...")
    apis.doWhatThis(term)
}

else if(search === undefined) {
    console.log("Please enter a valid method to run LIRI.")
}
    
else {
    console.log("That is not a valid method.")
}
