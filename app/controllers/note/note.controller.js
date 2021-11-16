/**
 * @requires noteService,dtoObject
 */
const noteService = require("../../service/note.service");
const dtoObject = require("./note.responseSchema");

let responseObject;
class noteController {

  /**
   * @description Handles the request and response for creating a note
   * @param {Object} req 
   * @param {Object} res 
   */
  createNote = (req, res) => {
    let body = req.body;
    noteService.createNote(body, (err, data) => {
      if (err) {
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles the request and response for finding all notes
   * @param {Object} req 
   * @param {Object} res 
   */
  findAll = (req, res) => {
    noteService.findAll(req.body.userId,(err, data) => {
      if (err) {
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles the request and response for finding a single note
   * @param {Object} req 
   * @param {Object} res 
   */
  findOne = (req, res) => {
    noteService.findOne(req.body.userId,req.params.noteId, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles the request and response for updating a note
   * @param {Object} req 
   * @param {Object} res 
   */
  updateNote = (req, res) => {
    let body = req.body;
    noteService.updateNote(req.body.userId,req.params.noteId, body, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles the request and response for deleting a note
   * @param {Object} req 
   * @param {Object} res 
   */
  deleteOne = (req, res) => {
    noteService.deleteOne(req.body.userId,req.params.noteId, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = "deleted successfully";
      return res.send(responseObject);
    });
  };
}

module.exports = new noteController();
