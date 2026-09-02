const completion = await groq.chat.completions.create({
    messages: [
        { role: 'system', content: 'You are an expert code reviewer.' },
        { role: 'user', content: `Language: ${language || 'Auto-detect'}\n\nCode:\n${code}` }
    ],
    model: 'llama-3.3-70b-versatile', // Active model string
});
