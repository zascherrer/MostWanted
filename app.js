/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){
  let personONE;
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      person = searchByName(people);
      break;
    case 'no':
      person = searchByTraits(people);
      break;
    default:
      alert("Please enter either a yes or no.");
      // app(people); // restart app
      break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = promptFor("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", chars).toLowerCase();
  let filteredPeople;
  let noPersonFound = false;
  let foundPerson;
  let foundPeople = [];
  let listOfPeople = "";

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }

  if(filteredPeople[0] === undefined){
    noPersonFound = true;
  }
  if(!noPersonFound){
    for(let i = 0; i < filteredPeople.length; i++){
      foundPeople.push(filteredPeople[i]);
      listOfPeople += foundPeople[i].firstName + " " + foundPeople[i].lastName + "\n";
    }
  }

  alert(listOfPeople);

  if(foundPeople.length > 1){
    foundPerson = nameOrTraits(foundPeople, listOfPeople);
  }
  else{
    foundPerson = foundPeople[0];
  }
  mainMenu(foundPerson, people);

}

function nameOrTraits(people, listOfPeople){
  let userChoice = promptFor(listOfPeople + "\n\nWe found the people above. Would you like to search them by name or traits?", strings);
  if(userChoice == "name"){
    return filterSearch(people, listOfPeople);
  }
  else{
    return searchByTraits(people);
  }
}

function filterSearch(people, listOfPeople){
  var firstName = promptFor(listOfPeople + "\n\nWe found the people above. What is your selected person's first name?", chars).toLowerCase();
  var lastName = promptFor(listOfPeople + "\n\nWhat is your selected person's last name?", chars).toLowerCase();

  // TODO: find the person using the name they entered
  let noPersonFound = false;
  let foundPerson;
  for (let i = 0; i < people.length; i++) {
    if (firstName === people[i].firstName.toLowerCase() && lastName === people[i].lastName.toLowerCase()){
       foundPerson = people[i];
      if(personFoundCheck(foundPerson)){
        alert(foundPerson.firstName + " " + foundPerson.lastName);
        return foundPerson;
      }
      return foundPerson;
    }
  }
  if (!personFoundCheck(foundPerson)) {
    app(people);
  }
}

function searchByHeight(people){
  let userInputHeight = promptFor("What is the person's height (in inches)?", numbers);
  let foundPerson;

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  foundPerson = newArray[0];

  if (!personFoundCheck(foundPerson)) {
    app(people);
  }

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = promptFor("How much does the person weigh?", numbers);
  let foundPerson;

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  foundPerson = newArray[0];

  if (!personFoundCheck(foundPerson)) {
    app(people);
  }
  return newArray;
}

function searchByEyeColor(people){
  let userInputEyeColor = promptFor("What is the person's eye color?", strings);
  let foundPerson;

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.eyeColor matches userInputEyeColor
  });

  foundPerson = newArray[0];

  if (!personFoundCheck(foundPerson)) {
    app(people);
  }

  return newArray;
}

function searchByGender(people) {
  let userInputGender = promptFor("What is the person's gender?", strings);
  let foundPerson;

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
    // return true if el.gender matches userInputGender
  });

  foundPerson = newArray[0];

  if (!personFoundCheck(foundPerson)) {
    app(people);
  }

  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = promptFor("What is the person's occupation?", strings);
  let foundPerson;

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.occupation matches userInputOccupation
  });

  foundPerson = newArray[0];

  if (!personFoundCheck(foundPerson)) {
    app(people);
  }

  return newArray;
}

function searchByAge(people) {
  let userInputAge = promptFor("What is the person's age?", numbers);
  let currentDate = currentDateFinder();
  let datesOfBirth = [];
  let ages = [];
  let foundPerson;

  for(let i = 0; i < people.length; i++){
    datesOfBirth.push(getDateOfBirth(people[i]));
  }

  for(let i = 0; i < people.length; i++){
    let baseAge = currentDate[2] - datesOfBirth[i][2];
    let actualAge;
    if(currentDate[0] < datesOfBirth[i][0]){
      actualAge = baseAge - 1;
    }
    else if(currentDate[0] > datesOfBirth[i][0]){
      actualAge = baseAge;
    }
    else{
      if(currentDate[1] >= datesOfBirth[i][1]){
        actualAge = baseAge;
      }
      else{
        actualAge = baseAge - 1;
      }
    }

    people[i].age = actualAge;
  }

  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
    // return true if el.age matches userInputAge
  });

  foundPerson = newArray[0];

  if (!personFoundCheck(foundPerson)) {
    app(people);
  }

  return newArray;
}

function getDateOfBirth(person){
  let birthMonth;
  let birthDate;
  let birthYear;
  let currentNumber = "";
  let monthDayOrYear = 0;

  for(let i = 0; i < person.dob.length; i++){
    if(person.dob.charAt(i) !== "/"){
      currentNumber += person.dob.charAt(i);
    }
    else{
      switch(monthDayOrYear){
        case 0:
          birthMonth = currentNumber;
          currentNumber = "";
          break;
        case 1:
          birthDate = currentNumber;
          currentNumber = "";
          break;
        default:
          birthYear = currentNumber;
          currentNumber = "";
          break;
      }
      monthDayOrYear++;
    }
  }
  birthYear = currentNumber;

  //alert("Month: " + birthMonth + " Date: " + birthDate + " Year: " + birthYear);
  return [birthMonth, birthDate, birthYear];
}

function currentDateFinder() {
 let monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
 let rightNow = new Date();
 let theDay = rightNow.getDate();
 let theYear = rightNow.getFullYear();
 let theMonth = rightNow.getMonth();
 let numberOfMonth = monthNumbers[theMonth];
 //alert(numberOfMonth +""+theDay +""+theYear);
 return [numberOfMonth, theDay, theYear];
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person, people);
      break;
    case "family":
      displayFamily(person, people);
      break;
    case "descendants":
      displayDescendants(person, people, 2, person);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      alert("Please enter one of the options presented.")
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();

  // TODO: find the person using the name they entered
  let noPersonFound = false;
  let foundPerson;
  for (let i = 0; i < people.length; i++) {
    if (firstName === people[i].firstName.toLowerCase() && lastName === people[i].lastName.toLowerCase()){
       foundPerson = people[i];
      if(personFoundCheck(foundPerson)){
        alert(foundPerson.firstName + " " + foundPerson.lastName);
        mainMenu(foundPerson, people);
      }
      return foundPerson;
    }
  }
  if (!personFoundCheck(foundPerson)) {
    app(people);
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person, people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
  mainMenu(person, people)
}

function displayFamily(person, people){
  let familyList = "";
  for(let i = 0; i < people.length; i++){
    if(person.currentSpouse !== undefined){
      if(person.currentSpouse === people[i].id){
        familyList += "Spouse: " + getName(people[i]) + " \n";
      }
    }

    if(people[i].parents[0] !== undefined){
      for(let j = 0; j < 2; j++){
        if(people[i].parents[j] === person.id){
          familyList += "Child: " + getName(people[i]) + "\n";
        }
      }
    }

    if(person.parents[0] !== undefined){
      for(let j = 0; j < 2; j++){
        if(person.parents[j] === people[i].id){
          familyList += "Parent: " + getName(people[i]) + "\n";
        }
      }
    }

    if(person.parents[0] !== undefined){
      //for(let j = 0; j < person.parents.length; j++){
        if(person.parents[0] === people[i].parents[0] && person.id !== people[i].id){
          familyList += "Sibling: " + getName(people[i]) + "\n";
        }
      //}
    }
  }

  alert(familyList);

  mainMenu(person, people);
}

function displayDescendants(person, people, counter, originalPerson){
  let children = [];
  let familyList = "";

  for(let i = 0; i < people.length; i++){
    if(people[i].parents[0] !== undefined){
      for(let j = 0; j < 2; j++){
        if(people[i].parents[j] === person.id){
          familyList += getName(people[i]) + "\n";
          children.push(people[i]);
        }
      }
    }
  }

  if(counter === 2){
    alert("Children: " + familyList)
  }
  else if(counter === 1 && familyList !== ""){
    alert("Grandchildren: " + familyList)
    mainMenu(originalPerson, people);
  }
  else if(counter === 0 && familyList !== ""){
    alert("Great-grandchildren: " + familyList)

  }

  if(counter > 0){
    counter--;
    for(let i = 0; i < children.length; i++){
      displayDescendants(children[i], people, counter, originalPerson);
    }
    if(children.length === 0){
      alert("No further descendants found.")
      mainMenu(originalPerson,people);
    }
  }


}

function getName(person){
  return person.firstName + " " + person.lastName;
}

// function that prompts and validates user input
function promptFor(question, valid){
  let validResponse = true;
  do{
    if(!validResponse){
      alert("Please enter a valid response.")
    }
    var response = prompt(question).trim();
    validResponse = false;
  } while(!response || !valid(response));
  return response;
}

function personFoundCheck(person) {
  if(person === undefined) {
    alert("Person not found.");
    return false;
  }
  else {
    return true;
  }

}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function numbers(input){
  if(!isNaN(input)){
    return true;
  }
  else{
    return false;
  }
}

function strings(input){
  if(isNaN(input)){
    return true;
  }
  else{
    return false;
  }
}