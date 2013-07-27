function errorHandler(err) {
    if(err.code == 1) {
      console.log("Error: Access is denied!");
    }else if( err.code == 2) {
      console.log("Error: Position is unavailable!");
  }
}
function getCoordinates(callback){
  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        get_location(position);
      }, errorHandler);
  }
}
function get_location(position){
  var BASE_URL = "http://maps.googleapis.com/maps/api/geocode/json?"
  var data = {
    latlng : position.coords.latitude+ "," + position.coords.longitude,
    sensor : true
  }
  $.get(BASE_URL+ $.param(data), function(data){
    console.log(data);
  })
}
getCoordinates()
