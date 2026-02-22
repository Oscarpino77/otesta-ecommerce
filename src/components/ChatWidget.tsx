import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  id: string
  sender: 'user' | 'admin'
  text: string
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'admin',
      text: 'Ciao! Come possiamo aiutarti?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInput('')

    // Simulate admin response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'admin',
          text: 'Grazie per il tuo messaggio! Ti risponderemo al più presto.',
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  const unreadCount = messages.filter((m) => m.sender === 'admin').length

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            // @ts-ignore
            className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-1rem)] h-96 bg-white border border-border rounded-lg shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="font-serif text-lg">Assistenza O.TESTA</div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-alt">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Scrivi un messaggio..."
                className="flex-1 bg-white border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleSend}
                className="bg-accent text-primary p-2 rounded hover:opacity-90 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        // @ts-ignore
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-accent text-primary rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </motion.button>
    </div>
  )
}
