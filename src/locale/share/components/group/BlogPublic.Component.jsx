import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogsByGroup, createComment, getCommentsByBlog, getAvatar } from '../../services/group/Blog.service.jsx'
import { format } from 'date-fns';
import { getBlogsByStatusGroup } from '../../services/group/BlogPublic.service .jsx';

const BlogPublicComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState(null);
  const [comments, setComments] = useState({});
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [avatars, setAvatars] = useState({}); 

  // const url = window.location.href;
  // const parts = url.split('/');
  // const groupId = parts[parts.length - 1];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const blogsData = await getBlogsByStatusGroup()
      const sortedBlogs = blogsData.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
      setBlogs(blogsData);

      
      const avatarPromises = blogsData.map(async (blog) => {
        const avatarUrl = await getAvatar(blog.account.id);
        return { userId: blog.account.id, avatarUrl };
      });

      const avatarsData = await Promise.all(avatarPromises);
      const newAvatars = avatarsData.reduce((acc, avatar) => {
        acc[avatar.userId] = avatar.avatarUrl;
        return acc;
      }, {});
      
      setAvatars(newAvatars);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSelectBlog = async (blogId) => {
    try {
      if (expandedBlogId === blogId) {
        setExpandedBlogId(null);
        return;
      }

      setExpandedBlogId(blogId);
      if (!comments[blogId]) {
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

        setAvatars(prevAvatars => ({ ...prevAvatars, ...newAvatars }));
        setComments((prevComments) => ({ ...prevComments, [blogId]: commentsData }));
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
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
  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} className="mt-4 text-justify">
        <img
          src={avatars[comment.account.id] || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
          className="w-10 h-10 rounded-full"
          alt=""
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

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="space-y-6 w-2/3 mx-auto">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-customBgFreeGames p-6 rounded-lg shadow-md border border-gray-700">
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
                {format(   new Date(blog.createDate).toLocaleString(), 'dd-MM-yyyy HH:mm:ss')}
                  
                </span>
              </div>
            </div>
            <p className="text-gray-300 mt-4">{blog.content}</p>
           
      

                
                
            <button
              onClick={() => handleSelectBlog(blog.id)}
              className="text-blue-400 hover:underline mt-2"
            >
              {expandedBlogId === blog.id ? "Hide comments" : "View comments"}
            </button>
            
           

{expandedBlogId === blog.id && (
  <div className="mt-4">
    {comments[blog.id] && comments[blog.id].length > 0 ? (
      renderComments(buildCommentTree(comments[blog.id]))
    ) : (
      <p className="text-gray-500">No comments yet.</p>
    )}
    
    <div className="mt-4">
      <textarea
        name="msg"
        id="msg"
        cols="30"
        rows="1"
        className="w-[650px] p-2 border rounded-tl-2xl rounded-bl-2xl border-gray-700 mt-2 bg-gray-700 text-gray-200"
        value={content}
        onChange={handleContent}
        placeholder="Write a comment..."
      />
      <span
        id="post"
        className="bg-blue-500 rounded-tr-2xl rounded-br-2xl text-white py-1 px-2 mt-2 h-[41px] inline-block"
        onClick={handleCreateComment}
      >
        <img src="/image/icons/paper-plane.png" alt="Send" />
      </span>
    </div>
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPublicComponent;
