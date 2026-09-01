import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import './App.css';

function App() {
  const [code, setCode] = useState('// Write code here...\nfunction add(a, b) {\n  return a + b;\n}');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  const handleReview = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });
      const data = await response.json();
      setReview(data);
    } catch (err) {
      alert('Error fetching review');
    } finally {
      setLoading(false);
    }
  };

  const applyFix = () => {
    if (review?.improvedCode) {
      setCode(review.improvedCode);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', color: '#fff' }}>
      <h1 style={{ textAlign: 'center' }}>Genius AI Code Reviewer & Auto-Fixer</h1>
      
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '5px' }}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <div style={{ border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
        <Editor
          height="250px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <button 
          onClick={handleReview} 
          disabled={loading}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          {loading ? 'Reviewing Code...' : 'Review Code'}
        </button>
      </div>

      {review && (
        <div style={{ marginTop: '30px' }}>
          <h2>Summary</h2>
          <p style={{ background: '#222', padding: '15px', borderRadius: '6px' }}>{review.summary}</p>

          <h2>Scores</h2>
          <p style={{ fontSize: '18px' }}>
            🔒 Security: <b>{review.security}/10</b> | ⚡ Performance: <b>{review.performance}/10</b> | 📖 Readability: <b>{review.readability}/10</b>
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 10px 0' }}>
            <h2>Code Comparison (Original vs Improved)</h2>
            <button 
              onClick={applyFix} 
              style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              ⚡ Apply Fix to Editor
            </button>
          </div>

          <ReactDiffViewer
            oldValue={code}
            newValue={review.improvedCode}
            splitView={true}
            useDarkTheme={true}
          />
        </div>
      )}
    </div>
  );
}

export default App;