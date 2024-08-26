import React, { useState, useEffect } from "react";
import {
  useAccount,
  getAvatar,
  uploadAvatar,
  recharge,
  updateAccount,
  findAccountById,
  findUserById,
  handleGetAvatar,
} from "../../services/profile/AccountSetting.service";
import { getAccountbyUsername } from "../../services/profile/AccountSetting.service";

const AccountSetting = () => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sdt, setSdt] = useState("");
  const [address, setAddress] = useState("");
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
      const userData = { firstname: firstName, lastname: lastName, sdt: sdt };
      await updateAccount(userData, token);
      setUser({ ...user, ...userData });
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  };

  const handleRecharge = async (amount) => {
    const token = localStorage.getItem("accesstoken");
    const userName = localStorage.getItem("username"); // Thay thế bằng tên người dùng thực tế

    try {
      if (token) {
        // Lấy thông tin tài khoản dựa trên username
        const account = await getAccountbyUsername(token, userName);

        if (account && account.id) {
          const accountId = account.id;

          // Gọi hàm recharge với accountId và amount
          await recharge(amount, accountId);
        } else {
          console.error("Account information is not available");
          alert("Failed to retrieve account information.");
        }
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
  const handleSdt = (e) => setSdt(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="account-detail bg-[#FFFFFF] text-black p-4">
      <h6 className="text-2xl py-3 px-2">Account Settings</h6>
      <p className="text-sm text-gray-600 px-2">Manage Your Account Details</p>
      <p className="font-semibold pt-4 px-2">Account Information</p>
      <span className="font-bold px-2 py-3 text-sm mt-4">ID: </span>
      <span className="text-sm py-3">{token.slice(0, 50)}</span>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="bg-[#F0F0F0] p-2 mt-2">
            <span className="text-[12px] text-[#A0A0A0]">Username</span> <br />
            <p className="text-[18px]">{account.username}</p>
          </div>
          <div className="bg-[#F0F0F0] p-2 mt-2">
            <span className="text-[12px] text-[#A0A0A0]">Balance</span> <br />
            <p className=" flex items-center justify-between">
              {new Intl.NumberFormat("de-DE").format(account.accountBalance)}đ
              <a href="#" onClick={ButtonOpenModal}>
                <img
                  src="/image/icons/plus.png"
                  alt=""
                  className="w-6 inline-block negative ml-2"
                />
              </a>
              <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
                  showModal ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center justify-center min-h-screen">
                  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h5 className="text-lg font-medium">Recharge</h5>
                      <button
                        type="button"
                        aria-label="Close"
                        onClick={handleCloseModal}
                        className="text-gray-500"
                      >
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
                        <strong>Notes:</strong> Very understanding because you
                        can only top up in packages with a fixed price. Sorry
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
        </div>
        <div>
          <div className="bg-[#F0F0F0] p-2 mt-2">
            <span className="text-[12px] text-[#A0A0A0]">Email</span> <br />
            <p className="text-[18px]">{account.email}</p>
          </div>
        </div>
        <div className="w-[890px]">
          <p className="font-semibold pt-4 px-2">Personal Detail</p>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="border rounded p-2 mt-2 w-full">
              <span className="text-[12px] text-[#A0A0A0]">FirstName</span>{" "}
              <br />
              <p className="text-[14px]">
                {user.firstname || "Update your info"}
              </p>
            </div>
            <div className="border rounded p-2 mt-2 w-full">
              <span className="text-[12px] text-[#A0A0A0]">LastName</span>{" "}
              <br />
              <p className="text-[14px]">
                {user.lastname || "Update your info"}
              </p>
            </div>
            <div className="border rounded p-2 mt-2 w-full">
              <span className="text-[12px] text-[#A0A0A0]">Phone Number</span>{" "}
              <br />
              <p className="text-[14px] mt-2">
                {user.sdt || "Update your info"}
              </p>
            </div>
            <div className="border rounded p-2 mt-2 w-full">
              <span className="text-[12px] text-[#A0A0A0]">Address</span> <br />
              <p className="text-[14px]">
                {user.address || "Update your info"}
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <p className="font-semibold pt-4 px-2">Your Avatar</p>
      <div className="flex justify-start mt-4 gap-0">
        <div>
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
        <div className="w-1/4 ml-4">
          <input
            type="file"
            accept="image/*"
            className="px-2 py-1 rounded-md text-sm"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white py-1 px-2 ml-2 rounded-md mt-2 text-sm"
          >
            Upload Avatar
          </button>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <p className="font-semibold py-4 px-2">Update your info</p>
      <form onSubmit={handleUpdateAccount} className="">
        <div className="negative">
          <label
            htmlFor="firstname"
            className="block text-[#A0A0A0] pt-4 absolute text-sm px-2 pb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="border border-gray-300 my-2 px-2 py-6 rounded-md w-2/3"
            placeholder={`${user.firstname}`}
            value={firstName}
            onChange={handleFirstName}
          />
        </div>
        <div className="negative">
          <label
            htmlFor="lastname"
            className="block text-[#A0A0A0] absolute pt-4  text-sm px-2 pb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="border border-gray-300 my-2 px-2 py-6 rounded-md w-2/3"
            placeholder={`${user.lastname}`}
            value={lastName}
            onChange={handleLastName}
          />
        </div>

        <div className="negative">
          <label
            htmlFor="sdt"
            className="block text-[#A0A0A0] absolute  pt-4 text-sm px-2 pb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="sdt"
            name="sdt"
            className="border border-gray-300 my-2 px-2 py-6 rounded-md w-2/3"
            placeholder={`${user.sdt}`}
            value={sdt}
            onChange={handleSdt}
          />
        </div>
        <div className="negative">
          <label
            htmlFor="address"
            className="block text-[#A0A0A0] absolute text-sm pt-4 px-2 pb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="border border-gray-300 my-2 px-2 py-6 rounded-md w-2/3"
            placeholder={`${user.address}`}
            value={address}
            onChange={handleAddress}
          />
        </div>
        <div className="col-span-2">
          <button
            className="bg-blue-500 text-white px-5 py-5 rounded-md"
            onClick={handleUpdateAccount}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;
