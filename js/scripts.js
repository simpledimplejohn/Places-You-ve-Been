// Business Logic for AddressBook ---------
function PlacesBook() {
  this.places = {};  //creating a key called places that holds an object
  this.currentId = 0; //Sets starting ID to 0
}

PlacesBook.prototype.addPlace = function(place) {
  place.id = this.assignId(); // Calls on assignID function to generate unique ID 
  this.places[place.id] = place;  //value of places object is going to be this (from line7) Creates a key (unique ID) and value (place object) pair to add to PlaceBook object
};

// PlacesBook = {
//   places[1]: {'place'}
// }


PlacesBook.prototype.assignId = function() {
  this.currentId += 1; //Created unique ID by adding 1 to the current ID set in PlaceBook Function
  return this.currentId;
};

PlacesBook.prototype.findPlace = function(id) {
  if (this.places[id] != undefined) {
    return this.places[id];
  }
  return false;
};

PlacesBook.prototype.deletePlace = function(id) {
  if (this.places[id] === undefined) {
    return false;
  }
  delete this.places[id];
  return true;
};

// Business Logic for Contacts ---------
function Place(placeName, timeOfYear, favFood, description) {
  this.placeName = placeName;
  this.timeOfYear = timeOfYear;
  this.favFood = favFood;
  this.description = description;
}

// UI Logic --------------
let placesBook = new PlacesBook(); // mimicking database and initialling where to store the data

function displayPlacesDetails(placeBookToDisplay) {
  let placesList = $("ul#placeOutput");  //targets ul list
  let htmlForPlaceInfo = "";  //empty string we are adding on to to build up our list before pushing to dom
  Object.keys(placeBookToDisplay.places).forEach(function(key) { //key = id for places
    const place = placeBookToDisplay.findPlace(key);  
    htmlForPlaceInfo += "<li id=" + place.id + '>' + place.placeName + "</li>";
  });
  placesList.html(htmlForPlaceInfo);
}

function showPlace(placeId) {
  const place = placesBook.findPlace(placeId);
  $("#show-output").show();
  $(".placeOutput").html(place.placeName);
  $(".timeOfYearOutput").html(place.timeOfYear);
  $(".foodOutput").html(place.favFood);
  $(".description").html(place.description);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + place.id + ">Delete</button>");
}
function attachPlaceListeners() {
  $("ul#placeOutput").on("click", "li", function() {
    showPlace(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    placesBook.deletePlace(this.id);
    $("#show-output").hide();
    displayPlacesDetails(placesBook);
  });
}

$(document).ready(function() {
  attachPlaceListeners();
  $("form#addPlace").submit(function(event) {
    event.preventDefault();
    const placeNameInputted = $("input#placeName").val();
    const timeOfYearInputted = $("select#timeOfYear").val();
    const favoriteFoodInputted = $("input#favoriteFood").val();
    const descriptionInputted = $("textarea#description").val();
    let newPlace = new Place(placeNameInputted, timeOfYearInputted, favoriteFoodInputted, descriptionInputted); //Saves new place objected (created using Place constructor) to new variable called newPlace 
    placesBook.addPlace(newPlace);
    displayPlacesDetails(placesBook);
    console.log(placesBook);
  });
});