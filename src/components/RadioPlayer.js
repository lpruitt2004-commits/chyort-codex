import React, { useState, useEffect } from "react";
import "../App.css";

const radioStations = [
  {
    name: "🎵 Offline LoFi (Local)",
    url: "/audio/lofi-offline.mp3",
    offline: true,
  },
  { name: "NPR News", url: "https://npr-ice.streamguys1.com/live.mp3" },
  {
    name: "BBC World Service",
    url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  },
  { name: "WNYC FM", url: "https://fm939.wnyc.org/wnycfm" },
  {
    name: "KCRW (Santa Monica)",
    url: "https://kcrw.streamguys1.com/kcrw_192k_mp3_on_air",
  },
  {
    name: "Jazz24 (All Jazz)",
    url: "https://live.wostreaming.net/direct/ppm-jazz24aac-ibc1",
  },
  {
    name: "Smooth Jazz 24/7",
    url: "https://smoothjazz.cdnstream1.com/2586_128.mp3",
  },
  {
    name: "LoFi Study Beats",
    url: "https://stream.zeno.fm/f3wvbbqmdg8uv",
  },
  {
    name: "Ambient Study Music",
    url: "https://stream.zeno.fm/0r0xa792kwzuv",
  },
];

const sources = [
  {
    name: "ProPublica",
    url: "https://www.propublica.org",
    rss: "https://www.propublica.org/feeds/newsroom",
  },
  {
    name: "The Intercept",
    url: "https://theintercept.com",
    rss: "https://theintercept.com/feed/",
  },
  {
    name: "AP News",
    url: "https://apnews.com",
    rss: "https://apnews.com/index.rss",
  },
  {
    name: "Reuters",
    url: "https://www.reuters.com",
    rss: "https://www.reutersagency.com/feed/",
  },
  {
    name: "NPR",
    url: "https://www.npr.org",
    rss: "https://feeds.npr.org/1001/rss.xml",
  },
  {
    name: "BBC News",
    url: "https://www.bbc.com/news",
    rss: "http://feeds.bbci.co.uk/news/rss.xml",
  },
  {
    name: "PBS NewsHour",
    url: "https://www.pbs.org/newshour",
    rss: "https://www.pbs.org/newshour/feeds/rss/headlines",
  },
  {
    name: "CBC News",
    url: "https://www.cbc.ca/news",
    rss: "https://www.cbc.ca/webfeed/rss/rss-topstories",
  },
];

export default function RadioPlayer() {
  const [selectedStation, setSelectedStation] = useState(radioStations[0].url);
  const [newsFeeds, setNewsFeeds] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      const feeds = {};
      for (const source of sources) {
        try {
          // Using a CORS proxy to fetch RSS feeds
          const proxyUrl = "https://api.allorigins.win/raw?url=";
          const response = await fetch(
            proxyUrl + encodeURIComponent(source.rss)
          );
          const text = await response.text();
          const parser = new DOMParser();
          const xml = parser.parseFromString(text, "text/xml");
          const items = xml.querySelectorAll("item");

          feeds[source.name] = Array.from(items)
            .slice(0, 5)
            .map((item) => ({
              title: item.querySelector("title")?.textContent || "No title",
              link: item.querySelector("link")?.textContent || "#",
            }));
        } catch (error) {
          console.error(`Error fetching ${source.name}:`, error);
          feeds[source.name] = [
            { title: "Unable to load headlines - will retry", link: "#" },
          ];
        }
      }
      setNewsFeeds(feeds);
      setLoading(false);
    };

    fetchFeeds();

    // Auto-refresh every 5 minutes (300000ms)
    const refreshInterval = setInterval(fetchFeeds, 300000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="radio-section-sticky">
      <div className="radio-header">
        <h3>📻 Live Radio & News Feed</h3>
      </div>
      <div className="radio-player">
        <select
          value={selectedStation}
          onChange={(e) => setSelectedStation(e.target.value)}
          className="radio-select"
        >
          {radioStations.map((station) => (
            <option key={station.name} value={station.url}>
              {station.name}
            </option>
          ))}
        </select>
        <audio
          key={selectedStation}
          controls
          src={selectedStation}
          className="radio-audio"
          preload="none"
          loop={radioStations.find((s) => s.url === selectedStation)?.offline}
        >
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Scrolling News Ticker */}
      <div className="scrolling-ticker-inline">
        <div className="ticker-content">
          {!loading &&
            Object.entries(newsFeeds).map(([source, items]) => {
              // Skip sources that failed to load or have no headlines
              if (
                !items ||
                items.length === 0 ||
                items[0]?.title?.includes("Unable to load")
              ) {
                return null;
              }
              return items.map((item, idx) => (
                <span key={`${source}-${idx}`} className="ticker-item">
                  <strong>{source}:</strong>{" "}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  <span style={{ margin: "0 20px", color: "#00ff00" }}>•</span>
                </span>
              ));
            })}
          {/* Duplicate content for seamless loop */}
          {!loading &&
            Object.entries(newsFeeds).map(([source, items]) => {
              if (
                !items ||
                items.length === 0 ||
                items[0]?.title?.includes("Unable to load")
              ) {
                return null;
              }
              return items.map((item, idx) => (
                <span key={`${source}-${idx}-dup`} className="ticker-item">
                  <strong>{source}:</strong>{" "}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  <span style={{ margin: "0 20px", color: "#00ff00" }}>•</span>
                </span>
              ));
            })}
        </div>
      </div>
    </div>
  );
}
