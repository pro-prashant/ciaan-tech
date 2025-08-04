
import mongoose, { model } from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // ✅ This adds createdAt and updatedAt fields
  }
);


const Post = mongoose.models.post || mongoose.model("post",PostSchema);
export default Post;




