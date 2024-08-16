import axios from "axios";
import {jwtDecode}   from "jwt-decode";




export const getAccountbyUsername = async (token, userName) => {
  try {

      const response = await axios.get(
          `http://localhost:8080/api/account/username/${userName}`,
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
} 



export const findUserById = async (token) => {
  try {
    const decoded = jwtDecode(token);
    const accountId = decoded.id;
    const response = await axios.get(`http://localhost:8080/api/user/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};


export const uploadAvatar = async (accountId, file, token) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.post(
      `http://localhost:8080/api/user/${accountId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to upload avatar:", error);
    throw error;
  }
};


export const getAvatar = async (accountId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/${accountId}/avatar`, {
      responseType: "arraybuffer",
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to get avatar:", error);
    throw error;
  }
};


export const recharge = async (amount,token) => {
  try {
    const decoded = jwtDecode(token);
    const accountId = decoded.id;
    const paymentValues = {
      amount: amount,
      accountId: accountId,
    };
   
    const queryString = new URLSearchParams(paymentValues).toString();
    const response = await axios.post(`http://localhost:8080/api/payment/create?${queryString}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const responseUrl = response.data.data;
      window.location.href = responseUrl;
      console.log(responseUrl);
      const resultPayment = await axios.post(
        `http://localhost:8080/api/payment/save-payment?${queryString}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    return response.data.data;
  } catch (error) {
    console.error("Error recharging account:", error);
    throw error;
  }
};

// export const recharge = async (amount,token) => {
//   try {
//     const token = localStorage.getItem("accesstoken")
//     const decoded = jwtDecode(token);
//     const accountId = decoded.id;
//     console.log("Token:", token); 
   
//     const paymentValues = {
//       amount: amount,
//       accountId: accountId,
//     };
//     const queryString = new URLSearchParams(paymentValues).toString();
//     const response = await axios.post(`http://localhost:8080/api/payment/create?${queryString}`, {}, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error recharging account:", error);
//     throw error;
//   }
// };



export const updateAccount = async (userData, token) => {
  try {
    const decoded = jwtDecode(token);
    const accountId = decoded.id;
    const response = await axios.put(`http://localhost:8080/api/user/${accountId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};




export const findAccountById = async (token) => {
  try {
    const decoded = jwtDecode(token);
    const accountId = decoded.id;
    const response = await axios.get(`http://localhost:8080/api/account/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error finding account:", error);
    throw error;
  }
};
