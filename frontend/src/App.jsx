import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!code) return;
    setLoading(true);
    setError('');
    
    try {
      // Direct call to your backend live service
      const response = await axios.post('https://ai-code-reviewer-backend-0njd.onrender.com/api/review', {
        code,
        language
      });
      setReview(response.data.review);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'Failed to generate review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>AI Code Reviewer</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Submit Code for Review</h3>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>

          <textarea
            rows="12"
            style={{ width: '100%', marginTop: '10px' }}
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button onClick={handleAnalyze} disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Analyzing...' : 'Analyze Code'}
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Review History</h3>
          <pre style={{ background: '#f4f4f4', padding: '15px', minHeight: '200px' }}>
            {review || 'No reviews yet.'}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
