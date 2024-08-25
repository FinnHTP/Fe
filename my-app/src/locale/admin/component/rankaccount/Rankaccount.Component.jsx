import React, { useEffect, useState } from "react";
import {
  loadRankAccounts,
  createRankAccount,
  updateRankAccount,
  deleteRankAccount,
  viewRankAccount,
} from "../../service/RankAccount.service";
import NavbarAdminComponent from "../NavbarAdmin.Component";

function RankAccountComponent() {
  const [showForm, setShowForm] = useState(false);
  const [rankAccounts, setRankAccounts] = useState([]);
  const [rankAccount, setRankAccount] = useState({
    id: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    fetchRankAccounts();
  }, []);

  const fetchRankAccounts = async () => {
    const data = await loadRankAccounts();
    setRankAccounts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rankAccount.id) {
      await updateRankAccount(rankAccount.id, rankAccount);
    } else {
      await createRankAccount(rankAccount);
    }
    fetchRankAccounts();
    handleResetForm();
  };

  const handleDelete = async (id) => {
    await deleteRankAccount(id);
    fetchRankAccounts();
  };

  const handleView = async (id) => {
    const data = await viewRankAccount(id);
    setRankAccount(data);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setRankAccount({ ...rankAccount, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setRankAccount({
      id: "",
      name: "",
      price: "",
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
          <h2 className="text-white mb-4">Rank Account</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add Rank Account"}
          </button>

          {showForm && (
            <form className="bg-gray-800 p-4 rounded-md mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={rankAccount.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Price</label>
                <input
                  type="text"
                  name="price"
                  value={rankAccount.price}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {rankAccount.id ? "Update" : "Add"}
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
            <thead className="bg-customBgBrowse">
              <tr>
                <th className="">No</th>
                <th className="">Name</th>
                <th className="">Price</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {rankAccounts.map((rankAccount, index) => (
                <tr key={rankAccount.id}>
                  <td className="p-2 border-r">{index + 1}</td>
                  <td className="p-2 border-r">{rankAccount.name}</td>
                  <td className="p-2 border-r">{rankAccount.price}</td>
                  <td className="p-2 flex">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleView(rankAccount.id)}
                    >
                       <img src="/image/icons/pencil.png" alt="Edit" className="w-6 h-6" />
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 ml-1 rounded-md"
                      onClick={() => handleDelete(rankAccount.id)}
                    >
                     <img src="/image/icons/delete.png" alt="Delete" className="w-6 h-6" />
                    </button>
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

export default RankAccountComponent;
