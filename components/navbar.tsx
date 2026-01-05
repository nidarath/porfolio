"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "hero", label: "start" },
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];

export default function Navbar() {
    
    const [activeSection, setActiveSection] = useState("hero");    useEffect(() => {
    const handleScroll = () => {
    const sections = navItems.map((item) => document.getElementById(item.id));
    const scrollPosition = window.scrollY + 200; // Offset for better triggering

    sections.forEach((section) => {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
        setActiveSection(section.id);
        }
    });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-10 left-10 z-50 hidden md:block">
        <ul className="flex flex-col gap-2 text-sm text-gray-400 font-medium">
            {navItems.map((item, index) => (
            <li
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="cursor-pointer flex items-center gap-2 group transition-colors"
            >
                <span
                className={`transition-all duration-300 ${
                    activeSection === item.id ? "text-black font-black scale-110" : "group-hover:text-black"
                }`}
                >
                {index + 1}. {item.label}.
                </span>
                
                {activeSection === item.id && (
                <motion.div
                    layoutId="activeDot"
                    className="w-1.5 h-1.5 rounded-full bg-rose-500"
                />
                )}
            </li>
            ))}
        </ul>
        </nav>
    );
    }