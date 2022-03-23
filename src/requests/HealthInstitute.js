import api from "../axios";

const getAllHealthInstitutes = async () => {
  try {
    const res = await api.get("estabelecimentos-saude");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getHealthInstitutesByCity = async (cityCode) => {
  try {
    const res = await api.get(`estabelecimentos-saude?cod_munic=${cityCode}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getHealthInstitutesByInstitute = async (instituteCode) => {
  try {
    const res = await api.get(`estabelecimentos-saude?cod_cnes=${instituteCode}`);
    return res.data;
  } catch (error) {
    console.log(error);
  } 
}

export {getAllHealthInstitutes, getHealthInstitutesByCity, getHealthInstitutesByInstitute};