// WRONG (Causes 404):
const response = await fetch(`${BACKEND_URL}/api/review`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    code, 
    language, 
    model: 'llama-3.1-8b-instant' // <-- REMOVE THIS LINE ENTIRELY
  }),
});

// CORRECT:
const response = await fetch(`${BACKEND_URL}/api/review`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    code, 
    language 
  }),
});
