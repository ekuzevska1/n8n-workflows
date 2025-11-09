import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatPanel from './components/ChatPanel';
import ProposalViewer from './components/ProposalViewer';
import './App.css';

function App() {
  const [sessionId] = useState(() => uuidv4());
  const [proposal, setProposal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    setError(null);

    // Add user message to chat history
    const userMessage = { role: 'user', content: message, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL ||
        'https://primary-rt3j-production.up.railway.app/webhook/be96b95d-9461-4e21-878a-d13ad0f22f1f/chat';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: message,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to chat history
      const aiMessage = {
        role: 'assistant',
        content: data.message || 'Proposal generated successfully',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiMessage]);

      // Update proposal
      setProposal(data);
    } catch (err) {
      const errorMessage = `Failed to generate proposal: ${err.message}`;
      setError(errorMessage);

      // Add error message to chat history
      const errorMsg = {
        role: 'error',
        content: errorMessage,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setProposal(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">AI Business Transformation Proposal Generator</h1>
        <p className="app-subtitle">Generate comprehensive, executive-ready proposals powered by AI</p>
      </header>

      <div className="main-content">
        <ChatPanel
          chatHistory={chatHistory}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
        />

        <ProposalViewer
          proposal={proposal}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
