import React, { useState } from 'react';

const BACKEND_URL = 'https://ai-code-reviewer-backend-0njd.onrender.com';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code first.');
      return;
    }

    setLoading(true);
    setError('');
    setReview('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate review');
      }

      setReview(data.review);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center' }}>🤖 AI Code Reviewer</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>Submit Code</h2>
          
          {error && (
            <div style={{ color: 'red', padding: '10px', background: '#ffe6e6', borderRadius: '4px', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <textarea
            rows="12"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            style={{ width: '100%', padding: '10px', fontFamily: 'monospace', boxSizing: 'border-box' }}
          />

          <button 
            onClick={handleAnalyze} 
            disabled={loading}
            style={{ marginTop: '10px', padding: '10px 20px', width: '100%', cursor: 'pointer' }}
          >
            {loading ? 'Analyzing Code (may take up to 40s on wake up)...' : 'Analyze Code'}
          </button>
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>Review Result</h2>
          <div style={{ background: '#f4f4f4', padding: '15px', minHeight: '280px', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
            {review || 'No review generated yet. Submit your code to start.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
