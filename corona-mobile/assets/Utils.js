import * as Location from "expo-location";

export async function getLocationAsync() {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    return { errorMessage: "Permission to access location was denied" };
  }

  let location = await Location.getCurrentPositionAsync({});
  return { location };
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