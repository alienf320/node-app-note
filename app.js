const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.0.0')

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "This is the title of the note",
      type: "string",
      demandOption: true
    },
    body: {
      describe: "This is the body of the note",
      type: "string",
      demandOption: true
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body)
  }
})

yargs.command({
  command: "remove",
  description: "Revoves an specific note",
  builder: {
    title: {
      describe: "This is the title of the note which will be removed",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command: "list",
  description: "Esto hace una lista",
  handler: function() {
    console.log("Muestra las notas")
  }
})

yargs.command({
  command: "read",
  description: "Supongo que lee una nota",
  handler() {
    console.log("Aca la tenés")
  }
})

yargs.parse()