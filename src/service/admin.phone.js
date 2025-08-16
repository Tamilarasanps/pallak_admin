// service/admin.api.js
import axios from "axios";

export const updateAdminMobile = async (mobileNumber) => {
  try {
    const response = await axios.put("http://localhost:5000/api/admin/mobile", {
      mobile: mobileNumber,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Failed to update admin mobile:", error);
    throw error;
  }
};
