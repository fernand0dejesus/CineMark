import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import clientsModel from "../models/customers.js";
import { config } from "../config.js";

const registerClientController = {};

registerClientController.registerClient = async (req, res) => {
  const { name, email, password, telephone, dui, addres } = req.body;

  try {
    const existClient = await clientsModel.findOne({ email });
    if (existClient) {
      return res.status(409).json({ message: "Client already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new clientsModel({
      name,
      email,
      password: passwordHash,
      telephone,
      dui: dui || null,
      addres
    });

    await newClient.save();

    const verficationCode = crypto.randomBytes(3).toString("hex");
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000;

    const tokenCode = jsonwebtoken.sign(
      { email, verficationCode, expiresAt },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    res.cookie("verificationToken", tokenCode, {
      maxAge: 2 * 60 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    const mailOptions = {
      from: config.email.user,
      to: email,
      subject: "Verificación de correo",
      text: `Tu código de verificación es: ${verficationCode}\nEste código expira en 2 horas.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar correo:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.json({ message: "Client registered, please verify your email" });
    });

  } catch (error) {
    console.error("Error en el registro del cliente:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

registerClientController.verifyCodeEmail = async (req, res) => {
  const { verficationCode } = req.body;
  const token = req.cookies.verificationToken;

  if (!token) {
    return res.status(400).json({ message: "Please register your account first" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verficationCode: storedCode } = decoded;

    if (verficationCode !== storedCode) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    const client = await clientsModel.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.isVerified = true; // Este campo debería añadirse al modelo si se usa
    await client.save();

    res.clearCookie("verificationToken");
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verificando código:", error);
    res.status(500).json({ message: "Token verification failed" });
  }
};

export default registerClientController;
