const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // reference is the 'users' table in your database
    },

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    
    }, 
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contact', ContactSchema);


/*
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

This means that the contacts schema has a field or property of user 
which is not defined on its own in the contact schema, instead, 
it is being referenced from the User schema itself.
To explain it more easily, I would say that each 
contact must be associated with a user, right? 
So, using this we are linking each and every contact 
that we create with a specific user which is identified 
by the user id.

type: mongoose.Schema.Types.ObjectId,

This explicitly means that the user field is a 
type of MongoId. And also remember that we are not 
generating any Id of our own.

*/ 