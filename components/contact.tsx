"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, Copy, Check } from "lucide-react";

const socials = [
  { icon: <Github size={20} />, label: "GitHub", href: "https://github.com" },
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: <Twitter size={20} />, label: "Twitter", href: "https://twitter.com" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("nidarzx@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-screen w-full bg-white py-20 px-6 md:px-20 overflow-hidden relative border-t-2 border-gray-100">
      
      {/* dot background */}
      <div className="absolute inset-0 opacity-[0.12]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl font-light text-gray-200 md:text-6xl select-none">
            say hello.
          </h2>
          <h3 className="text-4xl font-black tracking-tighter text-black md:text-5xl -mt-4 md:-mt-8 ml-2">
            contact<span className="text-rose-500">.</span>me
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* info + socials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m currently looking for new opportunities. Whether you have a question, 
                a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>

            {/* email copy box */}
            <div 
              onClick={copyEmail}
              className="group cursor-pointer border-2 bg-white border-black rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black text-white rounded-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mail me at</p>
                  <p className="text-lg font-bold">nidarzx@gmail.com</p>
                </div>
              </div>
              <div className="text-gray-400 group-hover:text-rose-500">
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </div>
            </div>

            {/* social links */}
            <div className="flex flex-wrap gap-4">
              {socials.map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white px-5 py-3 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:border-black hover:text-black hover:scale-105 transition-all"
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* the form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
          >
            <form className="space-y-6">
              
              {/* name imput */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold ml-1">Name</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your name"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
                />
              </div>

              {/* email input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold ml-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"
                />
              </div>

              {/* message input */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold ml-1">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Say Hello!"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-black focus:bg-white transition-all resize-none placeholder:text-gray-300"
                />
              </div>

              {/* submit */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "4px 4px 0px 0px #FDA4AF" }} 
                whileTap={{ scale: 0.98, boxShadow: "0px 0px 0px 0px #FDA4AF" }}
                className="w-full bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#000] border-2 border-black transition-all"
              >
                Send Message <Send size={18} />
              </motion.button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}