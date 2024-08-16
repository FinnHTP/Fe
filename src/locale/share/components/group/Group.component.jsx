
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listAllGames,
  listAllGroups,
  getGroupAvatars,
  getAvatar,
  getAvatarOfGroup,
  searchGroups,
  joinGroup,
  leaveGroup,
  createGroup,
  fetchJoinedGroups, // Import fetchJoinedGroups
} from "../../services/group/Group.service"

const GroupComponent = () => {
  const [games, setGames] = useState([]);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [avatarGroupUrl, setAvatarGroupUrl] = useState({});
  const [avatars, setAvatars] = useState({});
  const [status, setStatus] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accesstoken");

      if (!token) {
        console.error("Không có token được tìm thấy");
        return;
      }

      try {
        const gamesData = await listAllGames(token);
        setGames(gamesData);

        const groupsData = await listAllGroups(token);
        setGroups(groupsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadAvatars = async () => {
      if (groups.length > 0) {
        const avatarPromises = groups.map(async (group) => {
          const groupAvatars = await getGroupAvatars(group.id);
          const avatarUrls = await Promise.all(groupAvatars.map(member => getAvatar(member.id)));
          
          setAvatars(prevAvatars => ({
            ...prevAvatars,
            [group.id]: avatarUrls,
          }));

          const avatarGroupUrl = await getAvatarOfGroup(group.id);
          setAvatarGroupUrl(prev => ({ ...prev, [group.id]: avatarGroupUrl }));
        });

        await Promise.all(avatarPromises);

        const token = localStorage.getItem("accesstoken");
        const joinedGroupIds = await fetchJoinedGroups(groups, token);
        setJoinedGroups(joinedGroupIds);
      }
    };

    loadAvatars();
  }, [groups]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      const token = localStorage.getItem("accesstoken");
      const groupsData = await listAllGroups(token);
      setGroups(groupsData);
      return;
    }

    try {
      const groupsData = await searchGroups(searchTerm);
      setGroups(groupsData);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm nhóm:", error);
    }
  };

  const handleJoinGroup = async (groupId) => {
    const token = localStorage.getItem("accesstoken");

    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }

    try {
      await joinGroup(groupId, token);
      await fetchJoinedGroups();
      alert("Tham gia nhóm thành công");
    } catch (error) {
      console.error("Lỗi khi tham gia nhóm:", error);
      alert("Tham gia nhóm thất bại");
    }
  };

  const handleLeaveGroup = async (groupId) => {
    const token = localStorage.getItem("accesstoken");

    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }

    try {
      await leaveGroup(groupId, token);
      await fetchJoinedGroups();
      alert("Rời nhóm thành công");
    } catch (error) {
      console.error("Lỗi khi rời nhóm:", error);
      alert("Rời nhóm thất bại");
    }
  };

  const fetchBlogsByGroup = (groupId) => {
    navigate(`/blogs/group/${groupId}`);
  };

  const handleCreateGroup = async () => {
    const token = localStorage.getItem("accesstoken");

    try {
      const createdGroup = await createGroup(newGroupName, newGroupImage, status, token);
      setGroups([...groups, createdGroup]);
      await handleJoinGroup(createdGroup.id);
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi tạo nhóm:", error);
      alert("Lỗi khi tạo nhóm");
    }
  };

  const handleShowModal = () => {
    setNewGroupName("");
    setNewGroupImage(null);
    setStatus(true);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <section className="page-info-section set-bg">
        <div className="pi-content">
          <div className="container">
            <div className="row">
            </div>
          </div>
        </div>
      </section>

      <section className="page-section recent-game-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-6 text-center">
                <input
                  type="text"
                  placeholder="Nhập tên nhóm..."
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Tìm kiếm
                </button>
              </div>

              <button
                onClick={handleShowModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
              >
                Tạo nhóm
              </button>

              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 className="text-xl font-semibold mb-4">Tạo nhóm mới</h2>
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700">Tên nhóm</label>
                        <input
                          type="text"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700">Ảnh đại diện</label>
                        <input
                          type="file"
                          onChange={(e) => setNewGroupImage(e.target.files[0])}
                          className="w-full px-4 py-2 border rounded-md"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700">Public</label>
                        <input
                          type="checkbox"
                          checked={status}
                          onChange={(e) => setStatus(e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">
                          Nếu chọn, nhóm sẽ là Public. Nếu bỏ chọn, nhóm sẽ là Private.
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={handleCreateGroup}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                          Tạo nhóm
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                {groups.length > 0 ? (
                  groups.map((group) => (
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md" key={group.id}>
                      <div className="flex items-center">
                        <img
                          src={avatarGroupUrl[group.id]}
                          alt="Group Avatar"
                          className="w-24 h-24 rounded-lg"
                        />
                        <div className="ml-6">
                          <h1 className="text-white text-2xl font-semibold">
                            Nhóm: {group.name}
                          </h1>
                          <p className="text-gray-400 text-sm">
                            Ngày tạo: {group.createDate}
                          </p>
                          <div className="flex items-center mt-2">
                            {(avatars[group.id] || []).slice(0, 3).map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Avatar ${index + 1}`}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                            ))}
                            {(avatars[group.id] || []).length > 3 && (
                              <span className="text-gray-400 text-sm">
                                Và {avatars[group.id].length - 3} người khác
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-right">
                        {joinedGroups.includes(group.id) ? (
                          <>
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                              onClick={() => fetchBlogsByGroup(group.id)}
                            >
                              Chi tiết
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded-md"
                              onClick={() => handleLeaveGroup(group.id)}
                            >
                              Thoát nhóm
                            </button>
                          </>
                        ) : (
                          <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                            onClick={() => handleJoinGroup(group.id)}
                          >
                            Tham gia ngay
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white text-center">Không có nhóm nào được tìm thấy.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupComponent;
