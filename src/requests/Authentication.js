import api from "../axios";

const logIn = async (user, errorCase) => {
  try {
    const res = await api.post("login", user);
    localStorage.setItem("access_token", res.data.accessToken);
    localStorage.setItem("userName", res.data.user.nome);
    localStorage.setItem("userId", res.data.user.id)
    return res.data;
  } catch (error) {
    errorCase();
    console.log(error);
  }
};

const registerUser = async (user, errorCase) => {
  try {
    const res = await api.post("/users", user);
    localStorage.setItem("access_token", res.data.accessToken);
    localStorage.setItem("userName", res.data.user.nome);
    localStorage.setItem("userId", res.data.user.id)
    return res.data;
  } catch (error) {
    switch (error.response.data) {
      case "Password is too short":
        errorCase.setShowShortPassword();
        break;
      case "Email already exists":
        errorCase.setShowUsingEmail();
        break;
      default:
        errorCase.setShowServerError();
    }
  }
};

const isAuthenticated = () => localStorage.getItem("access_token") !== null;


export { logIn, registerUser, isAuthenticated };
