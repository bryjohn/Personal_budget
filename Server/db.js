//mock database meant to store array of envelopes
//each envelope object has: id,title,and budget
const envelopeArray =  [
    {
      id: 1,
      title: "Rent",
      budget: 1000,
    },
    {
      id: 2,
      title: "Groceries",
      budget: 300,
    },
    {
      id: 3,
      title: "Entertainment",
      budget: 400,
    },
];

const nextIndex = envelopeArray.length + 1;

module.exports = {envelopeArray, nextIndex} ;
