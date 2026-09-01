import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setReview('');

    try {
      const response = await axios.post('https://ai-code-reviewer-backend-0njd.onrender.com/api/review', {
        code,
      });
      setReview(response.data.review);
    } catch (error) {
      console.error('Error fetching review:', error);
      setReview('Failed to fetch code review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>AI Code Reviewer</h1>
      <div className="editor-container">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here for review..."
          rows={15}
          cols={60}
        />
      </div>
      <button onClick={handleReview} disabled={loading}>
        {loading ? 'Reviewing...' : 'Review Code'}
      </button>

      {review && (
        <div className="review-container">
          <h2>Review Results</h2>
          <pre>{review}</pre>
        </div>
      )}
    </div>
  );
}

export default App;