const Person = ({person, deletePer}) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => deletePer(person)}>delete</button>
        </div>
    )
}

const ShowPersons = ({persons, filter, deletePer}) => {
    return (
        persons.map(person => 
            person.name.includes(filter) ? <Person key={person.id} deletePer={deletePer} person={person} /> : ''
        )
    )
}

export default ShowPersons