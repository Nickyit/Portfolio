import React, { useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ToastState {
  message: string;
  submessage?: string;
  type: 'success' | 'error';
}

export const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Auto-close toast notifications after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear inline error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!form.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setToast({
        message: 'Failed to send message.',
        submessage: 'EmailJS environment variables are missing configuration.',
        type: 'error',
      });
      setIsSending(false);
      return;
    }

    const templateParams = {
      from_name: form.name,
      reply_to: form.email,
      subject: form.subject,
      message: form.message,
      to_email: 'nikitadigodiya31@gmail.com',
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setToast({
        message: 'Message sent successfully!',
        submessage: "Thanks for reaching out. I'll get back to you soon.",
        type: 'success',
      });
      // Reset form fields
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('EmailJS error:', error);
      setToast({
        message: 'Failed to send message.',
        submessage: 'Please try again later.',
        type: 'error',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Section id="contact" className="pb-32">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 p-6 rounded-2xl border backdrop-blur-md shadow-2xl max-w-sm flex flex-col gap-1 transition-all ${
              toast.type === 'success'
                ? 'bg-black/90 border-green-500/30 text-white'
                : 'bg-black/90 border-red-500/30 text-white'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {toast.type === 'success' ? (
                <span className="text-green-400 text-lg">✓</span>
              ) : (
                <span className="text-red-400 text-lg">✗</span>
              )}
              {toast.message}
            </div>
            {toast.submessage && (
              <span className="text-sm text-gray-400 pl-6">{toast.submessage}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 glass-card p-6 md:p-16 border-white/5 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Let's Build the <br />
                <span className="text-gradient">Future</span> Together
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I'm always open to discussing cutting-edge AI research, potential collaborations, or exciting engineering opportunities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                    @
                  </div>
                  <span className="text-gray-300 font-medium">nikitadigodiya31@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                    📍
                  </div>
                  <span className="text-gray-300 font-medium">Indore, M.P., India</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      errors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                      errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Opportunity: Lead AI Engineer"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    errors.subject ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10'
                  }`}
                />
                {errors.subject && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.subject}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none ${
                    errors.message ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10'
                  }`}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.message}</span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                disabled={isSending}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {isSending ? (
                  <>
                    Sending...
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};
