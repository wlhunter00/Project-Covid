import * as Location from "expo-location";

export async function getLocationAsync() {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    return { errorMessage: "Permission to access location was denied" };
  }

  let location = await Location.getCurrentPositionAsync({});
  return { location };
}
