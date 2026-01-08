"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";

const socials = [
  { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/nidarath" },
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/nidarath/" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("nidarzx@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-[89vh] w-full bg-white py-20 px-6 md:px-20 overflow-hidden relative">
      
      {/* background */}
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
            contact<span className="text-[#79ABBD]">.</span>me
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          
          {/* description */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              I&apos;m currently looking for new opportunities. Whether you have a question, 
              a project idea, or just want to say hi, my inbox is always open!
            </p>

            {/* socials */}
            <div>
              <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-[#79ABBD] inline-block"></span> find me online
              </h4>
              <div className="flex flex-wrap gap-3">
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
            </div>
          </motion.div>

          {/* right column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center gap-4"
          >
            
            {/* copy button */}
            <motion.div
              onClick={copyEmail}
              whileHover={{ y: -5, boxShadow: "8px 8px 0px 0px #79ABBD" }} 
              whileTap={{ scale: 0.98, boxShadow: "0px 0px 0px 0px #79ABBD" }}
              className="group relative bg-white border-2 border-black rounded-3xl p-8 cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transition-all flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className={`p-4 rounded-full border-2 border-black transition-colors ${copied ? 'bg-green-100' : 'bg-[#79ABBD]'}`}>
                    {copied ? <Check size={32} className="text-black" /> : <Mail size={32} className="text-black" />}
                </div>
                
                <span className={`text-sm font-bold uppercase tracking-wider border-2 border-black px-3 py-1 rounded-full ${copied ? 'bg-green-100 text-black' : 'bg-gray-100 text-gray-500'}`}>
                  {copied ? "Copied!" : "Click to Copy"}
                </span>
              </div>
              
              <div>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-wide mb-1">Drop me a message at</p>
                <h3 className="text-2xl md:text-3xl font-black text-black group-hover:text-[#79ABBD] transition-colors break-all">
                  nidarzx@gmail.com
                </h3>
              </div>

              <div className="flex items-center gap-2 text-gray-400 group-hover:text-black transition-colors font-medium text-sm">
                <Copy size={16} /> 
                {copied ? "Address copied to clipboard" : "Copy email address"}
              </div>
            </motion.div>

            {/* email me now*/}
            <div className="flex justify-end">
                <a 
                  href="mailto:nidarzx@gmail.com"
                  className="text-sm font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
                >
                  or open mail app <ArrowUpRight size={14} />
                </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}