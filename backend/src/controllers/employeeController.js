import employeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs"; // Asegurándonos de tener bcryptjs para encriptación

const employeeController = {};

// SELECT (Obtener todos los empleados)
employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

// DELETE (Eliminar empleado)
employeeController.deleteemployee = async (req, res) => {
  const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedEmployee) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  res.json({ message: "Empleado eliminado" });
};

// UPDATE (Actualizar empleado)
employeeController.updateemployee = async (req, res) => {
  const {
    name,
    email,
    password,
    telephone,
    dui,
    address,
    workstation,
    hireDate,
    salary,
  } = req.body;

  // Si se envía una nueva contraseña, la encriptamos
  const updatedData = {
    name,
    email,
    telephone,
    dui,
    address,
    workstation,
    hireDate,
    salary,
  };

  if (password) {
    updatedData.password = await bcryptjs.hash(password, 10); // Hasheamos la contraseña si se recibe
  }

  await employeeModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });

  res.json({ message: "Empleado actualizado" });
};

export default employeeController;
