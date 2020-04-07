import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { getAddressAsync } from "./LocationAPI";

const axios = require("axios").default;
// const axios = require("axios").default
const BASE_URL = "https://projectcovid-backend.herokuapp.com";


export async function registerForPushNotifications() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== "granted") {
    console.log("Permissions not granted for notifications.");
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  // post to server
  const body = { token };
}

export async function getSymptoms(updateFunc) {
  try {
    const resp = await axios.post(`${BASE_URL}/symptoms/allData`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTopNews(address) {
  if (!address) {
    address = await getAddressAsync();
  }
  try {
    const resp = (await axios.post(`${BASE_URL}/news/address/`, address || {})).data
    return resp;
  } catch (error) {
    console.log(error)
    return { error: error };
  }
}

export async function getLatestStats(address) {
  if (!address) {
    address = await getAddressAsync();
  }
  try {
    const resp = (await axios.post(`${BASE_URL}/stats/address/`, address || {} )).data
    return resp;
  } catch (error) {
    console.log(error)
    return { error: error };
  }
}
