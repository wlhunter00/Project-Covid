import { useState, useEffect } from "react";
import { getLatestStats, getTopNews } from "./APIService";
import { getAddressAsync } from "./LocationAPI";



export function useLocationAddress() {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchLocation = async () => {
      const newAddress = await getAddressAsync();
      setAddress(newAddress);
    }
    if (!address) {
      fetchLocation();
    }
    
  }, []);

  return address;
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