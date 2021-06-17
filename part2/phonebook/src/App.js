import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import ShowPersons from './components/ShowPersons'
import personsServive from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personsServive
      .getAll().then(initialData => setPersons(initialData))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personFound = persons.find(person => person.name === newName)
    if (personFound) {
      if (window.confirm(`${newName} is already added to phonebook\nUpdate the number with the new one?`)) {
        const changedPerson = {...personFound, number: newNumber}
        personsServive
          .update(personFound.id, changedPerson).then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personFound.id ? person: updatedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(error.response.data["error"])
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      personsServive
        .create(newPerson).then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setErrorMessage(error.response.data["error"])
          setTimeout(() => {
            setErrorMessage(null)
          }, 10000)
        })
    }
  }

  const deletePer = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsServive
        .deletePerson(personToDelete.id).then(updatedData => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
        .catch(error => {
          setErrorMessage(`'${personToDelete.name}' was already removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ShowPersons deletePer={deletePer} persons={persons} filter={filter} />
    </div>
  )
}

export default App