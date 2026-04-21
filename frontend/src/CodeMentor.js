import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeMentor = () => {
  const [code, setCode] = useState('// Write your code here...\n\nfunction solve() {\n  \n}');
  const [feedback, setFeedback] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const getSocraticFeedback = async () => {
    setIsLoading(true);
    setFeedback("Thinking...");
    
    try {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: "user_test_01",
          code: code,
          language: "javascript",
          problemDescription: "Implement a function to find the maximum sum subarray (Kadane's Algorithm).",
          hintLevel: hintLevel
        }),
      });

      const data = await response.json();
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      setFeedback(parsedData.feedback);
    } catch (error) {
      setFeedback("Error: Could not connect to the AI Mentor. Ensure your backend is running.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestHint = () => {
    if (hintLevel < 3) {
      setHintLevel(prev => prev + 1);
      setFeedback(`Hint Level ${hintLevel + 1} requested. Now click 'Submit Code' to get your hint.`);
    } else {
      setFeedback("You have reached the maximum number of hints for this problem.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#1e1e1e', color: 'white' }}>
      <header style={{ padding: '10px 20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#4fc3f7' }}>CodeMentor <span style={{fontSize: '12px', color: '#888'}}>Socratic Mode</span></h2>
        <div>
          <button 
            onClick={requestHint}
            style={{ marginRight: '10px', padding: '8px 15px', borderRadius: '4px', border: '1px solid #4fc3f7', backgroundColor: 'transparent', color: '#4fc3f7', cursor: 'pointer' }}
          >
            Get Hint ({hintLevel}/3)
          </button>
          <button 
            onClick={getSocraticFeedback} 
            disabled={isLoading}
            style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#4fc3f7', color: '#1e1e1e', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isLoading ? 'Analyzing...' : 'Submit Code'}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, borderRight: '1px solid #333' }}>
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        <div style={{ width: '400px', padding: '20px', overflowY: 'auto', backgroundColor: '#252526' }}>
          <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>AI Mentor Feedback</h3>
          <div style={{ lineHeight: '1.6', color: '#d4d4d4', whiteSpace: 'pre-wrap' }}>
            {feedback || "Write some code and hit submit to receive Socratic guidance."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeMentor;