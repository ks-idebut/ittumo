function GoodPhotoExample() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Photo frame */}
      <rect x="10" y="10" width="100" height="100" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="2"/>
      {/* Sun (natural light) */}
      <circle cx="90" cy="25" r="8" fill="#fbbf24" opacity="0.6"/>
      <line x1="90" y1="13" x2="90" y2="17" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
      <line x1="90" y1="33" x2="90" y2="37" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
      <line x1="78" y1="25" x2="82" y2="25" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
      <line x1="98" y1="25" x2="102" y2="25" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
      {/* Simple background */}
      <rect x="15" y="45" width="90" height="60" rx="2" fill="#fafafa"/>
      {/* Dog face - clear, front-facing, well-lit */}
      <circle cx="60" cy="65" r="18" fill="#e8a87c" opacity="0.5"/>
      <ellipse cx="50" cy="52" rx="5" ry="9" fill="#d4956a" opacity="0.4" transform="rotate(-15 50 52)"/>
      <ellipse cx="70" cy="52" rx="5" ry="9" fill="#d4956a" opacity="0.4" transform="rotate(15 70 52)"/>
      {/* Clear eyes */}
      <circle cx="54" cy="62" r="3.5" fill="#4a3728"/>
      <circle cx="66" cy="62" r="3.5" fill="#4a3728"/>
      <circle cx="55.5" cy="61" r="1.5" fill="white"/>
      <circle cx="67.5" cy="61" r="1.5" fill="white"/>
      {/* Nose */}
      <ellipse cx="60" cy="70" rx="3" ry="2" fill="#4a3728"/>
      {/* Smile */}
      <path d="M55 73 C55 76, 60 78, 60 78 C60 78, 65 76, 65 73" fill="none" stroke="#4a3728" strokeWidth="1.2"/>
      {/* Check mark */}
      <circle cx="95" cy="95" r="10" fill="#22c55e"/>
      <path d="M89 95 L93 99 L101 91" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BadPhotoExample() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Photo frame */}
      <rect x="10" y="10" width="100" height="100" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2"/>
      {/* Dark overlay (bad lighting) */}
      <rect x="10" y="10" width="50" height="100" rx="8" fill="#1a1a1a" opacity="0.15"/>
      {/* Dog face - blurry, backlit, too small */}
      <circle cx="60" cy="65" r="10" fill="#a0a0a0" opacity="0.3"/>
      <ellipse cx="55" cy="59" rx="3" ry="5" fill="#a0a0a0" opacity="0.25" transform="rotate(-15 55 59)"/>
      <ellipse cx="65" cy="59" rx="3" ry="5" fill="#a0a0a0" opacity="0.25" transform="rotate(15 65 59)"/>
      {/* Blurry eyes - just dots */}
      <circle cx="57" cy="64" r="1.5" fill="#666" opacity="0.4"/>
      <circle cx="63" cy="64" r="1.5" fill="#666" opacity="0.4"/>
      {/* Blur lines (motion blur) */}
      <line x1="45" y1="55" x2="48" y2="55" stroke="#999" strokeWidth="0.8" opacity="0.3"/>
      <line x1="72" y1="60" x2="75" y2="60" stroke="#999" strokeWidth="0.8" opacity="0.3"/>
      <line x1="46" y1="70" x2="49" y2="70" stroke="#999" strokeWidth="0.8" opacity="0.3"/>
      <line x1="71" y1="68" x2="74" y2="68" stroke="#999" strokeWidth="0.8" opacity="0.3"/>
      {/* Filter effect (rainbow) */}
      <path d="M80 20 C85 25, 95 30, 100 40" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.3"/>
      <path d="M82 20 C87 25, 97 30, 102 40" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3"/>
      {/* Backlight glare */}
      <circle cx="85" cy="30" r="12" fill="white" opacity="0.3"/>
      {/* X mark */}
      <circle cx="95" cy="95" r="10" fill="#ef4444"/>
      <path d="M90 90 L100 100M100 90 L90 100" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function PhotoGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Good examples */}
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
        <h3 className="font-bold text-green-700 text-lg mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">○</span>
          良い写真
        </h3>
        <div className="flex justify-center mb-5">
          <GoodPhotoExample />
        </div>
        <ul className="space-y-3">
          {[
            { tip: "自然光で撮影", desc: "窓際や屋外など、明るい場所で" },
            { tip: "正面からの顔がはっきり", desc: "お顔がしっかり見える角度で" },
            { tip: "ピントが合っている", desc: "ブレのないシャープな1枚を" },
            { tip: "背景がシンプル", desc: "切り抜きがきれいに仕上がります" },
          ].map((item) => (
            <li key={item.tip} className="flex gap-3">
              <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
              <div>
                <p className="font-medium text-sm">{item.tip}</p>
                <p className="text-xs text-foreground/50">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Bad examples */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <h3 className="font-bold text-red-600 text-lg mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-red-400 text-white flex items-center justify-center text-sm">✕</span>
          避けたい写真
        </h3>
        <div className="flex justify-center mb-5">
          <BadPhotoExample />
        </div>
        <ul className="space-y-3">
          {[
            { tip: "暗い・逆光", desc: "顔が影になると再現が難しくなります" },
            { tip: "ブレ・ピンボケ", desc: "細部が不鮮明だと仕上がりに影響" },
            { tip: "顔が小さすぎる", desc: "全身の引きすぎた写真はNG" },
            { tip: "加工フィルター済み", desc: "元の色味がわかる写真がベスト" },
          ].map((item) => (
            <li key={item.tip} className="flex gap-3">
              <span className="text-red-400 font-bold mt-0.5 shrink-0">✕</span>
              <div>
                <p className="font-medium text-sm">{item.tip}</p>
                <p className="text-xs text-foreground/50">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
