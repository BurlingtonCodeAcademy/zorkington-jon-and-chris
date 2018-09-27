const zorkObjects = require('./zorkObjects.json');

const readline = require('readline');
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let paper = "false";
let inventory = zorkObjects.theGrid.inventory;
let currentGrid = zorkObjects.theGrid.grid1024;
const clearScreen = () => process.stdout.write('\033c');
const printName = () => console.log("\n" + currentGrid.name + "\n");
const printDescription = () => console.log(currentGrid.description + "\n");
const refreshScreen = () => {
  clearScreen();
  printName();
}
const enterGrid = () => {
  refreshScreen();
  printDescription();
}

const moveToGrid = (nextGrid) => {
  if (nextGrid) {
    currentGrid = nextGrid;
  } else {
    console.log("Invalid state transition attempted - from " + currentGrid + " to " + nextGrid);
  }
}

enterGrid();

async function start() {
  while (true) {
    let input = await ask(" \n")
      if (input === "read sign") {
        refreshScreen();
        console.log(currentGrid.sign.read);
      } else if (input === "take sign") {
        refreshScreen();
        console.log(currentGrid.sign.take);
    } else if (input === "open door") {
      refreshScreen();
      console.log(currentGrid.door.open);
    } else if (input === 'take paper' || input === 'take seven days' || input === 'pick up seven days') {
      refreshScreen();
      paper = true;
      console.log(inventory.item1.description);
    } else if (input === 'i' || input === 'inventory' || input === 'take inventory') {
      refreshScreen();
      console.log("You are carrying:");
      if (paper == true) {
        console.log(inventory.item1.name);
      }
    } else if (input === 'drop paper' || input === 'drop seven days' || input === 'put down seven days') {
      refreshScreen();
      paper = false;
      console.log("Litterbug!");
    } else if (input.includes('enter code') && input !== 'enter code 12345') {
      refreshScreen();
      console.log(currentGrid.door.code);
    } else  if (input.includes(12345) === true) {
      clearScreen();
      console.log("Success! The door opens. You enter the foyer and the door\nshuts behind you.\n");
      moveToGrid(zorkObjects.theGrid.grid0924);
      printName();
      printDescription();
    } else  if (input === "go upstairs") {
      clearScreen();
      moveToGrid(zorkObjects.theGrid.grid0824);
      printName();
      printDescription();
    } else if (input === "back to start") {
      console.log("Starting over...");
      currentGrid = zorkObjects.theGrid.grid1024;
      enterGrid();
    } else if (input === "where am i") {
      enterGrid();
    } else { refreshScreen();
      console.log(`Sorry, I don't know how to ${input}.\n`);
      }

  }
}


start();