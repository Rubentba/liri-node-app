# liri-node-app

## Requirements
- spotify-this-song: Will take a song that a user has entired as a parameter. It will then log song,artist, and album. If you pass no paramater it will default to "The Sign" by Ace of Base.

- movie-this: Takes a movie title as a parameter. It will then log information about the movie such as; name, year, summary, country of origin, languages, and the actors who are in it. By default if nothing is inputed, it will query "Mr. Nobody"

- concert-this: Takes a name of an artist or band as a parameter. It will then log the name of the venue, venue location, and date of the venue.

- do-what-it-says: Takes no parameter. Instead, it will call whatever is currently in random.txt at that time.

## Technologies Used
- Node.js
- Javascript
- Node-Spotify-API (via NPM Package)
- Node-Bands-In-Town-API (via axios calls)
- Node-OMDB-API (via axios calls)