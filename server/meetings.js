const express = require('express')
const meetingsRouter = express.Router()
const {getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase} = require('./db')

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
  })

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = createMeeting()
    if(createMeeting){
        addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting)
    } else{
        res.status(400).send
    }
})

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.send(204)
})

module.exports = meetingsRouter