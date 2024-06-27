const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = "mongodb+srv://alexbecerradev:"+password+"@phonebookback.jnuo0jy.mongodb.net/?appName=phonebookback"

mongoose.set('strictQuery', false);

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');

    const personSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true
      },
      number: {
        type: String,
        required: true
      }
    });

    const Person = mongoose.model('Person', personSchema);

    if (process.argv.length === 3) {
        // Mostrar todos los contactos si solo se proporciona la contraseña
        return Person.find({}).then(result => {
          console.log('Phonebook:');
          result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
          });
          mongoose.connection.close();
        });
      } else if (process.argv.length === 5) {
        // Agregar un nuevo contacto si se proporcionan nombre y número
        const newPerson = new Person({
          name: name,
          number: number
        });
  
        return newPerson.save().then(() => {
          console.log(`Added ${name} number ${number} to phonebook`);
          mongoose.connection.close();
        });
      } else {
        console.log('Usage: node script.js <password> [<name> <number>]');
        mongoose.connection.close();
      }
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
      mongoose.connection.close();
    });
  
