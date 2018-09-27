
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


theGrid = {

  grid1024: {
    name: '182 Main St.',
    description: 'You are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nOn the door is a handwritten sign.',
    sign: {
      read: 'The sign says "Welcome to Burlington Code Academy! Come on\nup to the second floor. If the door is locked, use the code\n12345."\n',
      take: 'That would be selfish. How will other students find their way?\n'
    },
    door: {
      open: 'The door is locked. There is a keypad on the door handle.\n',
      code: 'Bzzzzt! The door is still locked.\n'
    },
    north: () => moveToGrid(theGrid.grid0924),
    west: () => moveToGrid(theGrid.grid1023),
    south: () => moveToGrid(theGrid.grid1124),
    east: () => moveToGrid(theGrid.grid1025)
  },
  grid0924: {
    id: '182 Main St. - Foyer',
    name: '182 Main St. - Foyer',
    description: 'You are in a foyer. Or maybe it\'s an antechamber. Or a\nvestibule. Or an entryway. Or an atrium. Or a narthex.\nBut let\'s forget all that fancy flatlander vocabulary,\nand just call it a foyer. In Vermont, this is pronounced\n"FO-ee-yurr".\nA copy of Seven Days lies in a corner.',
    sign: {
      read: 'If there was a sign here, it would say "pick up something".\n',
      take: 'No sign here.  Maybe you want to pick up something?\n'
    },
    door: {
      open: 'You open the door and look outside.  What a lovely day!\n',
      code: 'CODE: go upstairs\n'
    },
    north: () => moveToGrid(theGrid.grid0824),
    south: () => moveToGrid(theGrid.grid1024)
  },
  grid0824: {
    name: '182 Main St. - Second Floor',
    description: 'You are on a landing, and another staircase is ahead.\nThere\'s a door here, but it\'s locked.',
    sign: {
      read: 'You see a sign that reads "Green Mountain Semiconductor".\nThis is not the droid you\'re looking for.',
      take: 'You can\'t take the sign!  What\'s with you and signs??\n'
    },
    door: {
      open: 'The door is locked, and you don\'t have a key.\n',
      code: 'There\'s no keypad.\n'
    },
    north: () => moveToGrid(theGrid.grid0724),
    south: () => moveToGrid(theGrid.grid0924)
  },
  grid0724: {
    name: '182 Main St. - Third Floor',
    description: 'You\'re in a hallway at the top of the stairs\nthat extends to the west.',
    door: {
      open: 'It\'s a bathroom.\n',
      code: 'Um, not sure you want to do that.\n'
    },
    west: () => moveToGrid(theGrid.grid0723),
    south: () => moveToGrid(theGrid.grid0824)
  }
};




let paper = "false";
let inventory = theGrid.inventory;
let currentGrid = theGrid.grid1024;
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
    enterGrid();
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
      currentGrid.north();
      console.log("Success! The door opens. You enter the foyer and the door\nshuts behind you.\n");
    } else  if (input === "go upstairs") {
      currentGrid.north();
    } else  if (input === "go downstairs") {
      currentGrid.south();
      } else if (input === "restart") {
      console.log("Starting over...");
      currentGrid = theGrid.grid1024;
      enterGrid();
    } else if (input === "where am i") {
      enterGrid();
    } else { refreshScreen();
      console.log(`Sorry, I don't know how to ${input}.\n`);
      }

  }
}


start();