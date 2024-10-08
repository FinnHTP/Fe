import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAvatar,
  listAllGroups,
  searchGroups,
  joinGroup,
  leaveGroup,
  createGroup,
  fetchJoinedGroups,
  getNewBlogsToday,
} from "../../services/group/Group.service";

const GroupComponent = () => {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBlogsToday, setNewBlogsToday] = useState({});
  const [status, setStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState(null);
  const navigate = useNavigate();

  const loadBlogs = async (groupsData, token) => {
    if (groupsData.length > 0) {
      const blogPromises = groupsData.map(async (group) => {
        const newBlogsCount = await getNewBlogsToday(group.id);
        setNewBlogsToday((prev) => ({ ...prev, [group.id]: newBlogsCount }));
      });

      await Promise.all(blogPromises);

      const joinedGroupIds = await fetchJoinedGroups(groupsData, token);
      setJoinedGroups(joinedGroupIds);
    }
  };

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
      alert("Rời nhóm thành công");
    }
  };

  const fetchBlogsByGroup = (groupId) => {
    const isJoined = joinedGroups.includes(groupId);
    navigate(`/blogs/group/${groupId}`, { state: { isJoined } });
  };

  const handleCreateGroup = async () => {
    const token = localStorage.getItem("accesstoken");

    try {
      const createdGroup = await createGroup(
        newGroupName,
        newGroupImage,
        status,
        token
      );
      setGroups([...groups, createdGroup]);
      await handleJoinGroup(createdGroup.id);
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi tạo nhóm:", error);
      alert("Lỗi khi tạo nhóm");
    }
  };

  const handleGetAvatar = async () => {
    const token = localStorage.getItem("accesstoken");
    try {
      const result = await getAvatar(token);
      console.log("Avatar User: " + result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowModal = () => {
    setNewGroupName("");
    setNewGroupImage(null);
    setStatus(true);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accesstoken");

      if (!token) {
        console.error("Không có token được tìm thấy");
        return;
      }

      try {
        const groupsData = await listAllGroups(token);
        setGroups(groupsData);

        await loadBlogs(groupsData, token);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
    handleGetAvatar();
  }, []);
  return (
    <div>
      <section className="page-section recent-game-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="flex ml-[40%] ">
                <input
                  className="rounded-tl-2xl rounded-bl-2xl p-2 bg-customBgFreeGames text-white"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter Group Name"
                />
                <span
                  className="text-white px-2 py-3 rounded-tr-2xl rounded-br-2xl bg-customBgBrowse  cursor-pointer"
                  onClick={handleSearch}
                >
                  Search
                </span>
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
                        <label className="block text-gray-700">Public</label>
                        <input
                          type="checkbox"
                          checked={status}
                          onChange={(e) => setStatus(e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">
                          Nếu chọn, nhóm sẽ là Public. Nếu bỏ chọn, nhóm sẽ là
                          Private.
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

              {/* Sử dụng grid layout để hiển thị các nhóm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.length > 0 ? (
                  groups.map((group) => (
                    <div
                      className="p-6 bg-gray-800 rounded-lg shadow-md"
                      key={group.id}
                    >
                      <div className="items-center">
                        <img
                          src="https://i.ytimg.com/vi/uZC-5D2nk9A/maxresdefault.jpg"
                          alt="Group Avatar"
                          className="w-full h-auto rounded-lg"
                        />
                        <div className="ml-6">
                          <h1 className="text-white text-2xl font-semibold">
                            Nhóm: {group.name}
                          </h1>

                          <p className="text-gray-400 text-sm">
                            Ngày tạo: {group.createDate}
                          </p>
                          {/* {images.map((image))} */}
                          <div className="flex items-center mt-2">
                            <div className="text-gray-200 mt-2">
                              Có {newBlogsToday[group.id]} bài viết mới hôm nay
                            </div>
                          </div>
                          <div className="flex items-center mt-2 text-sm">
                            {group.status ? (
                              <>
                                <i className="fas fa-globe text-gray-200"></i>
                                <span className="text-gray-200 ml-2">
                                  Nhóm công khai
                                </span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-lock text-gray-200"></i>
                                <span className="text-gray-200 ml-2">
                                  Nhóm riêng tư
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-right">
                        {group.status || joinedGroups.includes(group.id) ? (
                          <>
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                              onClick={() => fetchBlogsByGroup(group.id)}
                            >
                              Chi tiết
                            </button>
                          </>
                        ) : null}

                        {joinedGroups.includes(group.id) ? (
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={() => handleLeaveGroup(group.id)}
                          >
                            Thoát nhóm
                          </button>
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
                  <p className="text-white text-center">
                    Không có nhóm nào được tìm thấy.
                  </p>
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
