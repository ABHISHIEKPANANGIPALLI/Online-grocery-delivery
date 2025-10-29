import { ArrowLeft, Send, Phone, Mail, MessageCircle, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import type { User as UserType } from '../App';

type CustomerSupportProps = {
  onBack: () => void;
  user: UserType | null;
  onLogout: () => void;
};

export function CustomerSupport({
  onBack,
  user,
  onLogout,
}: CustomerSupportProps) {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    setMessages([...messages, { text: chatMessage, sender: 'user' }]);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Thank you for your message. Our support team will get back to you shortly.',
          sender: 'bot',
        },
      ]);
    }, 1000);
  };

  const handleSubmitContactForm = () => {
    if (!contactName || !contactEmail || !contactMessage) {
      alert('Please fill all fields');
      return;
    }
    alert('Your message has been sent! We will get back to you soon.');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse products, add them to cart, and proceed to checkout. Fill in your delivery details and choose a payment method to complete your order.',
    },
    {
      question: 'What are the delivery charges?',
      answer: 'Delivery is FREE on orders above ₹500. For orders below ₹500, a delivery charge of ₹40 applies.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Cash on Delivery (COD), Credit/Debit Cards, and UPI payments.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order before it is shipped. Please contact our support team for assistance.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer easy returns within 24 hours of delivery for fresh products. Please contact support to initiate a return.',
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order from the Order Tracking page. You will also receive email/SMS notifications about your order status.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1>Customer Support</h1>
            </div>
            
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Support Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chatbot */}
          <div className="bg-white border rounded-lg overflow-hidden flex flex-col h-[600px]">
            <div className="bg-green-600 text-white p-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h2>Live Chat</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="mb-4">Contact Us</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Enter your name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="How can we help you?"
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={handleSubmitContactForm}>
                  Send Message
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p>1800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p>support@freshmart.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 max-w-4xl mx-auto">
          <h2 className="mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white border rounded-lg">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
