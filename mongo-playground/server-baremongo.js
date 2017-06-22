// do bare mongo first, use Monk later.

//from https://code.tutsplus.com/tutorials/getting-started-with-mongodb-part-1--net-22879

db.nettuts.insert({
    first: 'matthew',
    last: 'setter',
    dob: '21/04/1978',
    gender: 'm',
    hair_colour: 'brown',
    occupation: 'developer',
    nationality: 'australian'
});
        db.nettuts.insert({
    first: 'james',
    last: 'caan',
    dob: '26/03/1940',
    gender: 'm',
    hair_colour: 'brown',
    occupation: 'actor',
    nationality: 'american'
});
db.nettuts.insert({
    first: 'arnold',
    last: 'schwarzenegger',
    dob: '03/06/1925',
    gender: 'm',
    hair_colour: 'brown',
    occupation: 'actor',
    nationality: 'american'
});
db.nettuts.insert({
    first: 'tony',
    last: 'curtis',
    dob: '21/04/1978',
    gender: 'm',
    hair_colour: 'brown',
    occupation: 'developer',
    nationality: 'american'
});
db.nettuts.insert({
    first: 'jamie lee',
    last: 'curtis',
    dob: '22/11/1958',
    gender: 'f',
    hair_colour: 'brown',
    occupation: 'actor',
    nationality: 'american'
});
db.nettuts.insert({
    first: 'michael',
    last: 'caine',
    dob: '14/03/1933',
    gender: 'm',
    hair_colour: 'brown',
    occupation: 'actor',
    nationality: 'english'
});
db.nettuts.insert({
    first: 'judi',
    last: 'dench',
    dob: '09/12/1934',
    gender: 'f',
    hair_colour: 'white',
    occupation: 'actress',
    nationality: 'english'
});

db.nettuts.find();