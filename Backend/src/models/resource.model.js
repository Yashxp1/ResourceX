import mongoose, { Schema } from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
  },
});

const Resource = mongoose.model("resource", resourceSchema)

export default Resource