import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare, MapPin } from 'lucide-react';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get In <span className="text-purple-600">Touch</span>
          </h2>
          <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-dark border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-purple-600/20 transition-colors"></div>
               
               <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
               
               <div className="space-y-8">
                 <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                     <Mail className="text-purple-400" size={24} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Me</p>
                     <p className="text-white font-medium break-all">afrah.tk.kab@gmail.com</p>
                   </div>
                 </div>

                 <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-pink-600/20 rounded-2xl flex items-center justify-center border border-pink-500/30">
                     <MapPin className="text-pink-400" size={24} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</p>
                     <p className="text-white font-medium">India</p>
                   </div>
                 </div>
               </div>

               <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-2xl">
                 <p className="text-purple-200 italic leading-relaxed">
                   "I am always open to discussing new projects, creative ideas or opportunities to be part of your visions."
                 </p>
               </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-purple-600 dark:focus:border-purple-500 outline-none transition-all dark:text-white shadow-inner"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-purple-600 dark:focus:border-purple-500 outline-none transition-all dark:text-white shadow-inner"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 text-gray-400" size={20} />
                <textarea
                  required
                  rows="5"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-purple-600 dark:focus:border-purple-500 outline-none transition-all dark:text-white shadow-inner"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-3 overflow-hidden relative group ${
                  status === 'success' ? 'bg-green-500' : 'bg-gradient-to-r from-purple-600 to-pink-500'
                }`}
              >
                {status === 'sending' ? (
                  <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                ) : status === 'success' ? (
                  <>Success <CheckCircle size={22} /></>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </>
                )}
              </button>

              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center text-sm font-medium"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
