export const HeroSVG = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="250" cy="250" r="200" fill="#FCE4E8" opacity="0.3"/>
    <circle cx="250" cy="250" r="150" fill="#F8C8D0" opacity="0.2"/>
    
    {/* Main Ice Cream */}
    <path d="M250 100C220 100 195 118 185 145C175 172 185 195 195 210L205 240C207 244 210 246 215 246H285C290 246 293 244 295 240L305 210C315 195 325 172 315 145C305 118 280 100 250 100Z" fill="#F0A8B5" stroke="#D4697A" strokeWidth="3"/>
    <path d="M265 246V270H235V246" stroke="#D4697A" strokeWidth="3" strokeLinecap="round"/>
    
    {/* Sprinkles */}
    <rect x="220" y="130" width="8" height="4" rx="2" fill="#FF6B6B" transform="rotate(-30 220 130)"/>
    <rect x="260" y="120" width="8" height="4" rx="2" fill="#FFD93D" transform="rotate(20 260 120)"/>
    <rect x="240" y="140" width="8" height="4" rx="2" fill="#6BCB77" transform="rotate(45 240 140)"/>
    <rect x="280" y="145" width="8" height="4" rx="2" fill="#4D96FF" transform="rotate(-15 280 145)"/>
    <rect x="200" y="155" width="8" height="4" rx="2" fill="#FF6B6B" transform="rotate(60 200 155)"/>
    
    {/* Eyes */}
    <circle cx="230" cy="165" r="8" fill="#4A2C2C"/>
    <circle cx="270" cy="165" r="8" fill="#4A2C2C"/>
    <circle cx="228" cy="163" r="3" fill="white"/>
    <circle cx="268" cy="163" r="3" fill="white"/>
    
    {/* Mouth */}
    <path d="M235 185C240 192 260 192 265 185" stroke="#4A2C2C" strokeWidth="3" strokeLinecap="round"/>
    
    {/* Blush */}
    <circle cx="215" cy="180" r="12" fill="#FF6B6B" opacity="0.2"/>
    <circle cx="285" cy="180" r="12" fill="#FF6B6B" opacity="0.2"/>
    
    {/* Decorations */}
    <circle cx="150" cy="150" r="4" fill="#D4697A" opacity="0.3"/>
    <circle cx="350" cy="150" r="4" fill="#D4697A" opacity="0.3"/>
    <circle cx="120" cy="250" r="4" fill="#D4697A" opacity="0.3"/>
    <circle cx="380" cy="250" r="4" fill="#D4697A" opacity="0.3"/>
    <circle cx="150" cy="350" r="4" fill="#D4697A" opacity="0.3"/>
    <circle cx="350" cy="350" r="4" fill="#D4697A" opacity="0.3"/>
  </svg>
);