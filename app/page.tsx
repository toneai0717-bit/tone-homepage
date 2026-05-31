"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── データ定義 ────────────────────────────────────────────
const SERVICES = [
  {
    icon: "🏠",
    title: "内装工事",
    desc: "壁紙・床・天井など、室内全般のリフォームに対応。素材選びからご提案します。",
  },
  {
    icon: "🏗️",
    title: "外装工事",
    desc: "外壁塗装・屋根修繕・防水工事など、建物の外観を美しく長持ちさせます。",
  },
  {
    icon: "🚿",
    title: "水回りリフォーム",
    desc: "キッチン・浴室・トイレのリフォームで、毎日の暮らしをより快適に。",
  },
  {
    icon: "🔨",
    title: "総合リフォーム",
    desc: "小規模修繕から大規模改修まで。お客様のご要望に幅広くお応えします。",
  },
];

const WORKS = [
  { label: "リビングリフォーム", color: "bg-amber-100" },
  { label: "外壁塗装", color: "bg-stone-200" },
  { label: "キッチン改装", color: "bg-amber-200" },
  { label: "浴室リフォーム", color: "bg-stone-300" },
  { label: "屋根修繕", color: "bg-amber-300" },
  { label: "フルリノベーション", color: "bg-stone-200" },
];

// ── フック ────────────────────────────────────────────────
function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function useSlideshow(length: number, interval = 4000) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    setAnimating(false);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(true);
    }, 50);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % length);
    }, interval);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, length, interval]);

  return { current, goTo, animating };
}

// ── メインコンポーネント ──────────────────────────────────
export default function Home() {
  useFadeUp();
  const scrolled = useHeaderScroll();
  const { current, goTo, animating } = useSlideshow(WORKS.length);

  return (
    <div className="min-h-screen">
      {/* ── ヘッダー ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-stone-50/95 backdrop-blur-sm header-scrolled" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-stone-800 tracking-tight">
            株式会社<span className="text-amber-700">戸根</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#services" className="hover:text-amber-700 transition-colors">事業内容</a>
            <a href="#works" className="hover:text-amber-700 transition-colors">施工例</a>
            <a href="#about" className="hover:text-amber-700 transition-colors">会社概要</a>
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-amber-700 text-white hover:bg-amber-600 transition-colors text-sm font-bold"
            >
              お問い合わせ
            </a>
          </nav>
          <a
            href="#contact"
            className="md:hidden px-4 py-2 rounded-full bg-amber-700 text-white text-xs font-bold"
          >
            相談する
          </a>
        </div>
      </header>

      {/* ── ヒーロー ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #d97706 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #92400e 0%, transparent 40%)`,
          }}
        />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <p className="text-amber-700 font-bold text-sm tracking-widest mb-4 fade-up">
            創業50年 ── 地域に寄り添う工務店
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-stone-800 leading-tight mb-6 fade-up fade-up-delay-1">
            住まいの<span className="text-amber-700">困った</span>を、
            <br />すぐに解決。
          </h1>
          <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-10 fade-up fade-up-delay-2">
            内装・外装・水回りリフォームまで、<br className="md:hidden" />
            丁寧な仕事でお客様の暮らしを守ります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up fade-up-delay-3">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-amber-700 text-white font-bold text-base hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5"
            >
              無料相談はこちら →
            </a>
            <a
              href="#works"
              className="px-8 py-4 rounded-full border-2 border-stone-400 text-stone-700 font-bold text-base hover:border-amber-700 hover:text-amber-700 transition-colors"
            >
              施工例を見る
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── 実績バー ── */}
      <section className="bg-amber-700 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { num: "50", unit: "年", label: "創業からの実績" },
            { num: "1,000", unit: "+", label: "累計施工件数" },
            { num: "24", unit: "h", label: "緊急対応体制" },
            { num: "98", unit: "%", label: "顧客満足度" },
          ].map(({ num, unit, label }) => (
            <div key={label} className="fade-up">
              <p className="text-4xl font-black">
                {num}<span className="text-2xl">{unit}</span>
              </p>
              <p className="text-amber-200 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 事業内容 ── */}
      <section id="services" className="py-24 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <p className="text-amber-700 font-bold text-sm tracking-widest mb-2">SERVICES</p>
            <h2 className="text-4xl font-black text-stone-800">事業内容</h2>
            <p className="text-stone-500 mt-3">お客様のあらゆるニーズにお応えします</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className={`fade-up fade-up-delay-${i + 1} bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all`}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold text-stone-800 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 施工例スライドショー ── */}
      <section id="works" className="py-24 bg-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-up">
            <p className="text-amber-700 font-bold text-sm tracking-widest mb-2">WORKS</p>
            <h2 className="text-4xl font-black text-stone-800">施工例</h2>
            <p className="text-stone-500 mt-3">実際の施工事例をご覧ください</p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video fade-up">
            <div
              className={`w-full h-full flex items-center justify-center ${WORKS[current].color} ${animating ? "slide-active" : "opacity-0"}`}
            >
              <div className="text-center">
                <p className="text-6xl mb-4">🏠</p>
                <p className="text-2xl font-bold text-stone-700">{WORKS[current].label}</p>
                <p className="text-stone-500 mt-2 text-sm">施工写真をここに入れます</p>
              </div>
            </div>
            <button
              onClick={() => goTo((current - 1 + WORKS.length) % WORKS.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors text-stone-700 font-bold text-lg"
              aria-label="前へ"
            >
              ‹
            </button>
            <button
              onClick={() => goTo((current + 1) % WORKS.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors text-stone-700 font-bold text-lg"
              aria-label="次へ"
            >
              ›
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {WORKS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === current ? "w-8 h-2 bg-amber-700" : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`施工例${i + 1}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            {WORKS.map(({ label, color }, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-xl aspect-square flex items-center justify-center text-xs font-medium text-stone-600 ${color} ${
                  i === current ? "ring-2 ring-amber-700" : "opacity-70 hover:opacity-100"
                } transition-all`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 選ばれる理由 ── */}
      <section className="py-24 px-6 bg-stone-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <p className="text-amber-400 font-bold text-sm tracking-widest mb-2">WHY CHOOSE US</p>
            <h2 className="text-4xl font-black">選ばれる3つの理由</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "創業50年の信頼と実績", desc: "地域のお客様に長年支えていただいた実績があります。確かな技術と誠実な仕事でご満足いただいています。" },
              { num: "02", title: "現場に直接駆けつける", desc: "「困ったらすぐ来てくれる」が私たちのモットー。緊急の修繕にも迅速に対応します。" },
              { num: "03", title: "丁寧なヒアリングと提案", desc: "お客様のご要望をしっかりお聞きし、予算に合わせた最適なプランをご提案します。" },
            ].map(({ num, title, desc }, i) => (
              <div key={num} className={`fade-up fade-up-delay-${i + 1} border border-stone-600 rounded-2xl p-8`}>
                <p className="text-amber-400 text-5xl font-black mb-4 opacity-60">{num}</p>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-stone-400 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 会社概要 ── */}
      <section id="about" className="py-24 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <p className="text-amber-700 font-bold text-sm tracking-widest mb-2">ABOUT</p>
            <h2 className="text-4xl font-black text-stone-800">会社概要</h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden fade-up">
            {[
              { label: "会社名", value: "株式会社戸根" },
              { label: "事業内容", value: "内装工事・外装工事・リフォーム全般" },
              { label: "創業", value: "創業50年" },
              { label: "営業時間", value: "8:00〜18:00（土日祝対応可）" },
              { label: "対応エリア", value: "地域密着型（詳細はお問い合わせください）" },
              { label: "Instagram", value: "@tone_reform" },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex flex-col sm:flex-row px-8 py-5 gap-2 ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
              >
                <span className="text-stone-500 text-sm font-semibold w-32 shrink-0">{label}</span>
                <span className="text-stone-800 text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── お問い合わせ ── */}
      <section id="contact" className="py-24 px-6 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-amber-700 font-bold text-sm tracking-widest mb-2">CONTACT</p>
            <h2 className="text-4xl font-black text-stone-800">お問い合わせ</h2>
            <p className="text-stone-500 mt-3">お気軽にご相談ください。無料でお見積りします。</p>
          </div>
          <form className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 space-y-5 fade-up">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                お名前 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="山田 太郎"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">電話番号</label>
              <input
                type="tel"
                placeholder="090-0000-0000"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">メールアドレス</label>
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                ご相談内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="例：リビングの壁紙を張り替えたい、外壁の塗装が剥がれてきた、など"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-base transition-all shadow-md hover:shadow-amber-200 hover:-translate-y-0.5"
            >
              送信する →
            </button>
          </form>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-white font-black text-xl mb-2">
              株式会社<span className="text-amber-500">戸根</span>
            </p>
            <p className="text-sm">創業50年。地域に根ざしたリフォーム・工務店。</p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <a href="#services" className="hover:text-white transition-colors">事業内容</a>
            <a href="#works" className="hover:text-white transition-colors">施工例</a>
            <a href="#about" className="hover:text-white transition-colors">会社概要</a>
            <a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-stone-800 text-center text-xs">
          © 2024 株式会社戸根. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
