import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post('/api/review', async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'Code content is required' });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert code reviewer. Analyze the provided code for bugs, efficiency, readability, and security vulnerabilities. Provide actionable feedback and an optimized version of the code.'
                },
                {
                    role: 'user',
                    content: `Language: ${language || 'Auto-detect'}\n\nCode:\n${code}`
                }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.2,
            max_tokens: 2048,
        });

        const review = completion.choices[0]?.message?.content || 'No feedback generated.';
        res.json({ review });

    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ 
            error: 'Failed to generate review', 
            details: error.message 
        });
    }
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
