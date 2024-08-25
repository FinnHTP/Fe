import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBlogsByGroup, createBlog, createComment, getCommentsByBlog, getAvatar } from '../../services/group/Blog.service.jsx';
import { format } from 'date-fns';

const BlogComponent = () => {
  
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState("");
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [expandedBlogContent, setExpandedBlogContent] = useState({});
  const [comments, setComments] = useState({});
  const [avatars, setAvatars] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const location = useLocation();
  const { isJoined } = location.state || {};
  const [parentId, setParentId] = useState(null);
  const url = window.location.href;
  const parts = url.split('/');
  const groupId = parts[parts.length - 1];

  useEffect(() => {
    fetchData();
  }, [groupId]);

  const fetchData = async () => {
    try {
      const blogsData = await getBlogsByGroup(groupId);
      const sortedBlogs = blogsData.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
      setBlogs(blogsData);
      console.log('Blogs Data:', blogsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accesstoken");
    if (token && expandedBlogId) {
      try {
        const newComment = await createComment(token, content, parentId, expandedBlogId);
        setComments((prevComments) => ({
          ...prevComments,
          [expandedBlogId]: [...prevComments[expandedBlogId], newComment]
        }));
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

    const handleReply = (comment) => {
    setParentId(comment.id);
    setContent(`${comment.account.email} `);
  };


  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} className="mt-4 text-justify">
        <img
          src={avatars[comment.account.id] || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
          className="w-10 h-10 rounded-full"
          alt="hinhanh"
        />
        <h4 className="font-semibold text-gray-300">{comment.account ? comment.account.email : "Anonymous"}</h4>
        <span className="text-sm text-gray-500">
  {format(   new Date(comment.date).toLocaleString(), 'dd-MM-yyyy HH:mm:ss')}
</span>
        <br />
        <p className="text-gray-400">{comment.content}</p>
        <button
          onClick={() => handleReply(comment)}
          className="text-blue-400 hover:underline"
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

  const toggleContentExpansion = (blogId) => {
    setExpandedBlogContent((prevExpandedBlogContent) => ({
      ...prevExpandedBlogContent,
      [blogId]: !prevExpandedBlogContent[blogId]
    }));
  };

  const renderBlogContent = (blog) => {
    const isExpanded = expandedBlogContent[blog.id];
    const contentPreview = blog.content.slice(0, 200); 
    return (
      <div>
        <span className="text-gray-300 mt-4">
          {isExpanded ? blog.content : contentPreview + (blog.content.length > 200 ? '...' : '')}
        </span>
        {blog.content.length > 200 && (
          <button
            onClick={() => toggleContentExpansion(blog.id)}
            className="text-blue-400 hover:underline mt-2"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    );
  };

  const handleSelectBlog = async (blogId) => {
    if (expandedBlogId === blogId) {
      setExpandedBlogId(null);
    } else {
      setExpandedBlogId(blogId); 
      if (!comments[blogId]) {
        try {
          const commentsData = await getCommentsByBlog(blogId);
          const avatarPromises = commentsData.map(async (comment) => {
            if (!avatars[comment.account.id]) {
              const avatarUrl = await getAvatar(comment.account.id);
              return { userId: comment.account.id, avatarUrl };
            }
            return null;
          });
          const avatarsData = await Promise.all(avatarPromises);
          const newAvatars = avatarsData.reduce((acc, avatar) => {
            if (avatar) {
              acc[avatar.userId] = avatar.avatarUrl;
            }
            return acc;
          }, {});

          setAvatars((prev) => ({ ...prev, ...newAvatars }));
          setComments((prevComments) => ({ ...prevComments, [blogId]: commentsData }));
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    }
  };

  const handleBackClick = () => {
    window.location.href = 'http://localhost:3000/group';
  };

  const handleCreateBlog = async () => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      try {
        const newBlog = await createBlog(token, content, groupId);
        setBlogs([newBlog, ...blogs]);
        setContent("");
        setIsModalOpen(false); 
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleContentChange = (e) => {
    setContent(e.target.value); 
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      {isJoined && (
        <>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 mb-6"
            onClick={openModal} 
          >
            Create New Blog
          </button>

          <button onClick={handleBackClick} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 mb-6 ml-2">
          Back to Group
        </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 w-2/3">
                <h2 className="text-xl font-semibold text-gray-200 mb-4">Create New Blog</h2>
                <textarea
                  className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                  rows="13"
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Enter your blog content here..."
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleCreateBlog}
                  >
                    Create Blog
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="space-y-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="flex items-center">
              <img
               src={avatars[blog.account.id] || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
                alt="avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h5 className="text-lg font-semibold text-gray-200">
                  {blog.account.email}
                </h5>
                <span className="text-sm text-gray-500">
                  {new Date(blog.createDate).toLocaleString()}
                </span>
              </div>
            </div>
            {renderBlogContent(blog)}
            {isJoined && (
              <button
                onClick={() => handleSelectBlog(blog.id)}
                className="text-blue-400 hover:underline mt-2"
              >
                {expandedBlogId === blog.id ? "Hide comments" : "View comments"}
              </button>
            )}
                 {expandedBlogId === blog.id && (
              <div className="mt-4">
                {comments[blog.id] && comments[blog.id].length > 0 ? (
                  renderComments(buildCommentTree(comments[blog.id]))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
                <textarea
                  name="msg"
                  id="msg"
                  cols="30"
                  rows="3"
                  className="w-full p-2 border border-gray-700 rounded mt-2 bg-gray-700 text-gray-200"
                  onChange={handleContent}
                  value={content}
                  placeholder="Write a comment..."
                ></textarea>
                <button
                  type="button"
                  id="post"
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  onClick={handleCreateComment}
                >
                  Send Comment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;
