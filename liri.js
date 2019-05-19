require("dotenv").config();

const keys = require("./keys.js"),
      axios = require("axios"),
      fs = require("fs"),
      Spotify = require("node-spotify-api"),
      moment = require("moment")

var search = process.argv[2],
    term = process.argv.slice(3).join(" ")

var APIs = function() {

    this.spotifyThis = function(song) {
        if(!song){
            song = "The Sign by Ace of Base"
        }
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
        if(!movie) {
            movie = "Mr. Nobody"
        }

        let URL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"

        axios.get(URL).then(function(response) {

            console.log("Movie title: " + response.data.Title)
            console.log("Release year: " + response.data.Year)
            console.log("IMBD rating: " + response.data.imdbRating)
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value)
            console.log("Country where produced: " + response.data.Country)
            console.log("Languages: " + response.data.Language)
            console.log("Actors: " + response.data.Actors)
        })
    }

    this.concertThis = function(artist) {

        let URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

        axios.get(URL).then(function(response) {

            console.log("Name of the venue: " + response.data[0].venue.name)
            console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country)
            console.log("Event Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY"))
        })
    }

    this.doWhatThis = function() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                console.log(error)
            }else {

                var randomText = data.split(",")
                console.log("$ node liri.js " + randomText[0] + " " + randomText[1])
            }
        })
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

