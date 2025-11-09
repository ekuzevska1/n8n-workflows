import { useState, useRef, useEffect } from 'react';
import './ChatPanel.css';

const ChatPanel = ({ chatHistory, isLoading, onSendMessage, onClearChat }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>Chat</h2>
        <button
          className="clear-button"
          onClick={onClearChat}
          disabled={chatHistory.length === 0}
        >
          Clear Chat
        </button>
      </div>

      <div className="chat-messages">
        {chatHistory.length === 0 ? (
          <div className="welcome-message">
            <div className="welcome-icon">💼</div>
            <h3>Welcome to the AI Proposal Generator</h3>
            <p>Start a conversation to generate comprehensive business transformation proposals.</p>
            <div className="example-prompts">
              <p className="example-label">Try asking:</p>
              <button className="example-prompt" onClick={() => setInput("Create a digital transformation proposal for a credit union")}>
                "Create a digital transformation proposal for a credit union"
              </button>
              <button className="example-prompt" onClick={() => setInput("Generate a proposal for implementing AI in healthcare")}>
                "Generate a proposal for implementing AI in healthcare"
              </button>
              <button className="example-prompt" onClick={() => setInput("Create a cloud migration proposal for a manufacturing company")}>
                "Create a cloud migration proposal for a manufacturing company"
              </button>
            </div>
          </div>
        ) : (
          chatHistory.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role}-message`}
            >
              <div className="message-header">
                <span className="message-role">
                  {message.role === 'user' ? '👤 You' : message.role === 'error' ? '⚠️ Error' : '🤖 AI Assistant'}
                </span>
                <span className="message-time">{formatTimestamp(message.timestamp)}</span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="message assistant-message loading-message">
            <div className="message-header">
              <span className="message-role">🤖 AI Assistant</span>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="loading-text">Generating your comprehensive proposal...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Describe the proposal you need... (Press Enter to send, Shift+Enter for new line)"
          disabled={isLoading}
          rows={3}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? 'Generating...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
