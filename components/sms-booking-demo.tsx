"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MessageSquare, Send, CheckCircle, Clock, Phone, Signal } from "lucide-react"

interface SMSBookingDemoProps {
  onBack: () => void
}

interface SMSMessage {
  id: string
  type: "sent" | "received"
  content: string
  timestamp: string
  status?: "sending" | "sent" | "delivered"
}

const SAMPLE_COMMANDS = [
  "BOOK RIDE GRMILES123",
  "STATUS GRMILES123",
  "CANCEL GRMILES123",
  "HELP GRMILES",
  "BALANCE GRMILES",
]

const SMS_RESPONSES: Record<string, string> = {
  "BOOK RIDE GRMILES123":
    "✅ Ride booked! Cart #247 will arrive at Dhaka Central Hub in 25 mins. Fare: ৳180. Booking ID: GM001. Reply CANCEL GM001 to cancel.",
  "STATUS GRMILES123":
    "🚗 Your ride GM001: Cart #247 is 5 mins away from Dhaka Central Hub. Driver: Rahman (4.8⭐). Track: grmiles.co/track/GM001",
  "CANCEL GRMILES123":
    "❌ Ride GM001 cancelled successfully. No charges applied. Book again anytime by texting BOOK RIDE GRMILES123.",
  "HELP GRMILES":
    "📱 GrameenMiles SMS Commands:\n• BOOK RIDE - Book a ride\n• STATUS - Check ride status\n• CANCEL - Cancel booking\n• BALANCE - Check wallet\n• HELP - Show commands",
  "BALANCE GRMILES":
    "💰 Your GrameenMiles balance: ৳450. Last ride: ৳180 on 15/01. Add money: Visit any hub or call 16247.",
}

export default function SMSBookingDemo({ onBack }: SMSBookingDemoProps) {
  const [messages, setMessages] = useState<SMSMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("01712345678")

  const addMessage = (content: string, type: "sent" | "received", status?: "sending" | "sent" | "delivered") => {
    const newMessage: SMSMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendSMS = () => {
    if (!inputValue.trim()) return

    // Add sent message
    addMessage(inputValue, "sent", "sending")
    const command = inputValue.toUpperCase()
    setInputValue("")

    // Simulate sending delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === prev[prev.length - 1]?.id ? { ...msg, status: "delivered" } : msg)),
      )

      // Show typing indicator
      setIsTyping(true)

      // Simulate response delay
      setTimeout(() => {
        setIsTyping(false)
        const response = SMS_RESPONSES[command] || "❓ Invalid command. Reply HELP GRMILES for available commands."
        addMessage(response, "received")
      }, 1500)
    }, 800)
  }

  const handleQuickCommand = (command: string) => {
    setInputValue(command)
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sending":
        return <Clock className="w-3 h-3 text-muted-foreground" />
      case "sent":
        return <CheckCircle className="w-3 h-3 text-muted-foreground" />
      case "delivered":
        return <CheckCircle className="w-3 h-3 text-primary" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-serif font-bold text-primary">SMS Booking Demo</h1>
          <p className="text-sm text-muted-foreground">Book rides without internet</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Signal className="w-4 h-4" />
          <span>SMS</span>
        </div>
      </header>

      {/* Phone Simulation Header */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-medium">GrameenMiles SMS</span>
          </div>
          <div className="text-sm text-muted-foreground">16247</div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">From: {phoneNumber}</div>
      </div>

      {/* Instructions */}
      <div className="p-4">
        <Card className="p-4 bg-accent/10 border-accent/30">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-accent-foreground mt-0.5" />
            <div>
              <h3 className="font-medium text-accent-foreground mb-2">How SMS Booking Works</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Send SMS to 16247 from any phone</li>
                <li>• No internet or smartphone required</li>
                <li>• Works on all mobile networks</li>
                <li>• Instant booking confirmations</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Commands */}
      <div className="px-4 mb-4">
        <h3 className="font-medium mb-3">Try These Commands:</h3>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_COMMANDS.map((command) => (
            <Button
              key={command}
              variant="outline"
              size="sm"
              onClick={() => handleQuickCommand(command)}
              className="text-xs"
            >
              {command}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-4 pb-32">
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Try sending an SMS command above</p>
              <p className="text-xs mt-1">Start with "BOOK RIDE GRMILES123"</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  message.type === "sent" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                }`}
              >
                <div className="text-sm whitespace-pre-line">{message.content}</div>
                <div
                  className={`flex items-center justify-between mt-2 text-xs ${
                    message.type === "sent" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  <span>{message.timestamp}</span>
                  {message.type === "sent" && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-lg p-3 max-w-xs">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">GrameenMiles is typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type SMS command..."
            onKeyPress={(e) => e.key === "Enter" && handleSendSMS()}
            className="flex-1"
          />
          <Button onClick={handleSendSMS} disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Send to: 16247</span>
          <span>Standard SMS rates apply</span>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="px-4 py-6">
        <h3 className="font-medium mb-4">Why SMS Booking?</h3>
        <div className="grid grid-cols-1 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Universal Access</div>
                <div className="text-xs text-muted-foreground">Works on any mobile phone, even basic models</div>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Signal className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-sm">No Internet Required</div>
                <div className="text-xs text-muted-foreground">Book rides even in areas with poor connectivity</div>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <div className="font-medium text-sm">Instant Confirmation</div>
                <div className="text-xs text-muted-foreground">Get booking details and updates via SMS</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
