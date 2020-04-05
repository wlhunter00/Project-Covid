import { useState, useEffect } from "react";
import { getLatestStats, getTopNews } from "./APIService";
import { getAddressAsync } from "./LocationAPI";



export function useLocationAddress() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchLocation = async () => {
      console.log("fetching location")
      const newAddress = await getAddressAsync();
      setAddress(newAddress);
    }
    if (!address) {
      fetchLocation();
    }
    
  }, []);

  return address;
}


// A hook to get the latest stats. If there is already stats, it will return that, if not, it will download more asynchronously. 
// TODO: Make this check for last updated time and if needed, redownload
export function useLatestStats() {
  const [resp, setResp] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const address = useLocationAddress();

  useEffect(() => {
    const fetchStats = async () => {
      const resp = await getLatestStats(address);
      if (!resp.error) {
        setResp({ stats: resp });
      } else {
        setResp({ error: "Could not reach server" });
      }
    }

    let now = new Date();
    if (!lastUpdated || now - lastUpdated > 60000) {
      fetchStats();
      setLastUpdated(now);
    }
  });

  return resp;
}

export function useTopNews() {
  const [resp, setResp] = useState(null);

  const address = useLocationAddress();

  useEffect(() => {
    // Async fetch function
    const fetchNews = async () => {
      const resp = await getTopNews(address);
      if (!resp.error) {
        setResp({ news: resp.slice(0, 4) });
      } else {
        setResp({ error: "Could not reach server." })
      }
    }
  
    fetchNews();
  }, []);
  return resp;
}

// Shamelessly stolen from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// Will eventually use to update live stats as needed
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}