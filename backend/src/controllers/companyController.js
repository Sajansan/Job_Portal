import {
  createCompany,
  getCompanyByUserId,
} from "../services/companyService.js";

export const createCompanyProfile = async (req, res) => {
  try {
    await createCompany(req.user.id, req.body);
    res.status(201).json({ message: "Company profile created" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create company profile" });
  }
};

export const getMyCompany = async (req, res) => {
  try {
    const company = await getCompanyByUserId(req.user.id);
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch company profile" });
  }
};
