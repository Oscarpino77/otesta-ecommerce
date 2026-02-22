import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, X } from 'lucide-react'

interface Message {
  id: string
  sender: 'admin' | 'client'
  text: string
  timestamp: Date
}

interface Conversation {
  id: string
  client_name: string
  client_email: string
  last_message: string
  unread_admin_count: number
  messages: Message[]
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    client_name: 'Marco Rossi',
    client_email: 'marco@example.com',
    last_message: 'Quando mi arriverà l\'ordine?',
    unread_admin_count: 1,
    messages: [
      {
        id: '1',
        sender: 'client',
        text: 'Buongiorno, vorrei informazioni su una consegna',
        timestamp: new Date(),
      },
      {
        id: '2',
        sender: 'admin',
        text: 'Ciao Marco! Come possiamo aiutarti?',
        timestamp: new Date(),
      },
      {
        id: '3',
        sender: 'client',
        text: 'Quando mi arriverà l\'ordine?',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '2',
    client_name: 'Luca Bianchi',
    client_email: 'luca@example.com',
    last_message: 'Grazie mille!',
    unread_admin_count: 0,
    messages: [
      {
        id: '1',
        sender: 'client',
        text: 'Mi piacciono molto i vostri prodotti',
        timestamp: new Date(),
      },
      {
        id: '2',
        sender: 'admin',
        text: 'Grazie! Siamo felici di sentirti dire questo.',
        timestamp: new Date(),
      },
    ],
  },
]

export default function ChatTab() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  )
  const [messageText, setMessageText] = useState('')

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return
    console.log('Sending message:', messageText)
    setMessageText('')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      // @ts-ignore
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        // @ts-ignore
        className="bg-white border border-border rounded-lg overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-serif font-600">Conversazioni</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full text-left p-4 border-b border-border hover:bg-background-alt transition ${
                selectedConversation?.id === conv.id ? 'bg-accent/10' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-600">{conv.client_name}</span>
                {conv.unread_admin_count > 0 && (
                  <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                    {conv.unread_admin_count}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-muted line-clamp-1">{conv.last_message}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Messages */}
      {selectedConversation && (
        // @ts-ignore
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // @ts-ignore
          className="lg:col-span-2 bg-white border border-border rounded-lg flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h3 className="font-serif font-600">{selectedConversation.client_name}</h3>
            <p className="text-sm text-text-muted">{selectedConversation.client_email}</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConversation.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                // @ts-ignore
                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'admin'
                      ? 'bg-primary text-white'
                      : 'bg-background-alt'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Scrivi un messaggio..."
                className="flex-1 px-3 py-2 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-accent text-primary p-2 rounded hover:opacity-90 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
