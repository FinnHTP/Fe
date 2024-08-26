import React, { useEffect, useState } from "react";
import {
  loadUsers,
  addAccount,
  deleteAccount,
  viewAccount,
  updateAccount,
  searchAccountByUsername, 
} from "../../service/AccountAdmin.service";
import NavbarAdminComponent from "../../component/NavbarAdmin.Component"; 

function AccountAdminComponent() {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({
    id: "",
    username: "",
    level: "",
    password: "",
    rankTypeId: "",
    accountBalance: "",
    email: "",
  });

  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    const users = await loadUsers();
    setAccounts(users);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addAccount(account);
    loadAllUsers();
    handleResetForm();
  };

  const handleDeleteAccount = async (id) => {
    await deleteAccount(id);
    loadAllUsers();
  };

  const handleViewAccount = async (id) => {
    const data = await viewAccount(id);
    setAccount(data);
    loadAllUsers();
  };

  const handleEditAccount = async (e) => {
    e.preventDefault();
    await updateAccount(account.id, account);
    loadAllUsers();
    handleResetForm();
  };

  const onInputChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setAccount({
      id: "",
      username: "",
      level: "",
      password: "",
      rankTypeId: "",
      accountBalance: "",
      email: "",
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = async () => {
    if (searchUsername.trim() === "") {
      loadAllUsers();
    } else {
      const account = await searchAccountByUsername(searchUsername);
      setAccounts(account ? [account] : []);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <NavbarAdminComponent />
      </div>
      <div className="w-3/4 p-4 bg-gray-900 text-white">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-center text-2xl mb-4">Account Management</h2>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg">Accounts</h4>
            {/* <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={toggleForm}
            >
              {showForm ? "Hide Form" : "Add Account"}
            </button> */}
          </div>
          
          <div className="flex mb-4">
            <input
              className="rounded-tl-2xl rounded-bl-2xl p-2 bg-gray-700 text-white"
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              placeholder="Enter Username"
            />
            <span
              className="text-white px-4 py-2 rounded-tr-2xl rounded-br-2xl bg-customBgFreeGames cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </span>
          </div>

          {showForm && (
            <div className="bg-gray-700 p-4 rounded mt-4">
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={account.username}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="level" className="block text-gray-300">
                    Level
                  </label>
                  <input
                    type="text"
                    id="level"
                    name="level"
                    value={account.level}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="rankTypeId" className="block text-gray-300">
                    Rank Type ID
                  </label>
                  <input
                    type="text"
                    id="rankTypeId"
                    name="rankTypeId"
                    value={account.rankTypeId.name}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="accountBalance" className="block text-gray-300">
                    Account Balance
                  </label>
                  <input
                    type="text"
                    id="accountBalance"
                    name="accountBalance"
                    value={account.accountBalance}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={account.email}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded bg-gray-800 text-white"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Thêm
                  </button>
                  <button
                    type="button"
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={handleEditAccount}
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleResetForm}
                  >
                    Làm mới
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b border-gray-700">STT</th>
                  <th className="p-2 border-b border-gray-700">Username</th>
                  <th className="p-2 border-b border-gray-700">Level</th>
                  <th className="p-2 border-b border-gray-700">Rank Type ID</th>
                  <th className="p-2 border-b border-gray-700">Account Balance</th>
                  <th className="p-2 border-b border-gray-700">Email</th>
                  {/* <th className="p-2 border-b border-gray-700">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{account.username}</td>
                    <td className="p-2">{account.level}</td>
                    <td className="p-2">{account.rankTypeId.name}</td>
                    <td className="p-2">{account.accountBalance}</td>
                    <td className="p-2">{account.email}</td>
                    {/* <td className="p-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => {
                          toggleForm();
                          handleViewAccount(account.id);
                        }}
                      >
                        Chi tiết
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        Xóa
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountAdminComponent;
