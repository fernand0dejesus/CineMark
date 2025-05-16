// controllers/registerEmployeeController.js
import employeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  const {
    name,
    email,
    address,
    password,
    hireDate,
    telephone,
    dui,
    workstation,
    salary
  } = req.body;

  try {
    const existEmployee = await employeeModel.findOne({ email });
    if (existEmployee) {
      return res.status(409).json({ message: "Employee already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newEmployee = new employeeModel({
      name,
      email,
      address,
      password: passwordHash,
      hireDate,
      telephone,
      dui,
      workstation,
      salary
    });

    await newEmployee.save();

    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.error("Token generation error:", error);
          return res.status(500).json({ message: "Token generation failed" });
        }
        res.cookie("authToken", token);
        res.json({ message: "Employee saved" });
      }
    );

  } catch (error) {
    console.error("Error saving employee:", error);
    res.status(500).json({ message: "Error saving employee" });
  }
};

export default registerEmployeeController;
