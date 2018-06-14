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
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;
  let noPersonFound = false;
  let foundPerson;

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
    foundPerson = filteredPeople[0];
  }

  alert(foundPerson.firstName + " " + foundPerson.lastName);

  mainMenu(foundPerson, people);

}

function searchByHeight(people){
  let userInputHeight = prompt("What is the person's height (in inches)?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByEyeColor(people){
  let userInputEyeColor = prompt("What is the person's eye color?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.eyeColor matches userInputEyeColor
  });

  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What is the person's gender?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
    // return true if el.gender matches userInputGender
  });

  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.occupation matches userInputOccupation
  });

  return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("What is the person's age?");
  let currentDate = currentDateFinder();
  let datesOfBirth = [];
  let agesOfPeople = [];

  for(let i = 0; i < people.length; i++){
    datesOfBirth.push(getDateOfBirth(people[i]));
  }

  for(let i = 0; i < people.length; i++){
    ages.push(currentDate[2] - datesOfBirth[i][2]);
  }

  let modifiedAges = ages.map(function(el){


    return modifiedAges;
  });

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

  alert("Month: " + birthMonth + " Date: " + birthDate + " Year: " + birthYear);
  return [birthMonth, birthDate, birthYear];
}

function currentDateFinder() {
 let monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
 let rightNow = new Date();
 let theDay = rightNow.getDate();
 let theYear = rightNow.getFullYear();
 let theMonth = rightNow.getMonth();
 let numberOfMonth = monthNumbers[theMonth];
 alert(numberOfMonth +""+theDay +""+theYear);
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
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  // TODO: find the person using the name they entered
  for (let i = 0; i < people.length; i++) {
    if (firstName === people[i].firstName && lastName === people[i].lastName){
      return people[i];
    }
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
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

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
