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
const printName = () => console.log("\n\x1b[4m\x1b[32mLocation:\n\x1b[0m\x1b[1m\x1b[34m" + currentGrid.name + "\n\x1b[0m");
const printDescription = () => console.log("\x1b[33m" + currentGrid.description + "\n");
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
    if (input === "exit") {
      clearScreen();
      console.log("Goodbye!");
      process.exit();
    } else if (input === "read sign") {
      if (currentGrid.sign && currentGrid.sign.read) {
      refreshScreen();
      console.log(currentGrid.sign.read);
      } else {
        refreshScreen();
        console.log("I don't see any sign here.");
      }
      } else if (input === "take sign") {
        if (currentGrid.sign && currentGrid.sign.take) {
        refreshScreen();
        console.log(currentGrid.sign.take);
        } else {
          refreshScreen();
          console.log("I don't see any sign here.");
        }
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
      if (currentGrid === zorkObjects.theGrid.grid0824) {        
        clearScreen();
        moveToGrid(zorkObjects.theGrid.grid0724);
        printName();
        printDescription();
        } else {
      clearScreen();
      moveToGrid(zorkObjects.theGrid.grid0824);
      printName();
      printDescription();
        }
      } else  if (input === "go downstairs") {
        if (currentGrid === zorkObjects.theGrid.grid0724) {        
          clearScreen();
          moveToGrid(zorkObjects.theGrid.grid0824);
          printName();
          printDescription();
          } else {
        clearScreen();
        moveToGrid(zorkObjects.theGrid.grid0924);
        printName();
        printDescription();
          }
      } else if (input === "restart") {
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