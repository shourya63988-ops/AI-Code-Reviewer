import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "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"
});

// Root wake-up endpoint
app.get('/', (req, res) => {
    res.send('Backend is awake and running!');
});

app.post('/api/review', async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: 'No code provided' });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert AI code reviewer. Review the provided code for bugs, performance issues, readability, and best practices. Provide structured, actionable feedback.'
                },
                {
                    role: 'user',
                    content: code
                }
            ],
            model: 'llama-3.1-8b-instant',
        });

        const review = completion.choices[0]?.message?.content || 'No review generated.';
        res.json({ review });
    } catch (error) {
        console.error('Error in code review:', error);
        res.status(500).json({ error: error.message || 'Failed to review code' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
