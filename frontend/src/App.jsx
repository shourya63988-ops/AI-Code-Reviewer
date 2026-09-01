// Replace 'https://your-backend-name.onrender.com' with your actual Render backend URL
const BACKEND_URL = 'https://ai-code-reviewer-backend.onrender.com';

const handleAnalyze = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, language }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to generate review');

    setReview(data.review);
  } catch (err) {
    setError(err.message);
  }
};
