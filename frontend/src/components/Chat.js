import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI(
   process.env.REACT_APP_OPENAI_API_KEY
);


function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Fetch previous chat messages from your backend here
  }, []);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    console.log("openai key : ", process.env.REACT_APP_OPENAI_API_KEY)
    if (inputMessage.trim() !== '') {
      const newMessage = { text: inputMessage, user: 'You' };
      setMessages([...messages, newMessage]);

      // const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      //   prompt: inputMessage,
      //   max_tokens: 60
      // }, {
      //   headers: {
      //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      //   }
      // });
      const response = await openai.complete({
        engine: 'davinci-codex',
        prompt: inputMessage,
        maxTokens: 60
      });

      const aiMessage = { text: response.data.choices[0].text, user: 'AI' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setInputMessage('');
    }
  };

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}><strong>{message.user}:</strong> {message.text}</p>
      ))}
      <input type="text" value={inputMessage} onChange={handleInputChange} onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSendMessage();
        }
      }} />
    </div>
  );
}

export default Chat;