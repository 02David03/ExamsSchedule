import api from "../axios";

const getAllExamsType = async () => {
  try {
    const res = await api.get("tipos_exame");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getExamTypeById = async (id) => {
  try {
    const res = await api.get(`tipos_exame?id=${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export {getAllExamsType, getExamTypeById};
