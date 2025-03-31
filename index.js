export default {
  async fetch(request) {
    const API_KEY = '你的API_KEY';  // 替换成你的 Last.fm API Key
    const LASTFM_USER = '你的 Last.fm 用户名';
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${API_KEY}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.recenttracks && data.recenttracks.track.length > 0) {
        const track = data.recenttracks.track[0];
        return new Response(JSON.stringify({
          song: track.name,
          artist: track.artist['#text']
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ error: '无法获取数据' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: '请求失败' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
