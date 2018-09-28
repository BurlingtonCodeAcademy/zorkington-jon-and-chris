
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



function wrap(original, maximumWidth) {
  let words = original.split(' ');
  let lines = words.reduce(wrapWord, ['']);
  return lines.join('\n').trim();

  function wrapWord(lines, word) {
      let line = lines.pop();
      const newLength = (line.length + word.length + 1);
      if (newLength > maximumWidth) {
          lines.push(line.trim());
          line = '';
      }
      line += word + ' ';
      lines.push(line);
      return lines;
  }
  
}



theGrid = {

  grid1024: {
    name: '182 Main St.',
    description: 'You are standing on Main Street between Church and South Winooski.  There is a door here.  A keypad sits on the handle.  On the door is a handwritten sign.',
    sign: {
      read: 'The sign says "Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code 12345."',
      take: 'That would be selfish. How will other students find their way?'
    },
    door: {
      open: () => console.log('The door is locked. There is a keypad on the door handle.'),
      code: 'Bzzzzt! The door is still locked.'
    },
    north: () => lockedDoor(),
    west: () => moveToGrid(theGrid.grid1023),
    south: () => moveToGrid(theGrid.grid1124),
    east: () => moveToGrid(theGrid.grid1025)
  },
  grid0924: {
    id: '182 Main St. - Foyer',
    name: '182 Main St. - Foyer',
    description: 'You are in a foyer. Or maybe it\'s an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex.  But let\'s forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced "FO-ee-yurr".  A copy of Seven Days lies in a corner.',
    sign: {
      read: 'If there was a sign here, it would say "pick up something".',
      take: 'No sign here.  Maybe you want to pick up something?'
    },
    door: {
      open: () => moveToGrid(theGrid.grid1024),
      code: 'CODE: go upstairs'
    },
    up: () => moveToGrid(theGrid.grid0824),
    north: () => moveToGrid(theGrid.grid0824),
    south: () => moveToGrid(theGrid.grid1024),
    west: () => deadEnd(),
    east: () => deadEnd()
  },
  grid0824: {
    name: '182 Main St. - Second Floor',
    description: 'You are on a landing, and another staircase is ahead.  There\'s a door here, but it\'s locked.',
    sign: {
      read: 'You see a sign that reads "Green Mountain Semiconductor".  This is not the droid you\'re looking for.',
      take: 'You can\'t take the sign!  What\'s with you and signs??'
    },
    door: {
      open: () => console.log('The door is locked, and you don\'t have a key.'),
      code: 'There\'s no keypad.'
    },
    up: () => moveToGrid(theGrid.grid0724),
    down: () => moveToGrid(theGrid.grid0924),
    north: () => moveToGrid(theGrid.grid0724),
    south: () => moveToGrid(theGrid.grid0924),
    west: () => deadEnd(),
    east: () => deadEnd()
  },
  grid0723: {
    name: '182 Main St. - Third Floor Hall (East)',
    description: 'You\'re in a hallway with a locked door to your north, but there\'s another door down the hall to the west...',
    north: () => lockedDoor(),
    south: () => deadEnd(),
    west: () => moveToGrid(theGrid.grid0722),
    east: () => moveToGrid(theGrid.grid0724)
  },
  grid0722: {
    name: '182 Main St. - Third Floor Hall (West)',
    description: 'There\'s a door to the south that reads "BURLINGTON CODE ACADEMY".  There are weird noises coming from inside.',
    door: {
      open: () => moveToGrid(theGrid.grid0822)
  },
    north: () => deadEnd(),
    south: () => moveToGrid(theGrid.grid0822),
    west: () => deadEnd(),
    east: () => moveToGrid(theGrid.grid0723)
  },
  grid0822: {
    name: 'Burlington Code Academy - Hangout Area',
    description: 'You step into a new world, a world with rules and controls, with borders and boundaries. A world where anything is possible. Where you go from here is a choice I leave to you.',
    door: {
      open: () => moveToGrid(theGrid.grid0722)
  },
  sign: {
    read: 'It\'s too far away.',
    take: 'OK, fine, you take the sign...\n\n\n\nNo, just kidding.  DON\'T TAKE THE SIGN!!'
  },
    north: () => moveToGrid(theGrid.grid0722),
    south: () => { refreshScreen(); console.log("You look out the window to the street below.  The sign is still there.  You still can't take it.") },
    west: () => deadEnd(),
    east: () => moveToGrid(theGrid.grid0823)
  },
  grid0823: {
    name: 'Burlington Code Academy - Serious Learning Time Place!',
    description: 'There\'s a man here speaking gibberish.  Some call him Alex, while others call him "The Mystical JavaScript Oracle Of The North".',
    newDescription: 'Class is in session.  SHHH.',
    sign: {
      read: 'Nope.',
      take: 'Just. No.'
    },
    alex: {
      coffee: 'Alex bounds to life and begins enumerating the virtues of Test Driven Development.  It sounds like gibberish at first, but then it all starts to make sense!  Congratulations, you are now a student!',
      look: 'Dude needs some coffee.',
      status: false
    },
    north: () => { refreshScreen(); console.log('You look at the whiteboard.  It has a bunch of symbols that look vaguely familiar, but the order doesn\'t make any sense to you ...YET')},
    south: () => { refreshScreen(); console.log("You look out the window to the sky above.  The clouds look like rubber duckies.  Hmmmm...") },
    east: () => deadEnd(),
    west: () => moveToGrid(theGrid.grid0822)
  },
  grid0724: {
    name: '182 Main St. - Third Floor',
    description: 'You\'re in a hallway at the top of the stairs that extends to the west.',
    door: {
      open: () => console.log('Behind the door is a bathroom, but you don\'t need to use it now.'),
      code: 'Um, not sure you want to do that.'
    },
    down: () => moveToGrid(theGrid.grid0824),
    west: () => moveToGrid(theGrid.grid0723),
    south: () => moveToGrid(theGrid.grid0824),
    north: () => deadEnd(),
    east: () => deadEnd()
  },
  grid1025: {
    id: 'Side walk - outside Muddy Waters',
    name: 'Side walk - outside Muddy Waters',
    description: 'You are on the side walk in front of Muddy Waters. There is a pigeon nearby.',
    pigeon: 'coo coo',
    door: {
      open: 'You open the door to Muddy Waters and the smell of coffee wafts through the air.', 
    },
    
    north: () => moveToGrid(theGrid.grid0925),
    south: () => deadEnd(),
    west: () => moveToGrid(theGrid.grid1024),
    east: () => deadEnd()

  },
    grid0925: {
      id: 'Muddy Waters Cafe',
      name: 'Muddy Waters Cafe',
      description: 'People are working and chatting. Alternative music plays in the background. An unclaimed coffee is waiting on the counter.' ,
      
      door: {
        open: 'You open the door to Muddy Waters and the smell of coffee wafts through the air.', 
      },
      coffee:{
        drink: 'mmm delicious java.',
        take: 'Did you pay for that coffee?',
      },
      north: () => deadend(),
      south: () => moveToGrid(theGrid.grid1025),
      west: () => deadEnd(),
      east: () => deadEnd()
    }
  };

itemsList = { 
  item1: {
    name: "A copy of Seven Days, Vermont's Alt-Weekly",
    description: "You pick up the paper and leaf through it looking for comics\nand ignoring the articles, just like everybody else does."
  }
}




let inventory= [];
let currentGrid = theGrid.grid1024;
const clearScreen = () => process.stdout.write('\033c\x1b[36m');
const printName = () => console.log("\n\x1b[4m\x1b[32mLocation:\n\x1b[0m\x1b[1m\x1b[34m" + currentGrid.name + "\n\x1b[36m");
const printDescription = () => console.log("\x1b[33m" + (wrap(currentGrid.description, 70)) + "\n\x1b[36m");
const refreshScreen = () => {
  clearScreen();
  printName();
}
const enterGrid = () => {
  refreshScreen();
  printDescription();
}
const deadEnd = () => {
  refreshScreen();
  console.log('You can\'t go that direction.')
}
const lockedDoor = () => {
  refreshScreen();
  console.log('The door is locked.')
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
        if (currentGrid.door && currentGrid.door.open) {
          currentGrid.door.open();
        }
        } else if (input === 'take paper' || input === 'take seven days' || input === 'pick up seven days') {
      refreshScreen();
      inventory.push(itemsList.item1.name);
      console.log(itemsList.item1.description);
    } else if (input === 'i' || input === 'inventory' || input === 'take inventory') {
      refreshScreen();
      console.log("You are carrying:");
      for (let item of inventory){  
      console.log(item)};
    } else if (input === 'drop paper' || input === 'drop seven days' || input === 'put down seven days') {
      refreshScreen();
      inventory.pop()
      console.log("Litterbug!\n");
    } else if (input.includes('enter code') && input !== 'enter code 12345') {
      refreshScreen();
      console.log(currentGrid.door.code);
    } else  if (input.includes(12345) && currentGrid === theGrid.grid1024) {
      moveToGrid(theGrid.grid0924);
      console.log("Success! The door opens. You enter the foyer and the door\nshuts behind you.\n");
    } else  if (input === "go upstairs") {
      currentGrid.up();
    } else  if (input === "go downstairs") {
      currentGrid.down();
    } else  if (input.includes('north')) {
      currentGrid.north();
    } else  if (input.includes('south')) {
      currentGrid.south();
    } else  if (input.includes('west')) {
      currentGrid.west();
    } else  if (input.includes('east')) {
      currentGrid.east();
    } else  if (input.includes('pigeon') && currentGrid.pigeon) {
      refreshScreen()
      console.log('\"coo coo\"') 
    } else if ((input.includes ('drink') || input.includes ('sip')) && input.includes('coffee') && currentGrid.coffee) {
        refreshScreen();
        console.log('No one has to know you took a sip of their coffee.');
    }  else if (input.includes('take') || input.includes('steal') && input.includes ('coffee') && currentGrid.coffee) {
        refreshScreen();
          console.log('The barista is on to you. Better not steal it.');
    } else if (input === "restart") {
      console.log("Starting over...");
      currentGrid = theGrid.grid1024;
      enterGrid();
    } else if (input === "where am i") {
      enterGrid();
    } else if (input === "look at alex") {
      refreshScreen();
      console.log(theGrid.grid0823.alex.look);
    } else if (input === "give alex coffee") {
      theGrid.grid0823.description = theGrid.grid0823.newDescription;
      refreshScreen();
      console.log(theGrid.grid0823.alex.coffee);
    } else if (input === "xyzzy") {
      clearScreen();
      console.log("\n\n\n\n\n                   \x1b[35m\x1b[1m\x1b[5mA hollow voice says 'fool'\x1b[0m\n\n\n")
      setTimeout(refreshScreen, 5000);
    } else if (input === "XYZZY") {
      clearScreen();
      console.log("\n\n\n   \x1b[36m\x1b[1m\x1b[5mLaunching U-Boot bootloader.....\x1b[0m\n\n\n")
      setTimeout(( () => console.log("Nothing happened.\n\n")), 3500);
      setTimeout(refreshScreen, 6000);
    } else if (input === "") {
      refreshScreen();
      console.log("I'm sure I don't know what you mean...\x1b[36m");
    } else if (input.includes("help")) {
      clearScreen();
      console.log("\n\n\n   \x1b[37mTHIS IS YOUR **EXTRA** HELPFUL HELP MENU!\n\n\x1b[36m-----------------------------------------------\n\n\x1b[37mMovements:\x1b[36m\n\n       north\n\nwest           east\n\n       south\n\n\n\x1b[37mLocation:\x1b[36m\n\nwhere am i\n\n\n\x1b[37mInventory:\n\n(\x1b[36mi\x1b[37m)\x1b[36mnventory\n\n\n\x1b[37mRestart from beginning:\x1b[36m\n\nrestart\n\n\n\x1b[37mEaster eggs???\x1b[30m\n\nxyzzy \x1b[36m|| \x1b[30mXYZZY\n\n\n\x1b[37mExit the game:\x1b[36m\n\nexit\n");
    } else { refreshScreen();
      console.log(`Sorry, I don't know how to ${input}.\n\x1b[36m`);
      }

  }
}


start();

