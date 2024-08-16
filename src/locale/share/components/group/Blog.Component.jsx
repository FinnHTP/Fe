
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogsByGroup, createComment, getCommentsByBlog } from '../../services/group/Blog.service.jsx'

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState(null);
  const [comments, setComments] = useState([]);
//   const { id: groupId } = useParams();

const url = window.location.href;
const parts = url.split('/');
const groupId = parts[parts.length - 1];

  useEffect(() => {
    fetchData();
  }, [groupId]);

  const fetchData = async () => {
    try {
      const blogsData = await getBlogsByGroup(groupId);
      setBlogs(blogsData);

      const commentsData = await getCommentsByBlog(groupId);
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleReply = (comment) => {
    setParentId(comment.id);
    setContent(`${comment.account.email} `);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accesstoken");
    if (token) {
      try {
        const newComment = await createComment(token, content, parentId, groupId);
        setComments((prevComments) => [...prevComments, newComment]);
        setContent("");
        setParentId(null);
      } catch (error) {
        console.error("Lỗi khi gửi bình luận:", error);
      }
    }
  };

  const buildCommentTree = (comments) => {
    const map = {};
    const roots = [];

    comments.forEach((comment) => {
      map[comment.id] = { ...comment, children: [] };
    });

    comments.forEach((comment) => {
      if (comment.parentId === null) {
        roots.push(map[comment.id]);
      } else if (map[comment.parentId]) {
        map[comment.parentId].children.push(map[comment.id]);
      }
    });

    return roots;
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} className="mt-4 text-justify">
        <img
          src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
          className="w-14 h-14 rounded-full"
          alt=""
        />
        <h4 className="font-semibold">{comment.account ? comment.account.email : "Anonymous"}</h4>
        <span className="text-sm">{comment.date}</span>
        <br />
        <p className="text-gray-700">{comment.content}</p>
        <button
          onClick={() => handleReply(comment)}
          className="text-blue-500 hover:underline"
        >
          Reply
        </button>
        {comment.children.length > 0 && (
          <div className="ml-12">
            {renderComments(comment.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {blogs.map(blog => (
            <div key={blog.id} className="mb-4">
              <h5 className="text-lg font-semibold">Bài viết được thực hiện bởi {blog.account.email}</h5>
              <span className="text-sm text-gray-500">Thời gian đăng: {blog.createDate}</span>
              <p className="text-gray-700 mt-2">{blog.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h5 className="text-xl font-semibold">Comment</h5>
        <textarea
          name="msg"
          id="msg"
          cols="30"
          rows="5"
          className="w-full p-2 border rounded mt-2"
          onChange={handleContent}
          value={content}
        ></textarea>

        <button
          type="button"
          id="post"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleCreateComment}
        >
          Send
        </button>

        <div className="mt-6 border-t pt-4">
          {comments.length === 0 ? (
            <p className="text-center text-lg">Leave Your Comment Here.</p>
          ) : (
            renderComments(buildCommentTree(comments))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
