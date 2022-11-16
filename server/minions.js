const express = require('express');
const { de } = require('faker/lib/locales');
const minionsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db')


const checkIfInArray = (paramId) => {
    let minions = getAllFromDatabase('minions')
    let inArray = minions.find(element => element.id === paramId)
    return (inArray)
}


minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
  })
  
minionsRouter.get('/:id', (req, res, next) => {
    if(checkIfInArray(req.params.id)){
      res.status(200).send(getFromDatabaseById('minions', req.params.id))
    } else{
      res.status(404).send('ID Not found or not a number')
    }
  })

minionsRouter.post('/', (req, res, next) => {
    if(req.body){
      let minionToAdd = req.body;
      res.status(201).send(addToDatabase('minions', minionToAdd))
    } else{
      res.status(400).send()
    }
  })

minionsRouter.put('/:id', (req, res, next) => {
    if(checkIfInArray(req.params.id)){
        let updatedInstance = req.body;
        updateInstanceInDatabase('minions', updatedInstance)
        res.send(updatedInstance)
    } else{
        res.status(404).send()
    }
})

minionsRouter.delete('/:id', (req, res, next) => {
    if(checkIfInArray(req.params.id)){
        deleteFromDatabasebyId('minions', req.params.id)
        res.status(204).send()
    }else{
        res.status(404).send()
    }
})


module.exports = minionsRouter;