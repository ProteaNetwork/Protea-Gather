import { Schema, Document } from 'mongoose';
import { Schemas } from 'src/app.constants';
import { AttachmentDocument } from 'src/attachments/attachment.schema';
import { ObjectId } from 'bson';

export interface Community {
  tbcAddress: string;
  eventManagerAddress: string;
  membershipManagerAddress: string;
  banner: AttachmentDocument | ObjectId;
  name: string;
  tokenSymbol: string;
  description: string;
  tags: any;
}

export interface CommunityDocument extends Community, Document { }

export const CommunitySchema = new Schema({
  tbcAddress: { type: String, required: true, indexed: true },
  eventManagerAddress: { type: String, required: false },
  membershipManagerAddress: { type: String, required: false },
  banner: {type: Schema.Types.ObjectId, ref: Schemas.Attachment},
  name: { type: String, required: false },
  tokenSymbol: { type: String, required: false },
  description: { type: String, required: false },
  tags: { type: String, required: false },// TODO: convert to object referenced taxon table
}, {
    timestamps: true,
    toJSON: {
      getters: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
      virtuals: true,
    },
    toObject: {
      getters: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
    },
  });

// CommunitySchema.virtual('fullName').get(function() {
//   return (this.firstName && this.lastName) ? this.firstName + ' ' + this.lastName : this.ethAddress;
// });
