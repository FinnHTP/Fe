
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const listAllGames = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/games", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu:", error);
    throw error;
  }
};

export const listAllGroups = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/group", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu:", error);
    throw error;
  }
};

export const getGroupAvatars = async (groupId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/group/member/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get group avatars:", error.response ? error.response.data : error.message);
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
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Failed to get avatar:", error.response ? error.response.data : error.message);
    return null;
  }
};

export const getAvatarOfGroup = async (groupId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/group/${groupId}/image`,
      {
        responseType: "arraybuffer",
      }
    );
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const urlGroup = URL.createObjectURL(blob);
    return urlGroup;
  } catch (error) {
    console.error("Failed to get avatar:", error.response ? error.response.data : error.message);
    return null;
  }
};

export const uploadAvatarGroup = async (groupId, file, token) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.post(
      `http://localhost:8080/api/group/${groupId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Avatar uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to upload avatar:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const searchGroups = async (searchTerm) => {
  try {
    const response = await axios.get("http://localhost:8080/api/group/search", {
      params: { name: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm nhóm:", error);
    throw error;
  }
};

export const checkJoinedGroups = async (groups, token) => {
  const decode = jwtDecode(token);
  const accountId = decode.id;

  try {
    const joinedGroupsPromises = groups.map(async (group) => {
      const response = await axios.get(`http://localhost:8080/api/group/${group.id}/isUserJoined`, {
        params: { accountId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data ? group.id : null;
    });

    const results = await Promise.all(joinedGroupsPromises);
    return results.filter(Boolean);
  } catch (error) {
    console.error("Lỗi khi kiểm tra nhóm đã tham gia:", error);
    throw error;
  }
};

export const joinGroup = async (groupId, token) => {
  const decode = jwtDecode(token);
  const accountId = decode.id;

  try {
    await axios.post(
      `http://localhost:8080/api/group/joinGroup`,
      { accountId, groupId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Lỗi khi tham gia nhóm:", error);
    throw error;
  }
};

export const leaveGroup = async (groupId, token) => {
  const decode = jwtDecode(token);
  const accountId = decode.id;

  try {
    await axios.post(
      `http://localhost:8080/api/group/leaveGroup`,
      { accountId, groupId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Lỗi khi rời nhóm:", error);
    throw error;
  }
};

export const createGroup = async (newGroupName, newGroupImage, status, token) => {
  if (!newGroupName || !newGroupImage) {
    throw new Error("Vui lòng nhập tên nhóm và chọn ảnh đại diện.");
  }

  const formData = new FormData();
  formData.append("name", newGroupName);
  formData.append("image", newGroupImage);
  formData.append("status", status);
  formData.append("createDate", new Date().toISOString().split("T")[0]);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/group",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo nhóm:", error);
    throw error;
  }
};


export const fetchJoinedGroups = async (groups, token) => {
  const joinedGroupIds = await checkJoinedGroups(groups, token);
  return joinedGroupIds;
};
