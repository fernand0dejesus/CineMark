import customersModel from "../models/customers.js";

const customersController = {};

// SELECT (Obtener todos los clientes)
customersController.getcustomers = async (req, res) => {
  const customers = await customersModel.find();
  res.json(customers);
};

// INSERT (Crear un nuevo cliente)
customersController.createcustomers = async (req, res) => {
  const { name, email, password, telephone, dui, addres } = req.body;
  const newCustomer = new customersModel({ name, email, password, telephone, dui, addres });
  await newCustomer.save();
  res.json({ message: "Cliente guardado" });
};

// DELETE (Eliminar cliente por ID)
customersController.deletecustomers = async (req, res) => {
  const deletedCustomer = await customersModel.findByIdAndDelete(req.params.id);
  if (!deletedCustomer) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  res.json({ message: "Cliente eliminado" });
};

// UPDATE (Actualizar un cliente)
customersController.updatecustomers = async (req, res) => {
  const { name, email, password, telephone, dui, addres } = req.body;
  await customersModel.findByIdAndUpdate(
    req.params.id,
    { name,
     email, 
     password, 
     telephone, 
     dui, 
     addres },
    { new: true }
  );
  res.json({ message: "Cliente actualizado" });
};

export default customersController;
