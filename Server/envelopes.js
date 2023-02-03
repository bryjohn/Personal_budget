const envelopeRouter = require('express').Router();

const db = require("./db");
module.exports = envelopeRouter;

//GET - Display all envelopes
envelopeRouter.get("/", (req,res,next) =>{
    res.status(200).send(db.envelopeArray);
});

//GET - Display specific envelope by id
envelopeRouter.get("/:envelopesId", (req,res,next) => {
    const envelope = db.findById(req.params.envelopesId);
    if(envelope){
        res.status(200).send(envelope);
    }
    else{
        res.status(404).send("Envelope not found");
    }
    
});

//POST - Create new envlope
//json ex: {"title" : "example", "budget" : 400}
envelopeRouter.post("/",(req,res,next) => {
    const { title, budget } = req.body;
    const newid = db.nextIndex();
    const newEnvelope = {
        id: newid,
        title,
        budget
    }
    db.envelopeArray.push(newEnvelope);
    res.status(201).send(newEnvelope);
});
//DELETE envelope by id
envelopeRouter.delete("/:envelopesId", (req,res,next) => {
    const deleted = db.deleteById(req.params.envelopesId);
    if(deleted){
        res.status(201).send(db.envelopeArray);
    }
    else{
        res.status(404).send("Could not delete: Envelope not found");
    }
    
});
//UPDATE envelope title and/or budget
//json ex: {"title" : null , "budget" : 400}
envelopeRouter.put("/:envelopeId", (req,res,next) => {
    const envelope = db.findById(req.params.envelopeId);
    const {title, budget} = req.body;
    if(!envelope) {
        res.status(404).send("Envelope not found");
    }
    else{
        const updatedEnvelope = db.updateDb(title,budget,envelope.id);
        res.status(201).send(updatedEnvelope);
    }
});

//TRANSFER budget from one envelope to another
//json ex: {"transfer" :  400}
envelopeRouter.post("/:fromId/:toId", (req,res,next) =>{
    const from = req.params.from;
    const to = req.params.to;
    const {transfer} = req.body;

    const envelope = db.transferEnvelope(from,to,transfer);
    
    if(envelope){
        res.status(200).send(envelope);
    }
    if(!envelope){
        res.status(404).send("Envelope Not Found");
    }
    
});
