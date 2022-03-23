import api from "../axios";

const getAllSchedules = async () => {
  try {
    const res = await api.get("agendamentos");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllActiveSchedules = async () => {
  try {
    const res = await api.get(`agendamentos?status=AGENDADO`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllActiveSchedulesByInsitute = async (institutesCode) => {
  let institutesString = "";
  for (let index in institutesCode) {
    if (index === institutesCode.length - 1) {
      institutesString += `estabelecimento_cnes=${institutesCode[index]}`;
    } else {
      institutesString += `estabelecimento_cnes=${institutesCode[index]}&`;
    }
  }
  console.log(institutesString);
  try {
    const res = await api.get(`agendamentos?status=AGENDADO&${institutesString}`);
    return res.data;
  } catch (error) {
    console.lof(error);
  }
};

const getAllSchedulesByUserId = async () => {
  try {
    const res = await api.get(
      `agendamentos?_sort=data&_order=asc&usuario_id=${localStorage.getItem(
        "userId"
      )}`
    );
    return res.data;
  } catch (error) {
    console.lof(error);
  }
};

const getAllSchedulesByInstitute = async (instituteCode) => {
  try {
    const res = await api.get(
      `agendamentos?usuario_id=${localStorage.getItem(
        "userId"
      )}&estabelecimento_cnes=${instituteCode}`
    );
    return res.data;
  } catch (error) {
    console.lof(error);
  }
};

const setSchedule = async (schedule) => {
  try {
    const res = await api.post("agendamentos", schedule);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const cancelSchedule = async (scheduleAtt) => {
  try {
    const res = await api.put(`agendamentos/${scheduleAtt.id}`, {
      ...scheduleAtt,
      status: "CANCELADO",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllSchedules,
  getAllActiveSchedules,
  getAllActiveSchedulesByInsitute,
  setSchedule,
  cancelSchedule,
  getAllSchedulesByUserId,
  getAllSchedulesByInstitute,
};
