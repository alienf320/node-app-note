const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer');

const getNotes = () => {
  return "Your notes..."
}

const addNotes = (title, body, status = false) => {
  let notes = loadNotes()

  const titles = notes.map( el => el.title ).some( t => t == title)
  if(titles) {
    console.log("That title already exists")
    return 
  }
  
  const newNote = {
    title: title,
    body: body,
    status: status
  }

  notes.push(newNote)  
  console.log(chalk.green(`Note "${title}" was added!`))
  saveData(notes)
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notes2 = []
  for(let i=0; i<notes.length; i++) {
    if(notes[i].title !== title) {
      notes2.push(notes[i])
    } else {
      console.log(chalk.red(`Note "${title}" was removed`))
    }
  }

  if(notes.length === notes2.length) {
    console.log(chalk.red.inverse(`Note "${title}" was not found`))
  }

  saveData(notes2)
}

const listNotes = () => {
  const notes = loadNotes();
  console.log("-----------------------------------------------------------")
  console.log(chalk.blue.inverse("Your Notes:"))
  notes.forEach(note => {
    const symbol = note.status ? "[X]  " : "[ ]  " 
    console.log(chalk.yellow(symbol + note.title))
  });
  console.log("-----------------------------------------------------------")
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find( note => note.title == title);

  if(note) {
    console.log("-----------------------------------------------------------")
    console.log(chalk.magenta.bold(note.title))
    console.log(note.body)
    console.log("-----------------------------------------------------------")
  } else {
    console.log(chalk.red.inverse("That note does not exist"))
  }
}

const updateNotes = async (title) => {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.red.inverse('No notes found.'));
    return;
  }

  const notes2 = [];

  for (const note of notes) {
    if (note.title === title) {
      try {
        const answer = await inquirer.prompt({
          name: 'body',
          message: 'Write the new body',
          default: note.body,
          validate: (input) => (input ? true : 'Please enter a valid body.')
        });

        const newNote = {
          title: title,
          body: answer.body,
          status: note.status
        };

        console.log(chalk.yellow('Note updated'));

        notes2.push(newNote);
      } catch (error) {
        console.error(chalk.red.inverse('An error occurred:'), error);
      }
    } else {
      notes2.push(note);
    }
  }

  saveData(notes2);
};



const loadNotes = () => {
  try {
    const dataJSON = fs.readFileSync('./notes.json').toString()
    const data = JSON.parse(dataJSON)
    return data;
  } catch {
    console.log("That file does not exist")
    return []
  }
}

const saveData = (notes) => {
  fs.writeFileSync('./notes.json', JSON.stringify(notes))
}

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  updateNotes: updateNotes
}