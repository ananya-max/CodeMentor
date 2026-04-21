import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeMentor = () => {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('// Start coding your solution...');

  // Updated language list based on your requirements
  const languages = ['java', 'python3', 'javascript', 'ruby', 'go', 'cpp'];

  // Map user-friendly names to Monaco-specific language IDs
  const getMonacoLang = (lang) => {
    const map = {
      'python3': 'python',
      'javascript': 'javascript',
      'cpp': 'cpp',
      'java': 'java',
      'ruby': 'ruby',
      'go': 'go'
    };
    return map[lang] || lang;
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', minHeight: '100vh', color: 'white' }}>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>CodeMentor AI</h2>
        
        <div style={{ marginLeft: 'auto' }}>
          <label htmlFor="lang-select" style={{ marginRight: '10px' }}>Language:</label>
          <select 
            id="lang-select"
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ 
              padding: '8px', 
              borderRadius: '4px', 
              backgroundColor: '#333', 
              color: 'white', 
              border: '1px solid #555' 
            }}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
        <Editor
          height="70vh"
          theme="vs-dark"
          language={getMonacoLang(language)}
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button 
          onClick={() => alert(`Sending ${language} code to Gemini for Socratic feedback!`)}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            fontWeight: 'bold',
            cursor: 'pointer' 
          }}
        >
          Ask Mentor for Help
        </button>
      </div>
    </div>
  );
};

export default CodeMentor;