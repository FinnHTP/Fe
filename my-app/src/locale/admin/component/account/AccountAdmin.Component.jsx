import React, { useEffect, useState } from "react";
import {
  loadAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  viewAccount,
  getUser, 
} from "../../service/AccountAdmin.service";
import NavbarAdminComponent from "../../component/NavbarAdmin.Component";

function AccountAdminComponent() {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [searchResult, setSearchResult] = useState(null); 
  const [account, setAccount] = useState({
    id: "",
    username: "",
    level: "",
    password: "",
    rankTypeId: "",
    accountBalance: "",
    email: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const data = await loadAccounts();
    setAccounts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (account.id) {
      await updateAccount(account.id, account);
    } else {
      await createAccount(account);
    }
    fetchAccounts();
    handleResetForm();
  };

  const handleDelete = async (id) => {
    await deleteAccount(id);
    fetchAccounts();
  };

  const handleView = async (id) => {
    const data = await viewAccount(id);
    setAccount(data);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
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
    setShowForm(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const result = await getUser(searchQuery);
      setSearchResult(result);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <NavbarAdminComponent />
      </div>
      <div className="w-3/4 p-4">
        <div className="bg-gray-700 p-4 rounded-md">
          <h2 className="text-white mb-4">Account Management</h2>
          <div className="mb-4">
            <input
              className="rounded-tl-2xl rounded-bl-2xl p-2 bg-customBgFreeGames text-white"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Username"
            />
            <span
              className="text-white px-2 py-3 rounded-tr-2xl rounded-br-2xl bg-customBgBrowse  cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </span>
          </div>
          {searchResult && (
            <div className="bg-gray-800 p-4 rounded-md mb-4">
         
              <div className="p-2 text-white">
                Username: {searchResult.username}
              </div>
              <div className="p-2 text-white">
                Level: {searchResult.level}
              </div>
              <div className="p-2 text-white">
                Rank Type ID: {searchResult.rankTypeId.name}
              </div>
              <div className="p-2 text-white">
                Account Balance: {searchResult.accountBalance}
              </div>
              <div className="p-2 text-white">
                Email: {searchResult.email}
              </div>
            </div>
          )}

          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add Account"}
          </button> */}

          {showForm && (
            <form className="bg-gray-800 p-4 rounded-md mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white">Username</label>
                <input
                disabled="disable"
                  type="text"
                  name="username"
                  value={account.username}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Level</label>
                <input
                    disabled="disable"
                  type="text"
                  name="level"
                  value={account.level}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Rank Type ID</label>
                <input
                    disabled="disable"
                  type="text"
                  name="rankTypeId"
                  value={account.rankTypeId.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Account Balance</label>
                <input
                  type="text"
                  name="accountBalance"
                  value={account.accountBalance}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Email</label>
                <input
                    disabled="disable"
                  type="text"
                  name="email"
                  value={account.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {account.id ? "Update" : "Add"}
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
            <thead className="bg-gray-900">
              <tr>
                <th className="py-2 px-4 text-left">STT</th>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Level</th>
                <th className="py-2 px-4 text-left">Rank Type ID</th>
                <th className="py-2 px-4 text-left">Account Balance</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account.id} className="border-b border-gray-700">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{account.username}</td>
                  <td className="py-2 px-4">{account.level}</td>
                  <td className="py-2 px-4">{account.rankTypeId.name}</td>
                  <td className="py-2 px-4">{account.accountBalance}</td>
                  <td className="py-2 px-4">{account.email}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    {/* <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleView(account.id)}
                    >
                    <img src="/image/icons/pencil.png" alt="Edit" className="w-6 h-6" />
                    </button> */}
                    {/* <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(account.id)}
                    >
                          <img src="/image/icons/delete.png" alt="Delete" className="w-6 h-6" />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountAdminComponent;
