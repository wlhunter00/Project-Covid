import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import axios from "axios";

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

export async function sendSymptoms(symptoms, updateFunc) {
  await axios.post(`${BASE_URL}/symptoms`, {
    symptoms: symptoms
  }).then(response => {
    console.log(response.data);
    updateFunc(response.data);
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}

export async function getSymptoms(updateFunc) {
  await axios.post(`${BASE_URL}/symptoms/allData`, {
  }).then(response => {
    console.log(response.data);
    updateFunc(response.data);
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}

export async function getTopNews() {
  axios.post()
}
