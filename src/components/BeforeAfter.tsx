export default function BeforeAfter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* マグカップ */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-2 relative">
          {/* Before */}
          <div className="bg-gray-50 p-4 flex flex-col items-center justify-center min-h-[200px]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Phone frame */}
              <rect x="25" y="5" width="50" height="90" rx="8" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
              <rect x="29" y="15" width="42" height="65" rx="2" fill="#f3f4f6"/>
              {/* Pet silhouette on phone screen */}
              <ellipse cx="50" cy="40" rx="12" ry="10" fill="#d4956a" opacity="0.4"/>
              <circle cx="50" cy="32" r="8" fill="#d4956a" opacity="0.4"/>
              <ellipse cx="44" cy="28" rx="3" ry="5" fill="#d4956a" opacity="0.4" transform="rotate(-15 44 28)"/>
              <ellipse cx="56" cy="28" rx="3" ry="5" fill="#d4956a" opacity="0.4" transform="rotate(15 56 28)"/>
              {/* Camera icon */}
              <circle cx="50" cy="60" r="6" fill="#9ca3af"/>
              <rect x="42" y="55" width="16" height="10" rx="2" fill="#9ca3af"/>
              <circle cx="50" cy="60" r="3" fill="#d1d5db"/>
              {/* Phone button */}
              <circle cx="50" cy="88" r="3" fill="#d1d5db"/>
            </svg>
            <p className="text-xs text-foreground/40 font-medium mt-2 tracking-wider">BEFORE</p>
          </div>
          {/* After */}
          <div className="bg-primary/5 p-4 flex flex-col items-center justify-center min-h-[200px]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Mug body */}
              <rect x="20" y="25" width="45" height="50" rx="4" fill="white" stroke="#e8a87c" strokeWidth="2"/>
              {/* Mug handle */}
              <path d="M65 38 C78 38, 78 62, 65 62" fill="none" stroke="#e8a87c" strokeWidth="2"/>
              {/* Mug bottom */}
              <ellipse cx="42" cy="75" rx="23" ry="3" fill="#e8a87c" opacity="0.3"/>
              {/* Pet face on mug */}
              <circle cx="42" cy="45" r="10" fill="#e8a87c" opacity="0.3"/>
              <circle cx="42" cy="42" r="8" fill="#d4956a" opacity="0.4"/>
              <ellipse cx="37" cy="38" rx="2.5" ry="4" fill="#d4956a" opacity="0.4" transform="rotate(-15 37 38)"/>
              <ellipse cx="47" cy="38" rx="2.5" ry="4" fill="#d4956a" opacity="0.4" transform="rotate(15 47 38)"/>
              {/* Eyes */}
              <circle cx="39" cy="42" r="1.5" fill="#4a3728"/>
              <circle cx="45" cy="42" r="1.5" fill="#4a3728"/>
              {/* Nose */}
              <ellipse cx="42" cy="45" rx="1.5" ry="1" fill="#4a3728"/>
              {/* Frame decoration */}
              <circle cx="42" cy="43" r="13" fill="none" stroke="#e8a87c" strokeWidth="1" strokeDasharray="2 2"/>
              {/* Sparkle */}
              <path d="M72 18 L74 24 L80 26 L74 28 L72 34 L70 28 L64 26 L70 24Z" fill="#e8a87c" opacity="0.6"/>
              <path d="M25 15 L26 18 L29 19 L26 20 L25 23 L24 20 L21 19 L24 18Z" fill="#e8a87c" opacity="0.4"/>
            </svg>
            <p className="text-xs text-primary-dark font-medium mt-2 tracking-wider">AFTER</p>
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#e8a87c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="p-5 text-center">
          <h3 className="font-bold text-lg mb-1">マグカップ</h3>
          <p className="text-xs text-foreground/50 leading-relaxed">
            スマホの写真を切り抜き&フレーム合成で完成
          </p>
        </div>
      </div>

      {/* クッション */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-2 relative">
          <div className="bg-gray-50 p-4 flex flex-col items-center justify-center min-h-[200px]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Photo frame */}
              <rect x="15" y="15" width="70" height="55" rx="3" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
              {/* Pet body silhouette */}
              <ellipse cx="50" cy="50" rx="18" ry="14" fill="#6c5b7b" opacity="0.2"/>
              <circle cx="50" cy="36" r="10" fill="#6c5b7b" opacity="0.25"/>
              <ellipse cx="43" cy="30" rx="3.5" ry="6" fill="#6c5b7b" opacity="0.25" transform="rotate(-20 43 30)"/>
              <ellipse cx="57" cy="30" rx="3.5" ry="6" fill="#6c5b7b" opacity="0.25" transform="rotate(20 57 30)"/>
              {/* Eyes */}
              <circle cx="46" cy="36" r="2" fill="#6c5b7b" opacity="0.4"/>
              <circle cx="54" cy="36" r="2" fill="#6c5b7b" opacity="0.4"/>
              {/* Background elements */}
              <circle cx="25" cy="60" r="3" fill="#d1d5db" opacity="0.5"/>
              <circle cx="75" cy="25" r="2" fill="#d1d5db" opacity="0.5"/>
              {/* Heart */}
              <path d="M72 62 C72 59, 76 59, 76 62 C76 65, 72 68, 72 68 C72 68, 68 65, 68 62 C68 59, 72 59, 72 62Z" fill="#e8a87c" opacity="0.4"/>
              {/* Label */}
              <rect x="30" y="74" width="40" height="10" rx="2" fill="#e5e7eb"/>
              <text x="50" y="82" textAnchor="middle" fontSize="6" fill="#9ca3af">BEST SHOT</text>
            </svg>
            <p className="text-xs text-foreground/40 font-medium mt-2 tracking-wider">BEFORE</p>
          </div>
          <div className="bg-accent/5 p-4 flex flex-col items-center justify-center min-h-[200px]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cushion outline - pet shape (die-cut) */}
              <path d="M50 15 C42 10, 30 15, 28 25 C25 20, 15 22, 18 30 C12 35, 15 50, 22 55 C20 60, 22 75, 30 78 C35 85, 45 88, 50 85 C55 88, 65 85, 70 78 C78 75, 80 60, 78 55 C85 50, 88 35, 82 30 C85 22, 75 20, 72 25 C70 15, 58 10, 50 15Z" fill="#6c5b7b" opacity="0.15" stroke="#6c5b7b" strokeWidth="1.5"/>
              {/* Face details */}
              <circle cx="50" cy="42" r="12" fill="#6c5b7b" opacity="0.1"/>
              <ellipse cx="42" cy="33" rx="4" ry="7" fill="#6c5b7b" opacity="0.15" transform="rotate(-15 42 33)"/>
              <ellipse cx="58" cy="33" rx="4" ry="7" fill="#6c5b7b" opacity="0.15" transform="rotate(15 58 33)"/>
              {/* Eyes */}
              <circle cx="45" cy="42" r="2.5" fill="#4a3728"/>
              <circle cx="55" cy="42" r="2.5" fill="#4a3728"/>
              <circle cx="46" cy="41" r="1" fill="white"/>
              <circle cx="56" cy="41" r="1" fill="white"/>
              {/* Nose */}
              <ellipse cx="50" cy="47" rx="2" ry="1.5" fill="#4a3728"/>
              {/* Mouth */}
              <path d="M48 49 C48 51, 50 52, 50 52 C50 52, 52 51, 52 49" fill="none" stroke="#4a3728" strokeWidth="0.8"/>
              {/* 3D cushion effect - shadow */}
              <path d="M30 80 C35 87, 45 90, 50 87 C55 90, 65 87, 70 80" fill="none" stroke="#6c5b7b" strokeWidth="1" opacity="0.3"/>
              {/* Sparkle */}
              <path d="M82 15 L84 20 L89 22 L84 24 L82 29 L80 24 L75 22 L80 20Z" fill="#6c5b7b" opacity="0.4"/>
              <path d="M15 70 L16 73 L19 74 L16 75 L15 78 L14 75 L11 74 L14 73Z" fill="#6c5b7b" opacity="0.3"/>
            </svg>
            <p className="text-xs text-accent font-medium mt-2 tracking-wider">AFTER</p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#6c5b7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="p-5 text-center">
          <h3 className="font-bold text-lg mb-1">クッション</h3>
          <p className="text-xs text-foreground/50 leading-relaxed">
            ベストショットをダイカットで立体クッションに
          </p>
        </div>
      </div>

      {/* 迷子札 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-2 relative">
          <div className="bg-gray-50 p-4 flex flex-col items-center justify-center min-h-[200px]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Camera viewfinder */}
              <rect x="15" y="20" width="70" height="60" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
              {/* Viewfinder corners */}
              <path d="M25 30 L25 25 L30 25" fill="none" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M75 30 L75 25 L70 25" fill="none" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M25 70 L25 75 L30 75" fill="none" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M75 70 L75 75 L70 75" fill="none" stroke="#9ca3af" strokeWidth="1.5"/>
              {/* Pet face - front view */}
              <circle cx="50" cy="48" r="14" fill="#d4956a" opacity="0.3"/>
              <ellipse cx="41" cy="38" rx="4" ry="7" fill="#d4956a" opacity="0.3" transform="rotate(-15 41 38)"/>
              <ellipse cx="59" cy="38" rx="4" ry="7" fill="#d4956a" opacity="0.3" transform="rotate(15 59 38)"/>
              {/* Eyes */}
              <circle cx="45" cy="46" r="2.5" fill="#4a3728" opacity="0.6"/>
              <circle cx="55" cy="46" r="2.5" fill="#4a3728" opacity="0.6"/>
              {/* Nose */}
              <ellipse cx="50" cy="51" rx="2" ry="1.5" fill="#4a3728" opacity="0.6"/>
              {/* Focus target */}
              <circle cx="50" cy="48" r="8" fill="none" stroke="#e8a87c" strokeWidth="1" opacity="0.6"/>
              <line x1="50" y1="38" x2="50" y2="42" stroke="#e8a87c" strokeWidth="1" opacity="0.6"/>
              <line x1="50" y1="54" x2="50" y2="58" stroke="#e8a87c" strokeWidth="1" opacity="0.6"/>
              <line x1="40" y1="48" x2="44" y2="48" stroke="#e8a87c" strokeWidth="1" opacity="0.6"/>
              <line x1="56" y1="48" x2="60" y2="48" stroke="#e8a87c" strokeWidth="1" opacity="0.6"/>
              {/* REC indicator */}
              <circle cx="73" cy="28" r="3" fill="#ef4444" opacity="0.6"/>
            </svg>
            <p className="text-xs text-foreground/40 font-medium mt-2 tracking-wider">BEFORE</p>
          </div>
          <div className="bg-primary-dark/5 p-4 flex flex-col items-center justify-center min-h-[200px]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Ring */}
              <circle cx="50" cy="12" r="5" fill="none" stroke="#b8b8b8" strokeWidth="2"/>
              {/* Chain links */}
              <ellipse cx="50" cy="7" rx="3" ry="2" fill="none" stroke="#b8b8b8" strokeWidth="1.5"/>
              {/* Tag bone shape */}
              <path d="M25 35 C20 30, 20 25, 25 22 C28 19, 32 20, 33 23 L67 23 C68 20, 72 19, 75 22 C80 25, 80 30, 75 35 L75 65 C80 70, 80 75, 75 78 C72 81, 68 80, 67 77 L33 77 C32 80, 28 81, 25 78 C20 75, 20 70, 25 65Z" fill="#e8e0d8" stroke="#d4956a" strokeWidth="1.5"/>
              {/* Metallic shine */}
              <path d="M30 30 C35 28, 65 28, 70 30" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
              {/* Pet face on tag */}
              <circle cx="50" cy="45" r="10" fill="#d4956a" opacity="0.3"/>
              <ellipse cx="44" cy="38" rx="3" ry="5" fill="#d4956a" opacity="0.3" transform="rotate(-15 44 38)"/>
              <ellipse cx="56" cy="38" rx="3" ry="5" fill="#d4956a" opacity="0.3" transform="rotate(15 56 38)"/>
              <circle cx="46" cy="44" r="1.5" fill="#4a3728"/>
              <circle cx="54" cy="44" r="1.5" fill="#4a3728"/>
              <ellipse cx="50" cy="48" rx="1.5" ry="1" fill="#4a3728"/>
              {/* Text lines on tag */}
              <rect x="36" y="58" width="28" height="3" rx="1" fill="#d4956a" opacity="0.3"/>
              <rect x="40" y="64" width="20" height="2" rx="1" fill="#d4956a" opacity="0.2"/>
              <rect x="42" y="69" width="16" height="2" rx="1" fill="#d4956a" opacity="0.15"/>
              {/* Sparkle */}
              <path d="M80 35 L82 40 L87 42 L82 44 L80 49 L78 44 L73 42 L78 40Z" fill="#d4956a" opacity="0.5"/>
              <path d="M18 55 L19 58 L22 59 L19 60 L18 63 L17 60 L14 59 L17 58Z" fill="#d4956a" opacity="0.3"/>
            </svg>
            <p className="text-xs text-primary-dark font-medium mt-2 tracking-wider">AFTER</p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#d4956a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="p-5 text-center">
          <h3 className="font-bold text-lg mb-1">迷子札</h3>
          <p className="text-xs text-foreground/50 leading-relaxed">
            正面顔の写真をUV印刷でステンレスに鮮やか再現
          </p>
        </div>
      </div>
    </div>
  );
}
