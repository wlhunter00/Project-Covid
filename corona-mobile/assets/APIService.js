import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const axios = require("axios").default;

const root = "SERVER_ROOT_URL_HERE";

export async function registerForPushNotifications() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") {
        console.log("Permissions not granted for notifications.");
        return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    // post to server
    const body = { token };
    axios.post(`${root}/submitExpoToken`, body);
}