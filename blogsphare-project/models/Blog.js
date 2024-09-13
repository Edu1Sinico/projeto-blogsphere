import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  datePub: {
    type: Date,
    required: true
  },
  comments: {
    type: String,
    default: '',
    required: false
  },
  rating: {
    type: Number,
  }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
