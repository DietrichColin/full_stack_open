import React, { useState, useEffect } from 'react';
import Person from './Persons.js';
import PersonForm from './PersonForm.js';
import Filter from './Filter.js';
import services from '../services/numbers.js'
import Notification from './Notification.js'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ]= useState('');
  const [ search, setSearch ]= useState('');
  const [ notification, setNotification ] = useState([null, null]);

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addNotification = (succeed, message) => {
    setNotification([succeed, message]);
    setTimeout(() => {
        setNotification([null,null])
      }, 2000);
  }

  const addPerson = (event) => {
    event.preventDefault();
    let check = true;
    const person = {
      name: newName,
      number: newNumber
    };
    persons.forEach(el => {
      if(el.name.toUpperCase() === newName.toUpperCase()) {
        check = false;
      }
    })
    if(check) {
      services
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          addNotification(true, 'added '+person.name);
        });
    } else {
      const id = persons.find(el => el.name === person.name).id;
      if(window.confirm(person.name+" is already added to phonebook, replace the old number with a new one?")) {
        services
          .update(id, person)
          .then(returnedPerson => {
            setPersons(persons.map(el => el.id!==id? el : returnedPerson));
            addNotification(true, 'changed '+person.name+' number');
          });
      }
    }
    setNewName('');
    setNewNumber('');
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleDelete = (event) => {
    const id = event.target.id;
    const name = persons.find(el => el.id == id).name;
    if(window.confirm("Delete "+name+" ?")) {
      services
      .deleteData(id)
      .then(() => {
        setPersons(persons.filter(person => person.id != id));
      })
      .catch(error => {
        addNotification(false, 'informations of '+name+' has already been removed from server');
        setPersons(persons.filter(person => person.id != id));
      });
    }
  }

  useEffect(() => {
    console.log('effect');
    services.getAll().then(response => {
      setPersons(response)
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification succed={notification[0]} message={notification[1]}/>
      <Filter search={search} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} 
                  newName={newName} handleNewName={handleNewName}
                  newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Person search={search} persons={persons} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
