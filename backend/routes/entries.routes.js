const verifyToken = require('../middleware/verifyToken')
const Entry = require('../models/Entry')

const router = require('express').Router()

router.post('/', verifyToken, async (req,res)=>{
    const {title, entryBody, isPublic} = req.body

    const createdEntry = await Entry.create({
        title,
        entryBody,
        isPublic,
        owner: req.user._id
    })

    res.status(201).json(createdEntry)
})

router.get('/', async (req,res)=>{
    const publicEntries = await Entry.find({isPublic: true})

    res.status(200).json(publicEntries)
})

router.get('/my-entries', verifyToken, async (req,res)=>{
    const myEntries = await Entry.find({owner: req.user._id})

    res.status(200).json(myEntries)
})

router.delete('/:entryId', verifyToken, async (req,res)=>{
    const entry = await Entry.findById(req.params.entryId)

    if(!entry.owner.equals(req.user._id)) return res.status(403).json({message: "You are not allowed to do this action"})

    const deletedEntry = await Entry.findByIdAndDelete(req.params.entryId)

    res.sendStatus(204)
})

router.put('/:entryId', verifyToken, async (req,res)=>{
    const {title, entryBody, isPublic} = req.body

    const entry = await Entry.findById(req.params.entryId)

    if(!entry.owner.equals(req.user._id)) return res.status(403).json({message: "You are not allowed to do this action"})

    const updatedEntry = await Entry.findByIdAndUpdate(req.params.entryId, {
        title,
        entryBody,
        isPublic
    }, {returnDocument: 'after'})

    res.status(200).json(updatedEntry)
})

router.get('/:entryId', async (req,res)=>{
    const foundEntry = await Entry.findById(req.params.entryId)

    res.status(200).json(foundEntry)
})


module.exports = router