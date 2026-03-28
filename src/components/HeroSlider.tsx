"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    title: "うちの子を\n世界にひとつのマグカップに",
    subtitle: "お名前入りフレームで特別感たっぷり。毎日使うものだからこそ、うちの子と一緒に。",
    image: "/images/hero/slide1.png",
    fallbackLabel: "マグカップ",
  },
  {
    id: 2,
    title: "抱きしめたくなる\nうちの子クッション",
    subtitle: "ダイカットで立体的に再現。ソファに置くだけで癒しの空間に。",
    image: "/images/hero/slide2.png",
    fallbackLabel: "クッション",
  },
  {
    id: 3,
    title: "もしもの時の安心を\nうちの子迷子札",
    subtitle: "骨型ステンレスにUV印刷。かわいいだけじゃない、大切な子を守るアイテム。",
    image: "/images/hero/slide3.png",
    fallbackLabel: "迷子札",
  },
  {
    id: 4,
    title: "ペアルックで\n可愛いお揃い",
    subtitle: "わんちゃんとお揃いのオリジナルデザイン。お散歩がもっと楽しくなる。",
    image: "/images/hero/slide4.png",
    fallbackLabel: "ペアルック",
  },
  {
    id: 5,
    title: "季節ごとに新しい\nオリジナルフレーム",
    subtitle: "桜・ひまわり・クリスマス…うちの子の写真に、季節の彩りをプラス。毎月新デザインが登場。",
    image: "/images/hero/slide5.png",
    fallbackLabel: "季節のフレーム",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="relative h-[65vh] min-h-[420px] max-h-[720px] overflow-hidden bg-[#1a1a1a]">
      {/* Full-bleed background images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.fallbackLabel}
            fill
            className="object-contain"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Text content */}
      <div className="relative h-full flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <p className="text-white/70 font-medium mb-3 tracking-widest text-xs md:text-sm">
            ペットのオリジナルグッズ専門店
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
            {slide.title.split("\n").map((line, j) => (
              <span key={j}>
                {line}
                {j < slide.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-sm md:text-lg text-white/80 leading-relaxed max-w-xl drop-shadow">
            {slide.subtitle}
          </p>

          {/* Dots */}
          <div className="flex gap-3 mt-8">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-10 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={s.fallbackLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
