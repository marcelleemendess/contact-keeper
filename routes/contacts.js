const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // whenever we need to protected routes(to make the route protected)
const { check, validationResult } = require('express-validator'); // from  express documentation

const User = require('../models/User');
const Contact = require('../models/Contact');


//@route    POST api/contacts
//@desc     Get all users contacts
//@access   Private
router.get('/', auth, async (req, res) => { //with auth, it's possible to access  req.user
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); // -1: the most recent contact first
        res.json(contacts)    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route    POST api/contacts
//@desc     Add new contacts
//@access   Private
router.post('/', [auth, [check('name', 'Name is required').not().isEmpty()]],
     async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact); //send the res to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    //Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type; 

    try {
        let contact = await Contact.findById(req.params.id) //to access the :id
    
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //Make sure user owns contact       req.user.id =  the token user
        if(contact.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Not authorized'})  
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true })
        
            res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete('/:id', auth, async (req, res) => {
   
    try {
        let contact = await Contact.findById(req.params.id) //to access the :id
    
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //Make sure user owns contact       req.user.id =  the token user
        if(contact.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Not authorized'})  
        }

        await Contact.findByIdAndRemove(req.params.id)

        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;



