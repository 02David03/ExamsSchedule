import api from "../axios";

const getAllCampaigns = async () => {
  try {
    const res = await api.get("campanhas");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export {getAllCampaigns};