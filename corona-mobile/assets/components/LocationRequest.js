import React from 'react';
import { View } from "react-native";
import { getLocationAsync } from "../utils/LocationAPI";



export default class LocationRequest extends React.PureComponent{
    componentDidMount() {
        getLocationAsync();
    }

    render() {
        return <View />
    }
}