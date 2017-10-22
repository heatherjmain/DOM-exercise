var initialize = function(){

  var createOptions = function(character) {
    var characterOption = document.createElement("option");
    // characterOption.value = index;
    characterOption.text = character.name;

    characterOption.innerHTML = character.name;
    return characterOption;
  }

  // var renderCharacters = function(characters) {
  //   var storedCharacter = localStorage.getItem("selectedCharacter");
  //   var characterToDisplay = null;
  //
  //   if (storedCharacter) {
  //     characterToDisplay = JSON.parse(storedCharacter);
  //     var select = document.querySelector("#characters");
  //     select.selectedIndex = characterToDisplay.index;
  //   }
  //   else {
  //     characterToDisplay = characters[0];
  //   }
  //   listCharcters(characters);
  //   displayCharacterInfo(characterToDisplay);
  //
  // }

  var listCharcters = function(characters, index) {
    var characterSelect = document.querySelector("#character-select");

    characters.forEach(function(character, index) {
      character.index = index;
      var characterOption = createOptions(character);
      characterOption.value = index;
      characterSelect.appendChild(characterOption);
    });

    characterSelect.addEventListener("change", function(event) {
      var index = this.value;
      var character = characters[index];

      displayCharacterInfo(character);

      var jsonString = JSON.stringify(character);
      localStorage.setItem("selectedCharacter", jsonString);
    });

  }

  var displayCharacterInfo = function(character) {
    var characterInfo = document.querySelector("#character-info")
    var pTagName = document.createElement("p");
    var pTagSpecies = document.createElement("p");
    var pTagDOB = document.createElement("p");
    var pTagHouse = document.createElement("p");
    var img = document.createElement("img");

    pTagName.innerText = "Name: " + character.name;
    pTagSpecies.innerText = "Species: " + character.species;
    pTagDOB.innerText = "Date of Birth: " + character.dateOfBirth;
    pTagHouse.innerText = "Hogwarts House: " + character.house;
    img.innerHTML = character.image;

    characterInfo.appendChild(pTagName);
    characterInfo.appendChild(pTagSpecies);
    characterInfo.appendChild(pTagDOB);
    characterInfo.appendChild(pTagHouse);
    characterInfo.appendChild(img);
  }

  var url = "http://hp-api.herokuapp.com/api/characters"
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", function() {
    var characters = JSON.parse(this.responseText);
    listCharcters(characters);
    // renderCharacters(characters);
  });
  request.send();

}


window.addEventListener("load", initialize);
