import React, { useEffect, useState } from "react";
import {
  loadGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  viewGroupDetails,
} from "../../../../locale/admin/service/Group.service";
import NavbarAdminComponent from "../../component/NavbarAdmin.Component";

function GroupAdminComponent() {
  const [showForm, setShowForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupData, setGroupData] = useState({
    id: "",
    name: "",
    account: { id: "" },
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const data = await loadGroups();
    setGroups(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupData.id) {
      await updateGroup(groupData.id, groupData);
    } else {
      await createGroup(groupData);
    }
    fetchGroups();
    handleResetForm();
  };

  const handleDelete = async (id) => {
    await deleteGroup(id);
    fetchGroups();
  };

  const handleView = async (id) => {
    const data = await viewGroupDetails(id);
    setSelectedGroup(data);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleResetForm = () => {
    setGroupData({
      id: "",
      name: "",
      account: { id: "" },
    });
    setShowForm(false);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <NavbarAdminComponent />
      </div>
      <div className="w-3/4 p-4">
        <div className="bg-gray-700 p-4 rounded-md">
          <h2 className="text-white mb-4">Group Management</h2>
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add Group"}
          </button> */}

          {showForm && (
            <form
              className="bg-gray-800 p-4 rounded-md mb-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={groupData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Account ID</label>
                <input
                  type="text"
                  name="account.id"
                  value={groupData.account.id}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {groupData.id ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                onClick={handleResetForm}
              >
                Reset
              </button>
            </form>
          )}

          <table className="w-full bg-gray-800 text-white rounded-md">
            <thead>
              <tr>
                <th className="p-2 border-r  border-b">ID Group</th>
                <th className="p-2 border-r  border-b">Name Group</th>
                <th className="p-2  border-r  border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td className="p-2  border-r">{group.id}</td>
                  <td className="p-2  border-r">{group.name}</td>
                  <td className="p-2  border-r flex">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleView(group.id)}
                    >
                          <img src="/image/icons/pencil.png" alt="Edit" className="w-6 h-6" />
                    </button>
                    <button
                      className="bg-red-500 ml-2 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(group.id)}
                    >
                       <img src="/image/icons/delete.png" alt="Delete" className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && selectedGroup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Chi tiết Nhóm</h2>
                <div>
                  <p><strong>Group ID:</strong> {selectedGroup.groupId}</p>
                  <p><strong>Total Members:</strong> {selectedGroup.totalMembers}</p>
                  <p><strong>ID members:</strong> {selectedGroup.memberIds.join(', ')}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupAdminComponent;
