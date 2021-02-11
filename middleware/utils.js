import axios from "axios";

export const logout = async () => {
  axios
    .post("/api/auth/logout")
    .then((res) => {
      router.push("/admin/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
