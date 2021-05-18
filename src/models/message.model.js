const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const conversationTypes = ['User', 'ChatGroup'];

const messageType = ['text', 'images', 'files', 'notification', 'gif'];

const messageSchema = mongoose.Schema(
  {
    files: [
      {
        fileName: String,
        filePath: String,
      },
    ],
    image: [String],
    text: String,
    type: {
      type: String,
      enum: messageType,
      required: true,
    },
    child: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messages' }],
    createBy: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    conversationId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    conversationType: {
      type: String,
      enum: conversationTypes,
      default: 'User',
    },
    userSeen: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;
