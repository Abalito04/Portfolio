const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, subject, message, language } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }

        // Email templates based on language
        const emailTemplates = {
            es: {
                subject: `Nuevo mensaje de contacto: ${subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #10b981;">Nuevo mensaje de contacto</h2>
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Nombre:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Asunto:</strong> ${subject}</p>
                        </div>
                        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <h3 style="color: #1f2937;">Mensaje:</h3>
                            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        <div style="margin-top: 20px; padding: 15px; background-color: #10b981; color: white; border-radius: 8px; text-align: center;">
                            <p style="margin: 0;">Mensaje enviado desde tu portfolio web</p>
                        </div>
                    </div>
                `
            },
            en: {
                subject: `New contact message: ${subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #10b981;">New contact message</h2>
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Subject:</strong> ${subject}</p>
                        </div>
                        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <h3 style="color: #1f2937;">Message:</h3>
                            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        <div style="margin-top: 20px; padding: 15px; background-color: #10b981; color: white; border-radius: 8px; text-align: center;">
                            <p style="margin: 0;">Message sent from your web portfolio</p>
                        </div>
                    </div>
                `
            }
        };

        const template = emailTemplates[language] || emailTemplates.es;

        // Email to you (the portfolio owner)
        const msgToYou = {
            to: process.env.YOUR_EMAIL, // Your email address
            from: process.env.SENDGRID_FROM_EMAIL, // Verified sender in SendGrid
            subject: template.subject,
            html: template.html,
        };

        // Auto-reply to the sender
        const autoReplyTemplate = {
            es: {
                subject: 'Gracias por contactarme - Matias Abalo',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #10b981;">¡Hola ${name}!</h2>
                        <p>Gracias por contactarme a través de mi portfolio. He recibido tu mensaje y me pondré en contacto contigo pronto.</p>
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #1f2937;">Resumen de tu mensaje:</h3>
                            <p><strong>Asunto:</strong> ${subject}</p>
                            <p><strong>Mensaje:</strong> ${message}</p>
                        </div>
                        <p>Mientras tanto, puedes revisar mis proyectos en <a href="https://tu-portfolio.com" style="color: #10b981;">mi portfolio</a>.</p>
                        <p>¡Saludos!</p>
                        <p><strong>Matias Abalo</strong><br>Desarrollador en Python y Web</p>
                    </div>
                `
            },
            en: {
                subject: 'Thank you for contacting me - Matias Abalo',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #10b981;">Hello ${name}!</h2>
                        <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you soon.</p>
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #1f2937;">Summary of your message:</h3>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <p><strong>Message:</strong> ${message}</p>
                        </div>
                        <p>In the meantime, you can check out my projects on <a href="https://your-portfolio.com" style="color: #10b981;">my portfolio</a>.</p>
                        <p>Best regards!</p>
                        <p><strong>Matias Abalo</strong><br>Python & Web Developer</p>
                    </div>
                `
            }
        };

        const autoReply = autoReplyTemplate[language] || autoReplyTemplate.es;

        const msgToSender = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: autoReply.subject,
            html: autoReply.html,
        };

        // Send both emails
        await sgMail.send([msgToYou, msgToSender]);

        res.json({ 
            success: true, 
            message: 'Email sent successfully' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            error: 'Failed to send email',
            details: error.message 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
