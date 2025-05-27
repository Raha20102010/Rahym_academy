const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI with API key from environment variable or use a default configuration
let openai;
try {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
} catch (error) {
    console.warn('Warning: OpenAI API key not configured. Chat will use fallback responses.');
}

// Predefined responses for fallback mode
const fallbackResponses = {
    'price': 'Biziň kurslarymyzyň bahasy aýda $300. Bu bahanyň içine ähli sapaklar we materiallar girýär.',
    'course': 'Biz dürli derejede iňlis dili kurslaryny hödürleýäris: Başlangyç (A1-A2), Orta (B1-B2) we Ýokary (C1-C2) derejeleri.',
    'teacher': 'Biziň mugallymlarymyz tejribeli we hünärmen. Olar iňlis dilini öwretmekde ýörite sertifikatlara eýe.',
    'online': 'Hawa, biz online sapaklary hödürleýäris. Sapaklar Zoom ýa-da Google Meet arkaly geçirilýär.',
    'schedule': 'Sapak wagtlaryny siziň amatlylygňyza görä düzüp bileris. Adatça sapaklar hepdede 3 gezek geçirilýär.',
    'duration': 'Her sapak 1 sagat 30 minut dowam edýär.',
    'material': 'Ähli okuw materiallary mugt berilýär. Biz häzirki zaman okuw kitaplaryny we online resurslary ulanýarys.',
    'certificate': 'Kursy üstünlikli tamamlan soň, size sertifikat berilýär.',
    'payment': 'Töleg her aýyň başynda edilýär. Biz nagt we bank geçirmeleri kabul edýäris.',
    'trial': 'Hawa, biz mugt synag sapadyny hödürleýäris. Şol sapakda siziň derejeňizi kesgitläp, size gabat gelýän topary saýlarys.',
    'contact': 'Biz bilen WhatsApp (+60104210238) ýa-da Telegram (@rahim_5500) arkaly habarlaşyp bilersiňiz.',
    'location': 'Häzirki wagtda diňe online sapaklar geçirilýär.',
    'registration': 'Ýazylmak üçin, WhatsApp ýa-da Telegram arkaly habarlaşyp bilersiňiz.',
    'level': 'Siziň derejeňizi kesgitlemek üçin, biz mugt test geçirýäris.',
    'group': 'Toparlar 4-6 adamdan ybarat. Bu her okuwça ýeterlik üns bermäge mümkinçilik berýär.'
};

function getFallbackResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
        if (lowercaseMessage.includes(keyword)) {
            return response;
        }
    }
    return 'Bagyşlaň, men size başga maglumat berip bilerin. Sapaklar, bahalar ýa-da beýleki soraglar barada sorap bilersiňiz.';
}

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // If OpenAI is not configured, use fallback responses
        if (!openai) {
            const fallbackResponse = getFallbackResponse(message);
            return res.json({ response: fallbackResponse });
        }

        // Try to use OpenAI API
        try {
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
            console.error('OpenAI API Error:', error);
            // Fallback to predefined responses if API fails
            const fallbackResponse = getFallbackResponse(message);
            res.json({ response: fallbackResponse });
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!openai) {
        console.log('Running in fallback mode (no OpenAI API key configured)');
    } else {
        console.log('Running with OpenAI API integration');
    }
}); 