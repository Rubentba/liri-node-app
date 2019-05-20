// Used to obtain hidden keys for Spotify API
require("dotenv").config();

// Constant variables needed for code to work.
const keys = require("./keys.js"),
      axios = require("axios"),
      fs = require("fs"),
      Spotify = require("node-spotify-api"),
      moment = require("moment")

// Variables that catch user input.
var search = process.argv[2],
    term = process.argv.slice(3).join(" ")

// Calls Spotify API and displays the listed parameters in the console.
spotifyThis = function(song) {
    // If no parameter is entered, default to this song.
    if(!song){
        song = "The Sign by Ace of Base"
    }
    // Variable needed to access information within keys.js
    var spotify = new Spotify(keys.spotify)
    // Queries spotify API and returns information to console.
    spotify.search({ type: 'track', query: song }, function(error, data) {
        // Catches error then displays it.
        if (error) {
            console.log(error)
        } else { 
            // For Loop needed to catch the first artist found when API is called.
            for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                // Appends response and stores it within log.txt.
                fs.appendFile("log.txt",`\nArtist:       ${data.tracks.items[0].artists[0].name}\n` + `Song:         ${data.tracks.items[0].name}\n` + `Preview Link: ${data.tracks.items[0].preview_url}\n` + `Album:        ${data.tracks.items[0].album.name}\n`, function(err) {
                    if (err) {
                        console.log(err)
                    }
                })
                // Displays caught information.
                console.log(`Artist:       ${data.tracks.items[0].artists[0].name}`)
                console.log(`Song:         ${data.tracks.items[0].name}`)
                console.log(`Preview Link: ${data.tracks.items[0].preview_url}`)
                console.log(`Album:        ${data.tracks.items[0].album.name}`)
            }
        }
    })
}

// Calls OMDB API and displays the listed parameters in the console.
movieThis = function(movie) {
    // If no parameter is entered, default to this song.
    if(!movie) {
        movie = "Mr. Nobody"
    }
    // Variable that stores API url to then be used within axios.
    let URL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
    // Axios calls OMDB API and returns information to console.
    axios.get(URL).then(function(response) {
        // Appends response and stores it within log.txt.
        fs.appendFile("log.txt",`\nMovie title:            ${response.data.Title}\n` + `Release year:           ${response.data.Year}\n` + `IMBD rating:            ${response.data.imdbRating}\n` + `Rotten Tomatoes rating: ${response.data.Ratings[1].Value}\n` + `Country where produced: ${response.data.Country}\n` + `Languages:              ${response.data.Language}\n` + `Actors:                 ${response.data.Actors}\n`, function(err) {
            // Catches error then displays it.
            if (err) {
                console.log(err)
            }
        })
        // Displays caught information.
        console.log(`Movie title:            ${response.data.Title}`)
        console.log(`Release year:           ${response.data.Year}`)
        console.log(`IMBD rating:            ${response.data.imdbRating}`)
        console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`)
        console.log(`Country where produced: ${response.data.Country}`)
        console.log(`Languages:              ${response.data.Language}`)
        console.log(`Actors:                 ${response.data.Actors}`)
    })
}

// Calls BandsInTown API and displays the listed parameters in the console.
concertThis = function(artist) {
    // Variable that stores API url to then be used within axios.
    let URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // Axios calls OMDB API and returns information to console.
    axios.get(URL).then(function(response) {
        // Appends response and stores it within log.txt.
        fs.appendFile("log.txt",`\nName of the venue: ${response.data[0].venue.name}\n` + `Venue location:    ${response.data[0].venue.city + ", " + response.data[0].venue.country}\n` + `Event Date:        ${moment(response.data[0].datetime).format("MM-DD-YYYY")}\n`, function(err) {
            // Catches error then displays it.
            if (err) {
                console.log(err)
            }
        })
        // Displays caught information.
        console.log(`Name of the venue: ${response.data[0].venue.name}`)
        console.log(`Venue location:    ${response.data[0].venue.city + ", " + response.data[0].venue.country}`)
        console.log(`Event Date:        ${moment(response.data[0].datetime).format("MM-DD-YYYY")}`)
    })
}

// Calls what is in random.txt and displays the listed parameters in the console.
doWhatThis = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // Catches error then displays it.
        if (error) {
            console.log(error)
        }else {
            // Variable that stores data from random.txt and seperates it by the commas within it.
            let randomText = data.split(",")
                term = randomText[1]
            // Calls spotifyThis within random text.
            spotifyThis(randomText[1])
        }
    })
}

// State what API you're calling, then prints response.
switch (search) {
    case "spotify-this-song":
        console.log(`\nSearching for song...\n`)
        spotifyThis(term)
    break;
    case "movie-this":
        console.log(`\nSearching for movie...\n`)
        movieThis(term)
    break;
    case "concert-this":
        console.log(`\nSearching for concerts...\n`)
        concertThis(term)
    break;
    case "do-what-it-says":
        console.log(`\n...\n`)
        doWhatThis()
    break;
    case undefined:
        console.log(`\nPlease enter a valid method to run LIRI.\n`)
    break;
    default:
        console.log(`\nThat is not a valid method.\n`)
}