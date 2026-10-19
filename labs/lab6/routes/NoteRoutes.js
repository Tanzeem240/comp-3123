const mongoose = require('mongoose');
const noteModel = require('../models/NotesModel.js');
const express = require('express');
const noteRoutes = express.Router();

// Helper: check the id is a valid MongoDB ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new Note
noteRoutes.post('/notes', async (req, res) => {
    // Validate request
    if (!req.body || !req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    try {
        const note = new noteModel(req.body.content);
        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Retrieve all Notes
noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).send(notes);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Retrieve a single Note with noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
    const { noteId } = req.params;
    if (!isValidId(noteId)) {
        return res.status(400).send({ message: "Invalid note id " + noteId });
    }
    try {
        const note = await noteModel.findById(noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + noteId });
        }
        res.status(200).send(note);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Update a Note with noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if (!req.body || !req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const { noteId } = req.params;
    if (!isValidId(noteId)) {
        return res.status(400).send({ message: "Invalid note id " + noteId });
    }
    try {
        const updates = { ...req.body.content, dateUpdated: Date.now() };
        const note = await noteModel.findByIdAndUpdate(noteId, updates, {
            new: true,           // return the updated document
            runValidators: true  // apply schema rules (e.g. priority enum)
        });
        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + noteId });
        }
        res.status(200).send(note);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Delete a Note with noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    const { noteId } = req.params;
    if (!isValidId(noteId)) {
        return res.status(400).send({ message: "Invalid note id " + noteId });
    }
    try {
        const note = await noteModel.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + noteId });
        }
        res.status(200).send({ message: "Note deleted successfully", note });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = noteRoutes;
