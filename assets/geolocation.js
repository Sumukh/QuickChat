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
        $.get('https://api.foursquare.com/v2/venues/search?ll='+position.coords.latitude+','+position.coords.longitude+'&oauth_token=FYQ2RTFDZSS4PGH2QDQ5EMVU4HYLWBCZR02UMZIJ5P1CCIEU&v=20130727',foursquare)
        return position;
      }, errorHandler);
  }
}
function foursquare(data) { 
  console.log(data.response.venues[0].name); console.log(data.response.venues[0].id); 
} 

function get_location(){
 // var position = getCoordinates()

  /*
  var BASE_URL = "http://maps.googleapis.com/maps/api/geocode/json?"
  var data = {
    latlng : position.coords.latitude+ "," + position.coords.longitude,
    sensor : true
  }
  $.get(BASE_URL+ $.param(data), function(data){
    console.log(data);
  })*/
}
getCoordinates()
