import React, { useState } from "react";

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="comment-section bg-gray-800 p-4 rounded-md mt-6 mx-12 mb-12">
      <h3 className="text-xl text-white mb-4">Comments</h3>
      <div className="mb-4">
        <textarea
          className="w-full p-2 rounded-md"
          rows="3"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write your comment here..."
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600"
        >
          Comment
        </button>
      </div>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="comment bg-gray-700 p-2 mb-2 rounded-md"
            >
              <p className="text-white">{comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
