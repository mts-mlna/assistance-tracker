const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // puedes usar Outlook, Yahoo o SMTP propio
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function enviarCorreoVerificacion(correo, token) {
    const enlace = `http://localhost:3000/api/verificar/${token}`;
    const enlaceProfesor = `http://localhost:3000/api/confirmar-rol?token=${token}&rol=Profesor`;
    const enlacePreceptor = `http://localhost:3000/api/confirmar-rol?token=${token}&rol=Preceptor`; 
    

    await transporter.sendMail({
        from: `"Class Manager" <${process.env.EMAIL}>`,
        to: correo,
        subject: "Último paso: Verifica tu cuenta ahora",
        html: `
            <div style="background-color: #FFE0E0; border: 2px solid #111; padding: 50px; font-family: sans-serif;">
                <h1 style="text-align: center;">Confirma tu cuenta</h1>
                <p style="font-size: 18px; text-align: center;">Tu cuenta está casi lista. Elegí cómo querés registrarte:</p>
                <div style="display: flex; justify-content: center; gap: 30px; margin-top: 40px;">
                <a href="${enlaceProfesor}" style="background: #4CAF50; padding: 15px 25px; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirmar como Profesor</a>
                <a href="${enlacePreceptor}" style="background: #2196F3; padding: 15px 25px; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirmar como Preceptor</a>
                </div>
                <p style="text-align: center; margin-top: 40px;">Si no creaste esta cuenta, ignorá este correo.</p>
            </div>
        `

    });
}

module.exports = { enviarCorreoVerificacion };
