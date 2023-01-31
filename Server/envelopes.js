const envelopeRouter = require('express').Router();
const db = require("./db");
module.exports = envelopeRouter;


//GET - Display all envelopes
envelopeRouter.get("/", (req,res,next) =>{
    res.status(200).send(db.envelopeArray);
});

//GET - Display specific envelope by id


//POST - Create new envlope
envelopeRouter.post("/",(req,res,next) => {
    const { title, budget } = req.body;
    const newid = db.nextIndex;
    const newEnvelope = {
        id: newid,
        title,
        budget
    }
    db.envelopeArray.push(newEnvelope);
    res.status(201).send(newEnvelope);
});

