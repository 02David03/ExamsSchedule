import api from "../axios";

const getAllScheduleDisponible = async () => {
  try {
    const res = await api.get("agendamento-disponibilidade");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getAllScheduleFiltered = async (date) => {
  try {
    const res = await api.get(`agendamento-disponibilidade?data=${date}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export {getAllScheduleDisponible, getAllScheduleFiltered };