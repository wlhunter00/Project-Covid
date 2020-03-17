const express = require("express");
const router = express.Router();
const Notification = require("./../models/notification.js");

router.get("/testCenter", async (req, res) => {
  var serverLocation = req.body;
  console.log(location);

  var coords = parseCoord(serverLocation)

  const url = "http://www.mapquestapi.com/geocoding/v1/reverse?key=5FAG0NhAjLLNkkvmLKhMfzSvqQcEhING&" + coords[0] + "," + coords[1];
  await request(url, function(
    error,
    response,
    body
  ){
    var data = JSON.parse(results);
    var address = data["results"][0]["locations"][0]["adminArea3"]
    console.log(address)
  });

  JSON.parse(./)

  await request()

  res.send(state);
});


function parseCoord(request){
  try{
    var loc = JSON.parse(request);
    var latitude = loc["location"]["coords"]["latitude"]
    var longitude = loc["location"]["coords"]["longitude"]
    return [latitude,longitude]
  } catch(err){
    console.error(err)
  }
}

function findState(loctions){

}



module.exports = router;
