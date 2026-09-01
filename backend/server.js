import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/api/review', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code content is required.' });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert AI code reviewer. Analyze the code provided and return structured feedback on performance, security issues, and readability, along with a refactored code snippet.',
        },
        {
          role: 'user',
          content: code,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const review = completion.choices[0]?.message?.content || 'No review generated.';
    res.json({ review });
  } catch (error) {
    console.error('Error during code review:', error);
    res.status(500).json({ error: 'Failed to process code review.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});