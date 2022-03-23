import api from "../axios";

const getAllAttendancyGroup = async () => {
  try {
    const res = await api.get("grupos-atendimentos");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export {getAllAttendancyGroup};