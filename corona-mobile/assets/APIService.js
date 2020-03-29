import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import axios from "axios";

// const axios = require("axios").default

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
  await axios.post("https://projectcovid-backend.herokuapp.com/symptoms/allData", {
  }).then(response => {
    //console.log(response.data);
    updateFunc(response.data);
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}
