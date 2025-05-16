// controllers/employeeController.js
import employeeModel from "../models/employee.js";

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

  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      password, // ⚠️ ¡Recomendado hashear aquí también!
      telephone,
      dui,
      address,
      workstation,
      hireDate,
      salary,
    },
    { new: true }
  );

  res.json({ message: "Empleado actualizado" });
};

export default employeeController;
