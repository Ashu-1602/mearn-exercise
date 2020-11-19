const {Router} = require('express')
const LogEntry = require('../models/LogEntry')

const router = Router()

router.get('/', async(req, res, next) =>{
    try {
        const getEntries = await LogEntry.find()
        res.json(getEntries)
    } catch (error) {
        res.status(200)
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body)
        const createdEntry = await logEntry.save()
        res.json(createdEntry)
    } catch (error) {
        if(error.name=='ValidationError'){
            res.status(422)
        }
        next(error)
    }
})
module.exports = router
