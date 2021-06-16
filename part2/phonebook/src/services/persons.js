import axios from "axios"

const baseUrl = '/api/persons/'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = { 
        "name": "Non Existent", 
        "number": "0900-78601",
        "id": 1000
      }
    return request.then(response => response.data.concat(nonExisting))
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, changedPerson) => {
    const request = axios.put(`${baseUrl}${id}`, changedPerson)
    return request.then(response => response.data)
}

const deletePerson = id => axios.delete(`${baseUrl}${id}`)

export default {getAll, create, update, deletePerson}