const express = require('express');
const ideasRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db')

const checkIfInArray = (paramId) => {
    let ideas = getAllFromDatabase('ideas')
    let inArray = ideas.find(element => element.id === paramId)
    return (inArray)
}


ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})
  
ideasRouter.get('/:id', (req, res, next) => {
    if(checkIfInArray(req.params.id)){
      res.status(200).send(getFromDatabaseById('ideas', req.params.id))
    } else{
      res.status(404).send('ID Not found or not a number')
    }
})

ideasRouter.post('/', (req, res, next) => {
    if(req.body) {
      let ideaToAdd = {
        id: null,
        name: req.body.name,
        description: req.body.description,
        numWeeks: req.body.numWeeks,
        weeklyRevenue: req.body.weeklyRevenue
      }
      res.status(201).send(addToDatabase('ideas', ideaToAdd))
    } else{
      res.status(400).send('Missing parameter')
    }
})

ideasRouter.put('/:id', (req, res, next) => {
    if(checkIfInArray(req.params.id)) {
        let updatedInstance = req.body;
        updateInstanceInDatabase('ideas', updatedInstance);
        res.send(updatedInstance)
    } else{
        res.status(404).send()
    }
})

ideasRouter.delete('/:id', (req, res, next) => {
    if(checkIfInArray(req.params.id)){
        deleteFromDatabasebyId('ideas', req.params.id)
        res.status(204).send()
    }else{
        res.status(404).send()
    }
})


module.exports = ideasRouter;