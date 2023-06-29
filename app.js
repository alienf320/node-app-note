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
  handler: function(argv) {
    notes.addNotes(argv.title, argv.body)
  }
})

yargs.command({
  command: "remove",
  description: "Esto",
  handler: function() {
    console.log("Removió una nota")
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
  handler: function() {
    console.log("Aca la tenés")
  }
})

yargs.parse()

//console.log(yargs.argv)