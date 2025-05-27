const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const openai = new OpenAI();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Configure multer for video uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Handle video uploads and email sending
app.post('/api/upload-video', upload.single('video'), async (req, res) => {
    try {
        const { title, description, email } = req.body;
        const videoPath = req.file.path;

        // Send email with video details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `New Video Upload: ${title}`,
            text: `A new video has been uploaded:\n\nTitle: ${title}\nDescription: ${description}\n\nThe video file is attached.`,
            attachments: [
                {
                    filename: req.file.originalname,
                    path: videoPath
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Video uploaded and email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to process video upload' });
    }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant for Rahym Academy." },
                { role: "user", content: message }
            ],
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to get response',
            fallbackResponse: 'Bagyşlaň, häzirki wagtda jogap berip bilemok. Soňrak synanyşyň.'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Configured' : 'Missing');
}); 