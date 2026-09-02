import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setReview('');

    try {
      const response = await axios.post('https://ai-code-reviewer-backend-0njd.onrender.com/api/review', {
        code,
        language
      });
      setReview(response.data.review);
    } catch (error) {
      console.error(error);
      setReview(error.response?.data?.error || 'Failed to connect to review server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🤖 AI Code Reviewer</h1>
      </header>

      <div className="main-content">
        <div className="editor-section">
          <h2>Submit Code</h2>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code snippet here..."
            className="code-input"
            rows={15}
          />

          <button 
            onClick={handleReview} 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Analyzing Code...' : 'Analyze Code'}
          </button>
        </div>

        <div className="review-section">
          <h2>Review Result</h2>
          <div className="review-content">
            {review ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{review}</ReactMarkdown>
            ) : (
              <p className="placeholder">No review generated yet. Submit your code to start.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
