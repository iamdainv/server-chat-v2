const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
// import mongoose from 'mongoose';

const conversationTypes = ['User', 'ChatGroup'];

const ConversationSchema = mongoose.Schema(
  {
    senders: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiver: {
      type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
      required: true,
    },
    conversationType: {
      type: String,
      enum: conversationTypes,
      default: 'User',
    },
    name: String,
    lastMessage: String,
    photo: { type: String, default: '' },
  },
  { timestamps: true }
);
ConversationSchema.plugin(toJSON);
ConversationSchema.plugin(paginate);
const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
