import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const LiveChatInterface = ({ currentLanguage }) => {
  const [isAgentAvailable, setIsAgentAvailable] = useState(true);
  const [waitTime, setWaitTime] = useState(2);
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const translations = {
    en: {
      liveChat: "Live Chat",
      agentAvailable: "Agent Available",
      agentOffline: "Agent Offline",
      estimatedWait: "Estimated wait time",
      minutes: "minutes",
      startChat: "Start Chat",
      endChat: "End Chat",
      typeMessage: "Type your message...",
      send: "Send",
      agentTyping: "Agent is typing...",
      chatEnded: "Chat session ended",
      attachFile: "Attach File",
      quickReplies: "Quick Replies"
    },
    es: {
      liveChat: "Chat en Vivo",
      agentAvailable: "Agente Disponible",
      agentOffline: "Agente Desconectado",
      estimatedWait: "Tiempo de espera estimado",
      minutes: "minutos",
      startChat: "Iniciar Chat",
      endChat: "Finalizar Chat",
      typeMessage: "Escribe tu mensaje...",
      send: "Enviar",
      agentTyping: "El agente está escribiendo...",
      chatEnded: "Sesión de chat finalizada",
      attachFile: "Adjuntar Archivo",
      quickReplies: "Respuestas Rápidas"
    },
    fr: {
      liveChat: "Chat en Direct",
      agentAvailable: "Agent Disponible",
      agentOffline: "Agent Hors Ligne",
      estimatedWait: "Temps d\'attente estimé",
      minutes: "minutes",
      startChat: "Démarrer Chat",
      endChat: "Terminer Chat",
      typeMessage: "Tapez votre message...",
      send: "Envoyer",
      agentTyping: "L\'agent tape...",
      chatEnded: "Session de chat terminée",
      attachFile: "Joindre Fichier",
      quickReplies: "Réponses Rapides"
    }
  };

  const quickReplies = [
    "I need help with my account",
    "Transaction issue",
    "Password reset",
    "Card problems"
  ];

  const agentInfo = {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    status: "online"
  };

  useEffect(() => {
    // Simulate agent availability
    const checkAvailability = () => {
      const currentHour = new Date().getHours();
      setIsAgentAvailable(currentHour >= 9 && currentHour < 18);
      setWaitTime(Math.floor(Math.random() * 5) + 1);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleStartChat = () => {
    setIsChatActive(true);
    setMessages([
      {
        id: 1,
        sender: 'agent',
        message: `Hi! I'm ${agentInfo.name}. How can I help you today?`,
        timestamp: new Date()
      }
    ]);
  };

  const handleEndChat = () => {
    setIsChatActive(false);
    setMessages([]);
    setNewMessage('');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate agent response
      setTimeout(() => {
        setIsTyping(false);
        const agentResponse = {
          id: messages.length + 2,
          sender: 'agent',
          message: "I understand your concern. Let me help you with that. Can you provide more details about the issue?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 2000);
    }
  };

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-muted">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={agentInfo.avatar}
                alt={agentInfo.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${
                isAgentAvailable ? 'bg-success' : 'bg-error'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                {translations[currentLanguage].liveChat}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${isAgentAvailable ? 'text-success' : 'text-error'}`}>
                  {isAgentAvailable ? translations[currentLanguage].agentAvailable : translations[currentLanguage].agentOffline}
                </span>
                {isAgentAvailable && !isChatActive && (
                  <span className="text-xs text-text-secondary">
                    • {translations[currentLanguage].estimatedWait}: {waitTime} {translations[currentLanguage].minutes}
                  </span>
                )}
              </div>
            </div>
          </div>
          {isChatActive && (
            <Button
              variant="ghost"
              onClick={handleEndChat}
              iconName="X"
              size="sm"
            >
              {translations[currentLanguage].endChat}
            </Button>
          )}
        </div>
      </div>

      {/* Chat Content */}
      {!isChatActive ? (
        <div className="p-6 text-center">
          <div className="mb-4">
            <Icon name="MessageCircle" size={48} color="var(--color-accent)" className="mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              Connect with our support team for immediate assistance
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleStartChat}
            disabled={!isAgentAvailable}
            iconName="MessageCircle"
            iconPosition="left"
            fullWidth
          >
            {translations[currentLanguage].startChat}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-96">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === 'user' ?'bg-accent text-accent-foreground' :'bg-muted text-text-primary'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-accent-foreground/70' : 'text-text-secondary'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-text-primary px-4 py-2 rounded-2xl">
                  <p className="text-sm">{translations[currentLanguage].agentTyping}</p>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-border">
              <p className="text-xs text-text-secondary mb-2">
                {translations[currentLanguage].quickReplies}:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 text-xs bg-muted hover:bg-border rounded-full transition-colors duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
                <Icon name="Paperclip" size={20} color="var(--color-text-secondary)" />
              </button>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={translations[currentLanguage].typeMessage}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                iconName="Send"
                size="sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChatInterface;