const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Part = ({part}) => {
    return (
        <p>
        {part.name} {part.exercises}
        </p>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course["parts"].map(
                part => <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Total = ({course}) => {
    let total = course["parts"].reduce(
            (accumulator, part) => accumulator + part.exercises, 0
        )
    //let total = part1.exercises + part2.exercises + part3.exercises;
    return (
        <b>total of {total} exercises</b>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default Course