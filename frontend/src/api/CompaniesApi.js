import api from "./axios";

export const getMyCompany = () => {
    return api.get("/companies/my");
};
