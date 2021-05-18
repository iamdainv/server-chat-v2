const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const RelationshipUserType = [
  'FRIEND',
  'REQUESTING-FRIEND',
  'BLOCKED',
  // 'STRANGER',
];

const ContactSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: RelationshipUserType,
      default: 'REQUESTING-FRIEND',
    },
  },
  { timestamps: true }
);

ContactSchema.plugin(toJSON);
ContactSchema.plugin(paginate);

const RelationshipUserModel = mongoose.model('relationshipUser', ContactSchema);

module.exports = RelationshipUserModel;
