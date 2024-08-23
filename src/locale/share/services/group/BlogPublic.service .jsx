
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

// export const getBlogsByGroup = async (groupId) => {
//   try {
//     const response = await axios.get(`http://localhost:8080/api/blogs/group/${groupId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     throw error;
//   }
// };

export const getBlogsByStatusGroup = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/blogs/public');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs by status:', error);
    throw error;
  }
};




export const createComment = async (token, content, parentId, groupId) => {
  try {
    const decodedToken = jwtDecode(token);
    const accountId = decodedToken.id;
    const accountEmail = decodedToken.email;

    const comment = {
      account: { id: accountId, email: accountEmail },
      content,
      parentId: parentId,
      blog: { id: groupId },
    };

    const response = await axios.post(
      `http://localhost:8080/api/commentblog/blog/${groupId}`,
      comment,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi bình luận:", error);
    throw error;
  }
};

export const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};


export const getCommentsByBlog = async (blogId) => {
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    console.error("Token Not Found");
    throw new Error("Token not found");
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/api/commentblog/blog/${blogId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fail to Request", error);
    throw error;
  }
};

