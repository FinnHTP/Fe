
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const listAllGames = async (token) => {
  try {
    const response = await axios.get("`https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/games", {
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
    const response = await axios.get("https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/group", {
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


export const getAvatar = async (token) => {
  const resultDataUser = getAccountbyUsername(token);
  const accountId = resultDataUser.id;
  try {
    const response = await axios.get(
      `http:localhost:8080/api/user/${accountId}/avatar`,
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



export const searchGroups = async (searchTerm) => {
  try {
    const response = await axios.get(`https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/group/search`, {
      params: { name: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm nhóm:", error);
    throw error;
  }
};

export const getAccountbyUsername = async (token) => {
  const username = localStorage.getItem("username");
  try {
    const response = await axios.get(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/account/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkJoinedGroups = async (groups, token) => {
  try {
    const resultDataUser = await getAccountbyUsername(token);
    const accountId = resultDataUser.id;
    console.log("Account ID:", accountId);
    if (!accountId) {
      throw new Error("Account ID không tồn tại hoặc không thể lấy được.");
    }
    const joinedGroupsPromises = groups.map(async (group) => {
      const response = await axios.get(`https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/group/${group.id}/isUserJoined`, {
        params: { accountId }, 
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("DATA FUNCTION CHECKJOINEDGROUPS: ", response.data);
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
  const resultDataUser = getAccountbyUsername(token);
  const accountId = resultDataUser.id;

  try {
    await axios.post(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/group/joinGroup`,
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
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/api/group/leaveGroup`,
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

export const createGroup = async (newGroupName,  status, token) => {
  if (!newGroupName) {
    throw new Error("Vui lòng nhập tên nhóm.");
  }

  const formData = new FormData();
  formData.append("name", newGroupName);
  formData.append("status", status);
  formData.append("createDate", new Date().toISOString().split("T")[0]);

  try {
    const response = await axios.post(
      `https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/group`,
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

export const getNewBlogsToday = async (groupId, token) => {
  try {
    const response = await axios.get(`https://steam-gamemanagement-75086cac80ca.herokuapp.com/api/group/${groupId}/blogday`, {
    
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch new blogs count:", error.response ? error.response.data : error.message);
    throw error;
  }
};
