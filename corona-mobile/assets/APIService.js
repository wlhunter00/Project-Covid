import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
// import axios from 'axios';

const axios = require("axios").default;

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

export async function sendSymptoms(symptoms) {
  return (await axios.post("${this.root}/backend/routes/symptomCheck", {
    symptoms
  })).data;
}
