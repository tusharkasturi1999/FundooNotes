const express = require("express");
const noteController = require("../controllers/note/note.controller");
const noteMiddleware = require("../middleware/note.middleware.js");
const noteRoute = express.Router();
// Create a new Note
noteRoute.post("/", noteMiddleware.ensureToken,noteMiddleware.validate, noteController.createNote);

// Retrieve all Notes
noteRoute.get("/",noteMiddleware.ensureToken,noteController.findAll);

// Retrieve a single Note with noteId
noteRoute.get("/:noteId", noteMiddleware.ensureToken,noteController.findOne);

// Update a Note with noteId
noteRoute.put("/:noteId",noteMiddleware.ensureToken,noteMiddleware.validate,noteController.updateNote);

// Delete a Note with noteId
noteRoute.delete("/:noteId", noteMiddleware.ensureToken,noteController.deleteOne);

module.exports = noteRoute;
