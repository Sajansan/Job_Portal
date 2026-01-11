import api from "./axios";

export const getUserProfile = () => {
    return api.get("/users/me");
};
