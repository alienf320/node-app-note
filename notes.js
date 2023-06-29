const fs = require('fs')

const getNotes = function() {
  return "Your notes..."
}

const addNotes = function(title, body) {
  let notes = loadNotes();
  
  const newNote = {
    title: title,
    body: body
  }

  notes.push(newNote)  
  saveData(notes)
}

const loadNotes = function() {
  try {
    const dataJSON = fs.readFileSync('./notes.json').toString
    const data = JSON.parse(dataJSON)
    return data;
  } catch {
    console.log("That file does not exist")
    return []
  }
}

const saveData = function (notes) {
  fs.writeFileSync('./notes.json', JSON.stringify(notes))
}

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes
}