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
    var characterInfo = document.querySelector("#character-info");
    while(characterInfo.firstChild){characterInfo.removeChild(characterInfo.firstChild)};
    var heading = document.createElement("h3");
    heading.innerText = "Character Info"
    var pTagName = document.createElement("p");
    var pTagSpecies = document.createElement("p");
    var pTagDOB = document.createElement("p");
    var pTagHouse = document.createElement("p");
    var img = document.createElement("img");

    pTagName.innerText = "Name: " + character.name;
    pTagSpecies.innerText = "Species: " + character.species;
    pTagDOB.innerText = "Date of Birth: " + character.dateOfBirth;
    pTagHouse.innerText = "Hogwarts House: " + character.house;
    img.src = character.image;


    characterInfo.appendChild(heading);
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
    loadHouseData(characters);
    // renderCharacters(characters);
  });
  request.send();





  var loadHouseData = function(characters) {
    console.log('hi')

    houseLabels = [];
    console.log(houseLabels);

    var studentInHousesData = {
      name: "Number of Students",
      data: []
    };


    for (character of characters) {
      if (!houseLabels.includes(character.house)) {
        houseLabels.push(character.house);
      }
    }

    for (label of houseLabels) {
      var num = 0;
      for (character of characters) {
        if (character.house == label) {
          num ++;
        }
      }
      studentInHousesData.data.push(num);
    }
    console.log(studentInHousesData);
    var chart = new ColumnChart("Number of Students in Each Hogwarts House", studentInHousesData, houseLabels);
  }


}

window.addEventListener("load", initialize);
