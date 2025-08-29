import { useState } from 'react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hi! I\'m My My\'s AI assistant! Ask me about her projects, skills, or anything else!' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const predefinedResponses = {
    'skills': 'My My specializes in React, Next.js, JavaScript, Python, and GenAI integration. She\'s passionate about creating interactive web experiences!',
    'projects': 'Check out her Valentine\'s Day website project - it showcases her creativity with React animations and interactive elements!',
    'education': 'She\'s studying Computer Science at the University of Minnesota, expected to graduate in 2025.',
    'contact': 'You can reach out through her resume link or connect with her on GitHub!',
    'experience': 'She has experience in full-stack development, with a focus on modern React applications and AI integration.',
    'genai': 'My My is enthusiastic about GenAI and loves integrating AI features into her projects, like this chat widget!',
    'default': 'That\'s a great question! My My is always excited to discuss new opportunities and challenges in tech. Feel free to reach out to her directly!'
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);

    // Simple AI response logic
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = predefinedResponses.default;

      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage = { type: 'ai', text: response };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
      >
        <span style={{ fontSize: '24px', color: 'white' }}>
          {isOpen ? '✕' : '🤖'}
        </span>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '320px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            padding: '15px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '15px 15px 0 0',
            fontWeight: '600'
          }}>
            💬 Chat with My My's AI
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: message.type === 'user' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(0, 0, 0, 0.05)',
                  color: message.type === 'user' ? 'white' : '#333',
                  fontSize: '0.9rem',
                  animation: 'fadeIn 0.3s ease-in'
                }}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about My My..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '0.9rem',
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '8px 15px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default AIChatWidget;