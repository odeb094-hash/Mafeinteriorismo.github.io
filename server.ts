import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, zone } = req.body;

    console.log(`Received contact form from ${name} (${email}) for zone: ${zone}`);
    console.log(`Message: ${message}`);

    // Configuration for nodemailer
    // In a real scenario, you'd use process.env.SMTP_HOST, etc.
    const transporter = nodemailer.createTransport({
      // Placeholder: You can use a real service like SendGrid, Mailgun, or Gmail
      // Check nodemailer docs for more options
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || "user@example.com",
        pass: process.env.SMTP_PASS || "password",
      },
    });

    const mailOptions = {
      from: `"MAFE Interiorismo Web" <${process.env.SMTP_USER || "no-reply@example.com"}>`,
      to: "mfgroz.interiores@gmail.com",
      subject: `Nuevo Leads: ${name} - Guía Estratégica Airbnb`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Zona enfocada: ${zone || 'No especificada'}
        Mensaje: ${message}
      `,
      html: `
        <h3>Nuevo Leads: Guía Estratégica Airbnb</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Zona enfocada:</strong> ${zone || 'No especificada'}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    };

    try {
      // In this environment, we might not have a real SMTP server configured.
      // We log success for the demo flow, but in production this would send the mail.
      if (process.env.SMTP_HOST) {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } else {
        console.log("SMTP not configured. Email content logged above.");
      }
      
      res.status(200).json({ success: true, message: "Información recibida correctamente." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Hubo un error al procesar su solicitud." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
