const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant for Rahym Academy, an English language school. 
                    Always respond in Turkmen language. Be friendly and professional.
                    Key information:
                    - Course price: $300/month
                    - Class schedule: 3 times per week
                    - Class duration: 1.5 hours
                    - Available levels: Beginner (A1-A2), Intermediate (B1-B2), Advanced (C1-C2)
                    - Online classes via Zoom/Google Meet
                    - Contact: WhatsApp (+60104210238) or Telegram (@rahim_5500)
                    - Free trial lesson available
                    - Small groups (4-6 students)
                    - Professional teachers with certificates`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 200
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 