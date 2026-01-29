import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000',{
  withCredentials: true,
  transports: ['websocket', 'polling']
});

const OrderChat = ({ orderId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Join order chat room
    socket.emit('join-room', orderId);

    // Listen for messages
    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, [orderId]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(scrollToBottom, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('send-message', {
        orderId,
        text: message,
        sender: 'customer', // or 'support'
        name: 'You'
      });
      setMessage('');
    }
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100 p-6 h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold">🍕</span>
        </div>
        <div>
          <h3 className="font-bold text-xl text-slate-900">Order #{orderId.slice(-6)}</h3>
          <span className="text-emerald-600 font-semibold">Support Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.sender === 'customer'
                ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white'
                : 'bg-gray-200 text-slate-900'
            }`}>
              <p>{msg.text}</p>
              <span className={`text-xs block mt-1 opacity-75 ${
                msg.sender === 'customer' ? 'text-emerald-100' : 'text-gray-500'
              }`}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex gap-3 pt-4 border-t border-gray-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about delivery, payment..."
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-200/50"
        />
        <button
          type="submit"
          className="w-14 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default OrderChat;
