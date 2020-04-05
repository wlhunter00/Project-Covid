import * as Location from "expo-location";

const axios = require("axios").default;

export async function getLocationAsync() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      return { errorMessage: "Permission to access location was denied" };
    }
  
    let location = await Location.getCurrentPositionAsync({});
    return { location };
}
  
// Stolen from the backend code
function parseCoord(loc) {
    try {
        // var loc = JSON.parse(request);
        var latitude = loc["location"]["coords"]["latitude"];
        var longitude = loc["location"]["coords"]["longitude"];
        return { latitude, longitude };
    } catch (err) {
        console.error(err);
    }
  }
  
export async function getAddressAsync() {
    const loc = await getLocationAsync();
    const coords = parseCoord(loc);
    if (coords) {
        const mapquestURL = `http://www.mapquestapi.com/geocoding/v1/reverse?key=5FAG0NhAjLLNkkvmLKhMfzSvqQcEhING&location=${coords.latitude},${coords.longitude}`;
        try {
            const resp = (await axios.get(mapquestURL)).data;
            const location = resp.results[0].locations;
            if (!location || location.length === 0) {
                console.log("Can't parse coordinates");
            } else {
                return location[0];
            }
        } catch (err) {
            console.log(err);
        }
    } 
}

