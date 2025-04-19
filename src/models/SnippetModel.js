import mongoose from 'mongoose'

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlenght: 50
  },
  content: {
    type: String,
    required: true,
    maxlenght: 999
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Snippet', snippetSchema)
