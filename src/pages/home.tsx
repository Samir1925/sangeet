import { Hono } from 'hono'

export const Home = new Hono()

export const Meteors = ({ number }: { number: number }) => {
  return (
    <>
      {Array.from({ length: number || 20 }, (_, idx) => (
        <span
          key={idx}
          class="meteor animate-[meteorAnimation_3s_linear_infinite] absolute h-1 w-1 rounded-[9999px] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
            animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`
          }}
        />
      ))}
    </>
  )
}

Home.get('/', (c) => {
  const title = 'JioSaavn API'
  const description =
    'JioSaavn API is an unofficial wrapper written in TypeScript for jiosaavn.com providing programmatic access to a vast library of songs, albums, artists, playlists, and more.'

  return c.html(
  <!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Sangeet Music Player</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f3f4f6;
    }h1 {
  text-align: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

input {
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.song-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.song-card:hover {
  transform: scale(1.02);
}

.song-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.song-info {
  padding: 10px;
}

.song-info h3 {
  margin: 5px 0;
  font-size: 18px;
}

.song-info p {
  margin: 0;
  color: #555;
}

.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1e1e1e;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 20px;
  display: none;
  z-index: 999;
}

.player img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.player-info {
  flex-grow: 1;
}

.player-info h4 {
  margin: 0;
  font-size: 16px;
}

.player-info p {
  margin: 0;
  font-size: 14px;
  color: #ccc;
}

audio {
  width: 200px;
}

  </style>
</head>
<body>  <h1>🎵 Sangeet Music Search</h1>
  <div class="search-bar">
    <input type="text" id="searchInput" placeholder="Search for a song..." />
    <button onclick="searchSongs()">Search</button>
  </div>  <div class="results" id="results"></div>  <div class="player" id="player">
    <img id="playerImg" src="" alt="Cover">
    <div class="player-info">
      <h4 id="playerTitle">Title</h4>
      <p id="playerArtist">Artist</p>
    </div>
    <audio id="audioPlayer" controls autoplay></audio>
  </div>  <script>
    async function searchSongs() {
      const query = document.getElementById('searchInput').value.trim();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      if (!query) return;

      try {
        const res = await fetch(`https://sangeet.shriwastavsaurav6.workers.dev/api/search/songs?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        const songs = data?.data?.results;

        if (!songs || songs.length === 0) {
          resultsDiv.innerHTML = '<p>No songs found.</p>';
          return;
        }

        songs.forEach(song => {
          const playable = song.downloadUrl?.pop()?.link;
          if (!playable) return;

          const card = document.createElement('div');
          card.className = 'song-card';
          card.innerHTML = `
            <img src="${song.image[2].link}" alt="cover">
            <div class="song-info">
              <h3>${song.name}</h3>
              <p>${song.primaryArtists}</p>
            </div>
          `;
          card.onclick = () => playSong(song.name, song.primaryArtists, song.image[2].link, playable);
          resultsDiv.appendChild(card);
        });
      } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = '<p>Error loading songs. Try again later.</p>';
      }
    }

    function playSong(title, artist, image, audioUrl) {
      document.getElementById('playerImg').src = image;
      document.getElementById('playerTitle').innerText = title;
      document.getElementById('playerArtist').innerText = artist;
      const audio = document.getElementById('audioPlayer');
      audio.src = audioUrl;
      document.getElementById('player').style.display = 'flex';
    }
  </script></body>
</html>
  )
})
