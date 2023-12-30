const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
    // res.send("get all contacts");
    // res.json({ message: "get all contacts" });
    const contacts = await Contact.find({ user_id: req.User.id });
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        console.log("hello");
        throw new Error("All Fields Are Compulsory");
    }
    const cont = await Contact.create({
        name, email, phone,
        user_id: req.User.id
    });
    res.status(201).json(cont);
})

const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact not found");
    }

    res.status(200).json(contact);
})
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact not found");
    }

    if (contact.user_id.toString() !== req.User.id) {
        res.status(403);
        throw new Error("u are not elligible to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },

    )
    res.status(200).json(updatedContact);
})
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact not found");
    }

    if (contact.user_id.toString() !== req.User.id) {
        res.status(403);
        throw new Error("u are not elligible to delete this contact");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
})
module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };