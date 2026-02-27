import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  id: string
  sender: 'user' | 'admin'
  text: string
  timestamp: Date
  replies?: ChatMessage[]
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'admin',
      text: 'Ciao! Come possiamo aiutarti?',
      timestamp: new Date(),
      replies: [],
    },
  ])
  const [input, setInput] = useState('')
  const [selectedThread, setSelectedThread] = useState<ChatMessage | null>(null)
  const [threadReply, setThreadReply] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedThread])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
      replies: [],
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
          replies: [],
        },
      ])
    }, 1000)
  }

  const handleOpenThread = (message: ChatMessage) => {
    setSelectedThread(message)
    setThreadReply('')
  }

  const handleAddThreadReply = () => {
    if (!threadReply.trim() || !selectedThread) return

    const reply: ChatMessage = {
      id: `reply-${Date.now()}`,
      sender: 'user',
      text: threadReply,
      timestamp: new Date(),
    }

    const updatedMessages = messages.map(msg =>
      msg.id === selectedThread.id
        ? { ...msg, replies: [...(msg.replies || []), reply] }
        : msg
    )

    setMessages(updatedMessages)
    setSelectedThread({ ...selectedThread, replies: [...(selectedThread.replies || []), reply] })
    setThreadReply('')

    // Simulate admin thread response
    setTimeout(() => {
      const adminReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'admin',
        text: 'Perfetto! Ti aiuterò con questo.',
        timestamp: new Date(),
      }

      const finalMessages = updatedMessages.map(msg =>
        msg.id === selectedThread.id
          ? { ...msg, replies: [...(msg.replies || []), reply, adminReply] }
          : msg
      )

      setMessages(finalMessages)
      setSelectedThread({ ...selectedThread, replies: [...(selectedThread.replies || []), reply, adminReply] })
    }, 800)
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
            <div className="bg-gradient-to-r from-primary via-accent to-primary text-white p-4 rounded-t-lg flex items-center justify-between relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="font-serif text-lg relative z-10">Assistenza O.TESTA</div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background-alt">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <button
                    onClick={() => handleOpenThread(msg)}
                    className={`max-w-xs px-4 py-3 rounded-lg text-left cursor-pointer transition transform hover:scale-105 group relative ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-primary to-blue-700 text-white'
                        : 'bg-white border-2 border-accent/20 hover:border-accent'
                    } ${selectedThread?.id === msg.id ? 'ring-2 ring-accent' : ''}`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <p className={`text-xs ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-600'}`}>
                        {msg.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {msg.replies && msg.replies.length > 0 && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${msg.sender === 'user' ? 'bg-white/20' : 'bg-accent/10 text-accent'}`}>
                          {msg.replies.length}
                        </span>
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Scrivi un messaggio..."
                className="flex-1 bg-gray-50 border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-accent to-yellow-500 text-primary p-2 rounded hover:shadow-lg transition font-bold"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thread Panel */}
      <AnimatePresence>
        {isOpen && selectedThread && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.1 }}
            // @ts-ignore
            className="absolute bottom-20 right-[400px] w-72 h-96 bg-white border-2 border-accent rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            {/* Thread Header */}
            <div className="p-4 bg-gradient-to-r from-accent to-yellow-500 text-white flex items-center justify-between">
              <span className="font-bold text-sm">Thread di Conversazione</span>
              <button
                onClick={() => setSelectedThread(null)}
                className="hover:bg-white/20 p-1 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thread Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {/* Main Message */}
              <div className={`p-3 rounded-lg border-l-4 ${selectedThread.sender === 'user' ? 'bg-blue-50 border-blue-400' : 'bg-accent/10 border-accent'}`}>
                <p className="text-xs font-bold text-gray-600 mb-1">{selectedThread.sender === 'user' ? 'Tu' : 'Admin'}</p>
                <p className="text-sm text-gray-900">{selectedThread.text}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedThread.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Thread Replies */}
              {selectedThread.replies && selectedThread.replies.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-xs text-gray-400 my-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="font-bold">{selectedThread.replies.length}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {selectedThread.replies.map((reply) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-2 rounded-lg text-xs border-l-2 ${reply.sender === 'user' ? 'bg-blue-50 border-blue-300' : 'bg-accent/10 border-accent'}`}
                    >
                      <p className="font-bold text-gray-600 mb-0.5">{reply.sender === 'user' ? 'Tu' : 'Admin'}</p>
                      <p className="text-gray-800">{reply.text}</p>
                      <p className="text-gray-500 mt-1">
                        {reply.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </motion.div>
                  ))}
                </>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Thread Reply Input */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex gap-2">
              <input
                type="text"
                value={threadReply}
                onChange={(e) => setThreadReply(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddThreadReply()}
                placeholder="Rispondi..."
                className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                onClick={handleAddThreadReply}
                className="bg-accent text-white p-1.5 rounded hover:bg-opacity-90 transition"
              >
                <Send className="w-3.5 h-3.5" />
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
        className="relative w-14 h-14 bg-gradient-to-r from-accent to-yellow-500 text-primary rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center font-bold group"
      >
        <motion.div
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
          className="relative"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.div>
        {unreadCount > 0 && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  )
}
