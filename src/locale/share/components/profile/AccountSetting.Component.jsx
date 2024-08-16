
import React, { useState, useEffect } from "react";
 import { useAccount, getAvatar, uploadAvatar, recharge, updateAccount, findAccountById, findUserById, handleGetAvatar} from "../../services/profile/AccountSetting.service"
import {getAccountbyUsername}  from "../../services/profile/AccountSetting.service"

const AccountSetting = () => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [account, setAccount] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  
  const token = localStorage.getItem("accesstoken");
  useEffect(() => {
  
    if (token) {
      loadUserData();
    }
  }, [token]);


  
  const loadUserData = async () => {
      
    const userData = await findUserById(token);
    setUser(userData);
    // setFirstName(userData.firstname || "");
    // setLastName(userData.lastname || "");
    const accountData = await findAccountById(token);
    setAccount(accountData);
    const avatarUrl = await getAvatar(accountData.id);
    setAvatarUrl(avatarUrl);

};


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile && token) {
        await uploadAvatar(user.id, selectedFile, token);
        const avatarUrl = await getAvatar(user.id);
        setAvatarUrl(avatarUrl);
      }
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    }
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const userData = { avatar, firstName, lastName, sdt: user.sdt };
      await updateAccount(userData, token);
      setUser({ ...user, ...userData });
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  };

  const handleRecharge = async (amount) => {
    try {
      if (token) {
        const responseUrl = await recharge(amount, token);
        window.location.href = responseUrl;
      }
    } catch (error) {
      console.error("Failed to recharge:", error);
    }
  };

  const ButtonOpenModal = () => {
    setShowModal(true);
  };

  
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="account-detail text-black">
      <h6 className="text-lg font-bold">Account Settings</h6>
      <p className="text-sm text-gray-600 mt-0">
        Manage Your Account Details
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="font-bold">Username:</span> <br />
          <p>{account.username}</p>
          <span className="font-bold">Balance:</span>
          <p>
            {new Intl.NumberFormat("de-DE").format(account.accountBalance)} đ
            <a href="#" onClick={ButtonOpenModal}>
              <strong className="ml-1 text-xs border border-gray-300 px-1 py-0.5 rounded-lg">
                Recharge
              </strong>
            </a>

            <div
  className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${showModal ? "block" : "hidden"}`}
>
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h5 className="text-lg font-medium">Recharge</h5>
        <button type="button" aria-label="Close" onClick={handleCloseModal} className="text-gray-500">
          &times;
        </button>
      </div>
      <div className="p-4">
        <div>
          <h6 className="font-semibold">Credit Boosters</h6>
        </div>
        <div className="mt-3">
          <button
            className="bg-yellow-500 hover:bg-yellow-800 text-white text-lg font-bold py-2 px-4 rounded w-32 mr-4 mb-4"
            onClick={() => handleRecharge(75000)}
          >
            75.000 đ
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold py-2 px-4 rounded w-32 mr-4 mb-4"
            onClick={() => handleRecharge(150000)}
          >
            150.000 đ
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold py-2 px-4 rounded w-32 mr-4 mb-4"
            onClick={() => handleRecharge(225000)}
          >
            225.000 đ
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold py-2 px-4 rounded w-32 mr-4 mb-4"
            onClick={() => handleRecharge(300000)}
          >
            300.000 đ
          </button>
        </div>
        <p className="text-sm text-red-500 mt-2">
          <strong>Notes:</strong> Very understanding because you can only top up in packages with a fixed price. Sorry
          for the inconvenience
        </p>
      </div>
      <div className="flex justify-end p-4 border-t">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

       
            
          </p>
        </div>
        <div>
          <span className="font-bold">Email:</span> <br />
          <p>{account.email}</p>
          <span className="font-bold">Accumulated:</span>
          <p>0</p>
        </div>
        <div>
          <span className="font-bold">FirstName:</span> <br />
          <p>{user.firstname || "Update your info"}</p>
          <span className="font-bold">RankType:</span>
          <p>{account.rankType || "Bronze"}</p>
        </div>
        <div>
          <span className="font-bold">LastName:</span> <br />
          <p>{user.lastname || "Update your info"}</p>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <img
              src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"}
              alt="User Avatar"
              className="w-20 h-20 rounded-full"
            />
          )}
        </div>
        <div className="w-1/2">
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 px-2 py-1 rounded-md"
            onChange={handleFileChange}
          /> 
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Upload Avatar
          </button>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
       <form onSubmit={handleUpdateAccount} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstname" className="block text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="border border-gray-300 px-2 py-1 rounded-md w-full"
            value={firstName}
            onChange={handleFirstName}
          />
        </div>
        <div>
          <label htmlFor="lastname" className="block text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="border border-gray-300 px-2 py-1 rounded-md w-full"
            value={lastName}
            onChange={handleLastName}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;
