const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const myNote = mongoose.model("Note", NoteSchema);

class noteModel {
  /**
   * @description creates a note and saves it in database
   * @param {string} title
   * @param {string} content
   * @param {callback} callback
   * @returns err or data
   */
  createNote = (title, content, userId, callback) => {
    const note = new myNote({
      title: title,
      content: content,
      userId: userId,
    });
    return note.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  /**
   * @description finds all notes present in data base
   * @param {callback} callback
   * @returns err or data
   */
  findAll = (userId, callback) => {
    return myNote
      .find({ userId: userId })
      .populate({
        path: "userId",
        select: ["firstName", "lastName", "age", "email"],
      })
      .exec((error, data) => {
        return error ? callback(error, null) : callback(null, data);
      });
  };

  /**
   * @description finds one note which matches the given noteid
   * @param {Object} noteId
   * @param {callback} callback
   * @returns err or data
   */
  findOne = (userId, noteId, callback) => {
    return myNote.findOne({ userId: userId, _id: noteId }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (!data) {
        return callback("You dont have access to this note", null);
      } else {
        return callback(null, data);
      }
    });
  };

  /**
   * @description Find note and update it with the request body
   * @param {Object} noteId
   * @param {string} title
   * @param {string} content
   * @param {callback} callback
   * @returns err or data
   */
  updateNote = (userId, noteId, body, callback) => {
    return myNote.findOneAndUpdate(
      { userId: userId, _id: noteId },
      {
        title: body.title,
        content: body.content,
      },
      { new: true },
      (error, data) => {
        if (error) {
          return callback(error, null);
        }
        if (!data) {
          return callback("You dont have access to this note", null);
        } else {
          return callback(null, data);
        }
      }
    );
  };

  /**
   * @description finds a note and deletes it
   * @param {Object} noteId
   * @param {callback} callback
   * @returns err or data
   */
  deleteOne = (userId, noteId, callback) => {
    myNote.findOneAndRemove({ userId: userId, _id: noteId }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      if (!data) {
        return callback("You dont have access to this note", null);
      } else {
        return callback(null, data);
      }
    });
  };
}

module.exports = new noteModel();
