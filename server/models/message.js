const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  messageText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
