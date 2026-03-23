"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    title: "うちの子を\n世界にひとつのマグカップに",
    subtitle: "お名前入りフレームで特別感たっぷり。毎日使うものだからこそ、うちの子と一緒に。",
    bg: "bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c0]",
    accent: "#e8a87c",
    image: "/images/hero/slide1.png",
    fallbackLabel: "マグカップ",
    fallbackEmoji: "☕",
  },
  {
    id: 2,
    title: "抱きしめたくなる\nうちの子クッション",
    subtitle: "ダイカットで立体的に再現。ソファに置くだけで癒しの空間に。",
    bg: "bg-gradient-to-br from-[#f5ebe0] to-[#e8ddd0]",
    accent: "#d4956a",
    image: "/images/hero/slide2.png",
    fallbackLabel: "クッション",
    fallbackEmoji: "🛋️",
  },
  {
    id: 3,
    title: "もしもの時の安心を\nうちの子迷子札",
    subtitle: "骨型ステンレスにUV印刷。かわいいだけじゃない、大切な子を守るアイテム。",
    bg: "bg-gradient-to-br from-[#f0e6dc] to-[#e5d6c8]",
    accent: "#c4956a",
    image: "/images/hero/slide3.png",
    fallbackLabel: "迷子札",
    fallbackEmoji: "🏷️",
  },
  {
    id: 4,
    title: "ペアルックで\n可愛いお揃い",
    subtitle: "わんちゃんとお揃いのオリジナルデザイン。お散歩がもっと楽しくなる。",
    bg: "bg-gradient-to-br from-[#e8e0f0] to-[#d9cde6]",
    accent: "#8b7a9e",
    image: "/images/hero/slide4.png",
    fallbackLabel: "ペアルック",
    fallbackEmoji: "👕",
  },
  {
    id: 5,
    title: "毎月届く新デザイン\n季節のフレーム",
    subtitle: "季節やイベントに合わせた限定フレームを毎月追加",
    bg: "bg-gradient-to-br from-[#e0ecd8] to-[#d0dfc6]",
    accent: "#7a9e6a",
    image: "/images/hero/slide5.png",
    fallbackLabel: "フレーム",
    fallbackEmoji: "🖼️",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [hasImages, setHasImages] = useState<Record<number, boolean>>({});

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="relative min-h-[500px] md:min-h-[600px]">
      {/* Background layers for all slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 ${s.bg} transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[400px] md:min-h-[480px]">
          {/* Left: Text */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="text-primary-dark font-medium mb-4 tracking-widest text-sm">
              ペットのオリジナルグッズ専門店
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {slide.title.split("\n").map((line, j) => (
                <span key={j}>
                  {j === 0 ? (
                    <span className="text-foreground">{line}</span>
                  ) : (
                    <span className="text-foreground">{line}</span>
                  )}
                  {j < slide.title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
              {slide.subtitle}
            </p>
          </div>

          {/* Right: Image or Placeholder */}
          <div className="order-1 md:order-2 flex justify-center items-center">
            <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Fallback placeholder (shown by default) */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hasImages[current] === true ? "opacity-0" : "opacity-100"
                }`}
                style={{ backgroundColor: `${slide.accent}20` }}
              >
                <span className="text-7xl md:text-8xl mb-4">{slide.fallbackEmoji}</span>
                <p className="text-xl font-bold" style={{ color: slide.accent }}>
                  {slide.fallbackLabel}
                </p>
                <p className="text-xs text-foreground/40 mt-2">
                  画像準備中
                </p>
              </div>
              {/* Real image (loads on top if exists) */}
              <Image
                src={slide.image}
                alt={slide.fallbackLabel}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  hasImages[current] === true ? "opacity-100" : "opacity-0"
                }`}
                priority={current === 0}
                onLoad={() =>
                  setHasImages((prev) => ({ ...prev, [current]: true }))
                }
                onError={() =>
                  setHasImages((prev) => ({ ...prev, [current]: false }))
                }
              />
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-10"
                  : "w-2.5 hover:bg-foreground/30"
              }`}
              style={{
                backgroundColor: i === current ? slide.accent : "rgba(0,0,0,0.15)",
              }}
              aria-label={s.fallbackLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
