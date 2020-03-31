import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { getLocationAsync } from "./Utils";

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
  await axios.post(`${BASE_URL}/symptoms/allData`, {
  }).then(response => {
    updateFunc(response.data);
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}

export async function getTopNews() {
  const loc = await getLocationAsync();
  try {
    const resp = (await axios.post(`${BASE_URL}/news/`, loc.errorMessage ? {} : loc)).data
    return resp;
  } catch (error) {
    console.log(error)
    return { error: error };
  }
}

export async function getLatestStats() {
  const loc = await getLocationAsync();
  try {
    const resp = (await axios.post(`${BASE_URL}/stats/`, loc.errorMessage ? {} : loc)).data
    return resp;
  } catch (error) {
    console.log(error)
    return { error: error };
  }
}
