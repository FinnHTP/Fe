import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { formatInTimeZone } from "date-fns-tz";
export const getBlogsByGroup = async (groupId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/blogs/group/${groupId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getAvatar = async (accountId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/user/${accountId}/avatar`,
      {
        responseType: "arraybuffer",
      }
    );
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error(
      "Failed to get avatar:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

export const getBlogsByStatusGroup = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/blogs/public");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs by status:", error);
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
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/commentblog/blog/${groupId}`,
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

// export const getCommentsByBlog = async (groupId) => {
//   const token = localStorage.getItem("accesstoken");

//   if (!token) {
//     console.error("Token Not Found");
//     throw new Error("Token not found");
//   }

//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/commentblog/blog/${groupId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Fail to Request", error);
//     throw error;
//   }
// };

export const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/blogs/${blogId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
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
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/commentblog/blog/${blogId}`,
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

export const createBlog = async (token, content, groupId) => {
  try {
    const decodedToken = jwtDecode(token);
    const accountId = decodedToken.id;
    const accountEmail = decodedToken.email;

    const now = new Date();

    const vietnamOffset = 7 * 60 * 60 * 1000;
    const vietnamTime = new Date(now.getTime() + vietnamOffset);

    const createDate = vietnamTime.toISOString();

    const blog = {
      account: { id: accountId, email: accountEmail },
      content,
      groupId,
      createDate,
    };

    const response = await axios.post(
      `http://localhost:8080/api/blogs/group/${groupId}`,
      blog,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};
