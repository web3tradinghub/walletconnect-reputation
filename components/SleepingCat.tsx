"use client";

import { motion } from "framer-motion";

export default function SleepingCat() {
  return (
    <div style={{ width: "250px", height: "auto", position: "relative" }}>
      <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clouds */}
        <g id="clouds">
          <ellipse cx="140" cy="180" rx="60" ry="40" fill="#C4B5FD" />
          <ellipse cx="220" cy="190" rx="70" ry="45" fill="#C4B5FD" />
          <ellipse cx="290" cy="175" rx="50" ry="35" fill="#C4B5FD" />
          <ellipse cx="200" cy="150" rx="60" ry="40" fill="#C4B5FD" />
          <ellipse cx="260" cy="140" rx="50" ry="30" fill="#C4B5FD" />
          <ellipse cx="160" cy="130" rx="40" ry="25" fill="#C4B5FD" />
        </g>

        {/* Sleeping Cat */}
        <g id="cat">
          <path d="M260 120 C290 120, 310 140, 310 160 C310 180, 290 190, 260 190 L180 190 C150 190, 130 170, 130 150 C130 130, 150 110, 180 110 C190 100, 230 100, 260 120 Z" fill="#8B5CF6" />
          <circle cx="180" cy="135" r="35" fill="#8B5CF6" />
          <path d="M155 115 L145 90 L170 110 Z" fill="#8B5CF6" />
          <path d="M205 115 L215 90 L190 110 Z" fill="#8B5CF6" />
          <path d="M158 112 L150 98 L166 108 Z" fill="#A78BFA" />
          <path d="M202 112 L210 98 L194 108 Z" fill="#A78BFA" />
          <path d="M165 135 Q175 140, 185 135" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          <path d="M190 135 Q200 140, 210 135" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="187.5" cy="145" rx="5" ry="3" fill="#4C1D95" />
          <path d="M310 160 Q330 160, 330 180 Q330 210, 300 220 L280 225" stroke="#8B5CF6" strokeWidth="20" strokeLinecap="round" fill="none" />
        </g>

        {/* Animated Stars */}
        <g id="stars">
          <motion.path 
            d="M100 80 L105 95 L120 100 L105 105 L100 120 L95 105 L80 100 L95 95 Z" 
            fill="#A78BFA" 
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
            transition={{ duration: 2, repeat: Infinity }} 
          />
          <motion.path 
            d="M350 60 L355 75 L370 80 L355 85 L350 100 L345 85 L330 80 L345 75 Z" 
            fill="#A78BFA" 
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} 
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} 
          />
        </g>
      </svg>
      <div style={{ textAlign: "center", marginTop: "-20px" }}>
        <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Meoww</h3>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "5px" }}>Oopsie daisy! Furry has taken a nap.</p>
      </div>
    </div>
  );
}