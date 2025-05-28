const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const OpenAI = require('openai');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const app = express();
const openai = new OpenAI();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Admin password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-admin-password';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Configure multer for video uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create uploads directory if it doesn't exist
        const dir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only video files
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only video files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    }
});

// Add error handling middleware for multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File is too large. Maximum size is 100MB'
            });
        }
    }
    next(err);
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Admin login endpoint
app.post('/api/admin-login', (req, res) => {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Handle video uploads and email sending (protected route)
app.post('/api/upload-video', authenticateToken, upload.single('video'), async (req, res) => {
    try {
        const { title, description, email } = req.body;
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No video file uploaded'
            });
        }

        const videoPath = req.file.path;
        const videoUrl = `/uploads/${path.basename(videoPath)}`;

        // Store video metadata in a JSON file
        const videosFile = path.join(__dirname, 'data', 'videos.json');
        const videos = fs.existsSync(videosFile) 
            ? JSON.parse(fs.readFileSync(videosFile))
            : [];

        const videoData = {
            id: Date.now().toString(),
            title,
            description,
            url: videoUrl,
            timestamp: new Date().toISOString(),
            filename: req.file.originalname
        };

        videos.unshift(videoData);
        
        // Ensure data directory exists
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Save video metadata
        fs.writeFileSync(videosFile, JSON.stringify(videos, null, 2));

        // Send email with video details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `New Video Upload: ${title}`,
            text: `A new video has been uploaded:\n\nTitle: ${title}\nDescription: ${description}\n\nYou can view the video at: ${req.protocol}://${req.get('host')}${videoUrl}`,
            attachments: [
                {
                    filename: req.file.originalname,
                    path: videoPath
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        res.json({ 
            success: true, 
            message: 'Video uploaded and email sent successfully',
            video: videoData
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to process video upload',
            error: error.message
        });
    }
});

// Add endpoint to get videos
app.get('/api/videos', async (req, res) => {
    try {
        const videosFile = path.join(__dirname, 'data', 'videos.json');
        const videos = fs.existsSync(videosFile)
            ? JSON.parse(fs.readFileSync(videosFile))
            : [];
        res.json(videos);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch videos',
            error: error.message
        });
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