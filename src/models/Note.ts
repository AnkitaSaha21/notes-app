import mongoose, { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema({
  title: String,
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Note = models.Note || model('Note', NoteSchema);
export default Note;
