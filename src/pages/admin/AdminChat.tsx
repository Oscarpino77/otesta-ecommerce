import { useState, useEffect } from 'react'
import { Send, Search, X, MessageCircle, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Order {
  id: string
  name: string
  email: string
  notes: string
  cart: any[]
  total: number
  status: string
  created_at: string
  messages: ChatMessage[]
}
interface ChatMessage {
  id: string
  sender: 'user' | 'admin'
  text: string
  timestamp: string
  replies?: ChatMessage[]
}



export default function AdminChat() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedThread, setSelectedThread] = useState<ChatMessage | null>(null)
  const [threadReply, setThreadReply] = useState('')

  // Carica ordini da localStorage
  useEffect(() => {
    const stored = localStorage.getItem('orders')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setOrders(parsed)
      } catch {
        setOrders([])
      }
    }
  }, [])

  // Aggiorna messaggi quando si seleziona un ordine
  useEffect(() => {
    if (selectedOrder) {
      setMessages(selectedOrder.messages.map((m) => ({ ...m, timestamp: m.timestamp })))
    } else {
      setMessages([])
    }
  }, [selectedOrder])

  // Salva messaggi su localStorage quando cambiano
  useEffect(() => {
    if (selectedOrder) {
      const updatedOrders = orders.map((o) =>
        o.id === selectedOrder.id ? { ...o, messages } : o
      )
      setOrders(updatedOrders)
      localStorage.setItem('orders', JSON.stringify(updatedOrders))
    }
  }, [messages])

  // Seleziona ordine
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order)
    setNewMessage('')
    setSelectedThread(null)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toISOString(),
      replies: [],
    }
    setMessages((prev) => {
      const updated = [...prev, message]
      // Se l'ordine selezionato è l'ultimo, aggiorna anche chat_messages
      if (orders.length > 0 && selectedOrder && orders[orders.length - 1].id === selectedOrder.id) {
        localStorage.setItem('chat_messages', JSON.stringify(updated))
      }
      return updated
    })
    setNewMessage('')
  }

  const handleOpenThread = (message: ChatMessage) => {
    setSelectedThread(message)
    setThreadReply('')
  }

  const handleAddThreadReply = () => {
    if (!threadReply.trim() || !selectedThread) return
    const reply: ChatMessage = {
      id: `reply-${Date.now()}`,
      sender: 'admin',
      text: threadReply,
      timestamp: new Date().toISOString(),
    }
    const updatedMessages = messages.map(msg =>
      msg.id === selectedThread.id
        ? { ...msg, replies: [...(msg.replies || []), reply] }
        : msg
    )
    setMessages(updatedMessages)
    setSelectedThread({ ...selectedThread, replies: [...(selectedThread.replies || []), reply] })
    setThreadReply('')
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8">
        <h1 className="font-serif text-4xl mb-8">Chat con Clienti</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Users List */}
          <div className="bg-white rounded-lg shadow flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Users */}
            <div className="flex-1 overflow-y-auto">
              {filteredOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => handleSelectOrder(order)}
                  className={`w-full p-4 border-b text-left hover:bg-gray-50 transition ${
                    selectedOrder?.id === order.id ? 'bg-accent bg-opacity-10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🛒</div>
                    <div className="flex-1">
                      <p className="font-600 text-sm">{order.name}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                      <p className="text-xs text-gray-600 mt-1 truncate">Ordine: {order.id}</p>
                      <p className="text-xs text-gray-600 mt-1">Stato: <span className="font-bold">{order.status.replace(/_/g, ' ')}</span></p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window with Thread Panel */}
          <div className="lg:col-span-2 flex gap-4">
            {/* Main Chat */}
            {selectedOrder ? (
              <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                  <p className="font-serif text-lg font-600">{selectedOrder.name}</p>
                  <p className="text-xs text-gray-500">{selectedOrder.email}</p>
                  <p className="text-xs text-gray-600 mt-1">Ordine: <span className="font-bold">{selectedOrder.id}</span></p>
                  <p className="text-xs text-gray-600 mt-1">Stato: <span className="font-bold">{selectedOrder.status.replace(/_/g, ' ')}</span></p>
                  <button
                    className="mt-2 px-3 py-1 bg-accent text-white rounded text-xs hover:bg-accent/80"
                    onClick={() => {
                      const next = selectedOrder.status === 'in_attesa_pagamento' ? 'pagato' : selectedOrder.status === 'pagato' ? 'spedito' : 'completato'
                      const updated = { ...selectedOrder, status: next }
                      setSelectedOrder(updated)
                      setOrders(orders.map(o => o.id === updated.id ? updated : o))
                      localStorage.setItem('orders', JSON.stringify(orders.map(o => o.id === updated.id ? updated : o)))
                    }}
                  >
                    Avanza stato ordine
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        onClick={() => handleOpenThread(msg)}
                        className={`max-w-xs px-4 py-3 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                          msg.sender === 'admin'
                            ? 'bg-gradient-to-r from-accent to-yellow-500 text-white rounded-br-none shadow-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
                        } ${selectedThread?.id === msg.id ? 'ring-2 ring-offset-2 ring-accent' : ''}`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex items-center justify-between mt-2 gap-3">
                          <p className={`text-xs ${msg.sender === 'admin' ? 'text-white/70' : 'text-gray-600'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {msg.replies && msg.replies.length > 0 && (
                            <span className={`text-xs font-bold ${msg.sender === 'admin' ? 'text-white/90' : 'text-accent'}`}>
                              {msg.replies.length} risposte
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Scrivi un messaggio..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-bold"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Thread Panel */}
            <AnimatePresence>
              {selectedThread && (
                <div
                  className="w-80 bg-white rounded-lg shadow flex flex-col border-l-4 border-accent overflow-hidden"
                >
                  {/* Thread Header */}
                  <div className="p-4 bg-gradient-to-r from-accent to-yellow-500 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-bold">Thread</span>
                    </div>
                    <button
                      onClick={() => setSelectedThread(null)}
                      className="hover:bg-white/20 p-1 rounded transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Thread Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {/* Main Message */}
                    <div className={`p-3 rounded-lg ${selectedThread.sender === 'admin' ? 'bg-accent/10 border border-accent' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex gap-2">
                        <span className="text-2xl">{selectedThread.sender === 'admin' ? '👔' : '👤'}</span>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-gray-600 mb-1">
                            {selectedThread.sender === 'admin' ? 'Admin' : selectedOrder?.name}
                          </p>
                          <p className="text-sm text-gray-900">{selectedThread.text}</p>
                          <p className="text-xs text-gray-500 mt-2">{selectedThread.timestamp}</p>
                        </div>
                      </div>
                    </div>

                    {/* Separator */}
                    {selectedThread.replies && selectedThread.replies.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 my-2">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span>{selectedThread.replies.length} risposte</span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                    )}

                    {/* Thread Replies */}
                    {selectedThread.replies?.map((reply) => (
                      <div
                        key={reply.id}
                        className={`p-3 rounded-lg ${reply.sender === 'admin' ? 'bg-accent/10 border-l-2 border-accent' : 'bg-blue-50 border-l-2 border-blue-300'}`}
                      >
                        <div className="flex gap-2">
                          <span className="text-lg">{reply.sender === 'admin' ? '👔' : '👤'}</span>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-gray-600 mb-1">
                              {reply.sender === 'admin' ? 'Admin' : selectedOrder?.name}
                            </p>
                            <p className="text-sm text-gray-800">{reply.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{reply.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Thread Reply Input */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={threadReply}
                        onChange={(e) => setThreadReply(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddThreadReply()}
                        placeholder="Rispondi nel thread..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <button
                        onClick={handleAddThreadReply}
                        className="bg-accent text-white px-3 py-2 rounded-lg hover:bg-opacity-90 transition"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
