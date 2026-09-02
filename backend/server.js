const completion = await groq.chat.completions.create({
    messages: [
        { 
            role: 'system', 
            content: 'You are an expert code reviewer. Provide bug analysis, readability advice, and optimized code.' 
        },
        { 
            role: 'user', 
            content: `Language: ${language || 'Auto-detect'}\n\nCode:\n${code}` 
        }
    ],
    model: 'llama3-70b-8192', // <-- Update to this supported model ID
});
