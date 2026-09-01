// AFTER (New Code)
const response = await fetch('...', {
    method: 'POST',
    headers: { ... },
    body: JSON.stringify({
        model: 'llama-3.1-8b-instant', 
        messages: [...]
    })
});
