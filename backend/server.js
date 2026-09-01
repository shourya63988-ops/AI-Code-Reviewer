require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/review', async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const prompt = `You are an expert code reviewer. Analyze the following ${language || 'javascript'} code and return a JSON object with:
1. "summary": Concise overview of performance, security, and readability.
2. "security": Integer score out of 10.
3. "performance": Integer score out of 10.
4. "readability": Integer score out of 10.
5. "improvedCode": Complete refactored, production-ready code addressing all issues.

Return ONLY raw JSON with no markdown formatting or backticks.

Code to review:
${code}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'openai/gpt-oss-20b',
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    const cleanJson = responseText.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanJson);

    res.json(result);
  } catch (error) {
    console.error('Error during code review:', error);
    res.status(500).json({ error: 'Failed to process code review' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ SERVER RUNNING ON PORT ${PORT}`);
});