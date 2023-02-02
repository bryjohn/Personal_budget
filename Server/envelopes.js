const envelopeRouter = require('express').Router();
const { env } = require('process');
const db = require("./db");
module.exports = envelopeRouter;

//Router Param
envelopeRouter.param("envelopesId", (req,res,next,id) => {
    const envelope = db.findById(id);
    if(envelope){
        req.envelope = envelope;
        next();
    } else{
        res.status(404).send("Envelope Not Found");
    }
});
//GET - Display all envelopes
envelopeRouter.get("/", (req,res,next) =>{
    res.status(200).send(db.envelopeArray);
});

//GET - Display specific envelope by id
envelopeRouter.get("/:envelopesId", (req,res,next) => {
    res.send(req.envelope);
});

//POST - Create new envlope
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
        res.status(204);
    }
    else{
        res.status(500);
    }
    res.send();
});
//UPDATE envelope
envelopeRouter.put("/:envelopeId", (req,res,next) => {
    const envelope = db.findById(req.params.envelopeId);
    const {title, budget} = req.body;
    if(!envelope) {
        res.status(404).send();
    }
    else{
        const updatedEnvelope = db.updateDb(title,budget,envelope.id);
        res.status(201).send(updatedEnvelope);
    }
});

//TRANSFER budget from one envelope to another
envelopeRouter.post("/:from/:to", (req,res,next) =>{
    const from = req.params.from;
    const to = req.params.to;
    const {transfer} = req.body;

    const envelope = db.transferEnvelope(from,to,transfer);
    
    if(envelope){
        res.status(200).send(envelope);
    }
    if(!envelope){
        res.status(500).send();
    }
    
});
