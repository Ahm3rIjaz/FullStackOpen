const Persons = ({persons, filter}) => {
    return (
        persons.map((person, i) => 
            person.name.includes(filter) ? <span key={i}>{person.name} {person.number}<br/></span> : ''
        )
    )
}

export default Persons