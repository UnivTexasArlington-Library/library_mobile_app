export function filterSpacesDropdown(categoryID, spaces) {
  if (categoryID === 20574) {
    for (let i = 0; i < 5; i++) {
      spaces[i].disabled = false;
      spaces[i].containerStyle = {
        height: 60,
        margin: 2,
      };
    }
    return spaces;
  } else if (categoryID === 20586) {
    for (let i = 5; i < 7; i++) {
      spaces[i].disabled = false;
      spaces[i].containerStyle = {
        height: 60,
        margin: 2,
      };
    }
    return spaces;
  } else if (categoryID === 25835) {
    for (let i = 7; i < 9; i++) {
      spaces[i].disabled = false;
      spaces[i].containerStyle = {
        height: 60,
        margin: 2,
      };
    }
    return spaces;
  } else if (categoryID === 29456) {
    for (let i = 9; i < 13; i++) {
      spaces[i].disabled = false;
      spaces[i].containerStyle = {
        height: 60,
        margin: 2,
      };
    }
    return spaces;
  } else if (categoryID === 20588) {
    for (let i = 13; i < 15; i++) {
      spaces[i].disabled = false;
      spaces[i].containerStyle = {
        height: 60,
        margin: 2,
      };
    }
    return spaces;
  } else if (categoryID === 32795) {
    for (let i = 15; i < 17; i++) {
      spaces[i].disabled = false;
      spaces[i].containerStyle = {
        height: 60,
        margin: 2,
      };
    }
    return spaces;
  }
}
