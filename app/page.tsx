"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// ── データ ────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#about-us", label: "はじめての方へ" },
  { href: "#works", label: "施工事例" },
  { href: "#voice", label: "お客様の声" },
  { href: "#news", label: "お知らせ" },
  { href: "#company", label: "会社情報" },
];

const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
    headline: "住まいの困ったを、\nすぐに解決。",
    sub: "内装・外装・水回りリフォームまで丁寧にサポート",
  },
  {
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=80",
    headline: "創業50年の\n確かな技術と信頼。",
    sub: "地域に寄り添い、一軒一軒を大切に施工します",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    headline: "困ったらすぐ\n駆けつけます。",
    sub: "お気軽にご相談ください。無料でお見積りします",
  },
];

const WORK_CATEGORIES = [
  { icon: "🛋", label: "リビング" },
  { icon: "🍳", label: "キッチン" },
  { icon: "🛁", label: "浴室" },
  { icon: "🚿", label: "洗面所" },
  { icon: "🚽", label: "トイレ" },
  { icon: "🛏", label: "寝室" },
  { icon: "🏠", label: "外壁" },
  { icon: "🔨", label: "屋根" },
  { icon: "🪟", label: "窓・サッシ" },
  { icon: "🏗️", label: "増改築" },
  { icon: "♿", label: "バリアフリー" },
  { icon: "✨", label: "フルリノベ" },
];

const WORKS = [
  {
    category: "リビング", title: "LDKを明るく広々リフォーム", price: "120万円",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    category: "キッチン", title: "システムキッチン入れ替え", price: "85万円",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    category: "浴室", title: "ユニットバスまるごと交換", price: "95万円",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  },
  {
    category: "外壁", title: "外壁塗装＋防水工事", price: "75万円",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    category: "屋根", title: "屋根の葺き替えリフォーム", price: "110万円",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    category: "フルリノベ", title: "中古戸建まるごとリノベ", price: "580万円",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
];

const VOICES = [
  {
    name: "K.Mさん（40代・女性）",
    text: "水回りのリフォームをお願いしました。担当の方がとても丁寧で、細かい要望にも柔軟に対応してくれました。仕上がりも大満足です！",
    stars: 5,
  },
  {
    name: "T.Yさん（50代・男性）",
    text: "外壁塗装をお願いしました。近所の紹介で来ましたが、見積もりから工事まで誠実に対応してもらえて安心でした。また何かあればお願いします。",
    stars: 5,
  },
  {
    name: "A.Sさん（60代・女性）",
    text: "急な雨漏りの修繕をお願いしました。連絡した翌日に来てくれて本当に助かりました。創業50年の実績は伊達じゃないと感じました。",
    stars: 5,
  },
];

const NEWS = [
  { date: "2024.05.01", label: "お知らせ", title: "GW期間中の営業についてのご案内" },
  { date: "2024.04.15", label: "お知らせ", title: "春のリフォームキャンペーン実施中！" },
  { date: "2024.03.20", label: "施工事例", title: "N様邸 LDKリフォーム事例を公開しました" },
  { date: "2024.03.01", label: "お知らせ", title: "ホームページをリニューアルしました" },
];

// ── フック ────────────────────────────────────────────────
function useFadeUp() {
  useEffect(() => {
    const targets = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useHeroSlider(count: number) {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((i: number) => {
    setCurrent(i);
    setKey((k) => k + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => go((i + 1) % count), 5500);
  }, [count]);

  useEffect(() => {
    timer.current = setTimeout(() => go(1), 5500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [go]);

  return { current, key, go };
}

// ── コンポーネント ────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
  );
}

export default function Home() {
  useFadeUp();
  const scrolled = useHeaderScroll();
  const { current, key, go } = useHeroSlider(HERO_SLIDES.length);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("すべて");

  const filteredWorks = activeCategory === "すべて"
    ? WORKS
    : WORKS.filter((w) => w.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-stone-800">

      {/* ── ヘッダー ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "header-shadow" : ""}`}>
        {/* 上部バー */}
        <div className="bg-stone-800 text-white text-xs py-2 px-6 hidden md:flex justify-end items-center gap-6">
          <span>📞 00-0000-0000</span>
          <span>月〜土 8:00〜18:00（日祝応相談）</span>
        </div>
        {/* メインナビ */}
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-xl font-black text-stone-800">株式会社<span className="text-amber-600">戸根</span></span>
            <span className="text-xs text-stone-400 font-medium tracking-widest">TONE REFORM</span>
          </Link>
          {/* PC nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={label} href={href} className="hover:text-amber-600 transition-colors py-1 border-b-2 border-transparent hover:border-amber-600">
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded bg-amber-600 text-white font-bold text-sm hover:bg-amber-500 transition-colors"
          >
            無料お見積り
          </a>
          {/* ハンバーガー */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-1.5"
            aria-label="メニュー"
          >
            <span className={`block w-6 h-0.5 bg-stone-800 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-stone-800 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-stone-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
        {/* モバイルメニュー */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-3">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block py-2 text-stone-700 font-medium border-b border-stone-100">
                {label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block py-3 text-center bg-amber-600 text-white font-bold rounded mt-2">
              無料お見積り
            </a>
          </div>
        )}
      </header>

      {/* ── ヒーロースライダー ── */}
      <section className="relative h-screen max-h-[680px] min-h-[500px] overflow-hidden mt-[57px] md:mt-[89px]">
        <div key={key} className="hero-slide w-full h-full relative">
          {/* 背景写真 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_SLIDES[current].img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-black/45" />
          {/* テキスト */}
          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 whitespace-pre-line drop-shadow-lg">
                {HERO_SLIDES[current].headline}
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-8 drop-shadow">{HERO_SLIDES[current].sub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="#contact" className="px-8 py-4 bg-amber-500 text-white font-bold rounded hover:bg-amber-400 transition-colors shadow-lg">
                  無料お見積りはこちら
                </a>
                <a href="#works" className="px-8 py-4 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-stone-800 transition-colors">
                  施工事例を見る
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ドット */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all ${i === current ? "w-8 h-2.5 bg-amber-600" : "w-2.5 h-2.5 bg-white/60 hover:bg-white"}`}
              aria-label={`スライド${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── CTAバナー ── */}
      <section className="bg-amber-600 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white text-center md:text-left">
            <p className="text-xl font-black">まずはお気軽にご相談ください</p>
            <p className="text-amber-100 text-sm mt-1">現地調査・お見積りは無料です。お電話でもお気軽にどうぞ。</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:0000000000" className="px-6 py-3 bg-white text-amber-600 font-black rounded text-sm hover:bg-amber-50 transition-colors whitespace-nowrap">
              📞 00-0000-0000
            </a>
            <a href="#contact" className="px-6 py-3 border-2 border-white text-white font-bold rounded text-sm hover:bg-white hover:text-amber-600 transition-colors whitespace-nowrap">
              メールで相談
            </a>
          </div>
        </div>
      </section>

      {/* ── はじめての方へ ── */}
      <section id="about-us" className="py-20 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-amber-600 font-bold text-xs tracking-widest mb-2">ABOUT US</p>
            <h2 className="text-3xl font-black text-stone-800">はじめての方へ</h2>
            <div className="w-12 h-1 bg-amber-600 mx-auto mt-3" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="fade-up">
              <div className="w-full aspect-video rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"
                  alt="リフォームイメージ"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="fade-up fade-up-delay-2">
              <h3 className="text-2xl font-black text-stone-800 mb-4">
                創業50年、地域に根ざした<br />リフォーム工務店です
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                私たち株式会社戸根は、地域のお客様に長年支えていただいてきた地域密着型の工務店です。「困ったらすぐ来てくれる」をモットーに、内装・外装・水回りリフォームまで幅広く対応しています。
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                小さな修繕から大きなリノベーションまで、お客様のご要望と予算に合わせた最適なプランをご提案します。まずはお気軽にご相談ください。
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { num: "50年", label: "の実績" },
                  { num: "1,000件", label: "以上の施工" },
                  { num: "98%", label: "顧客満足度" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center bg-white rounded-xl p-3 border border-stone-100">
                    <p className="text-xl font-black text-amber-600">{num}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <a href="#company" className="inline-block px-6 py-3 border-2 border-amber-600 text-amber-600 font-bold rounded hover:bg-amber-600 hover:text-white transition-colors text-sm">
                会社情報を見る →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 施工事例 ── */}
      <section id="works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-amber-600 font-bold text-xs tracking-widest mb-2">WORKS</p>
            <h2 className="text-3xl font-black text-stone-800">施工事例</h2>
            <div className="w-12 h-1 bg-amber-600 mx-auto mt-3" />
          </div>
          {/* カテゴリーフィルター */}
          <div className="flex flex-wrap gap-2 justify-center mb-8 fade-up">
            {["すべて", ...WORK_CATEGORIES.map((c) => c.label)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white text-stone-600 border-stone-200 hover:border-amber-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* カード一覧 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map(({ category, title, price, img }, i) => (
              <div key={i} className="fade-up rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{category}</span>
                  <h3 className="font-bold text-stone-800 mt-2 mb-1">{title}</h3>
                  <p className="text-sm text-stone-400">施工費用目安：{price}〜</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 fade-up">
            <a href="#contact" className="inline-block px-8 py-3 bg-amber-600 text-white font-bold rounded hover:bg-amber-500 transition-colors">
              施工のご相談はこちら
            </a>
          </div>
        </div>
      </section>

      {/* ── お客様の声 ── */}
      <section id="voice" className="py-20 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-amber-600 font-bold text-xs tracking-widest mb-2">VOICE</p>
            <h2 className="text-3xl font-black text-stone-800">お客様の声</h2>
            <div className="w-12 h-1 bg-amber-600 mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VOICES.map(({ name, text, stars }, i) => (
              <div key={i} className={`fade-up fade-up-delay-${i + 1} bg-white rounded-2xl p-6 border border-stone-100 shadow-sm`}>
                <Stars count={stars} />
                <p className="text-stone-600 text-sm leading-relaxed mt-3 mb-4">「{text}」</p>
                <p className="text-xs font-bold text-stone-500">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── お知らせ ── */}
      <section id="news" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-amber-600 font-bold text-xs tracking-widest mb-2">NEWS</p>
            <h2 className="text-3xl font-black text-stone-800">お知らせ</h2>
            <div className="w-12 h-1 bg-amber-600 mx-auto mt-3" />
          </div>
          <div className="space-y-0 border-t border-stone-100 fade-up">
            {NEWS.map(({ date, label, title }) => (
              <div key={title} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-4 border-b border-stone-100 hover:bg-stone-50 px-2 transition-colors">
                <span className="text-stone-400 text-sm shrink-0">{date}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                  label === "施工事例" ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-600"
                }`}>{label}</span>
                <span className="text-stone-700 text-sm">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 会社情報 ── */}
      <section id="company" className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <p className="text-amber-600 font-bold text-xs tracking-widest mb-2">COMPANY</p>
            <h2 className="text-3xl font-black text-stone-800">会社情報</h2>
            <div className="w-12 h-1 bg-amber-600 mx-auto mt-3" />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden fade-up">
            {[
              { label: "会社名", value: "株式会社戸根" },
              { label: "設立", value: "創業50年" },
              { label: "事業内容", value: "内装工事・外装工事・水回りリフォーム・リノベーション" },
              { label: "営業時間", value: "月〜土 8:00〜18:00（日祝応相談）" },
              { label: "電話番号", value: "00-0000-0000" },
              { label: "対応エリア", value: "地域密着型（詳細はお問い合わせください）" },
              { label: "SNS", value: "Instagram / LINE" },
            ].map(({ label, value }, i) => (
              <div key={label} className={`flex flex-col sm:flex-row px-6 py-4 gap-2 ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}>
                <span className="text-stone-500 text-sm font-semibold w-36 shrink-0">{label}</span>
                <span className="text-stone-800 text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── お問い合わせ ── */}
      <section id="contact" className="py-20 px-6 bg-amber-600">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 fade-up">
            <p className="text-amber-100 font-bold text-xs tracking-widest mb-2">CONTACT</p>
            <h2 className="text-3xl font-black text-white">お問い合わせ・無料お見積り</h2>
            <p className="text-amber-100 mt-3 text-sm">お気軽にご相談ください。通常2営業日以内にご返信します。</p>
          </div>
          <form className="bg-white rounded-2xl p-8 space-y-4 fade-up">
            {[
              { label: "お名前", type: "text", placeholder: "山田 太郎", required: true },
              { label: "電話番号", type: "tel", placeholder: "090-0000-0000", required: false },
              { label: "メールアドレス", type: "email", placeholder: "example@mail.com", required: false },
            ].map(({ label, type, placeholder, required }) => (
              <div key={label}>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  {label} {required && <span className="text-red-400">*</span>}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                ご相談内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="例：リビングの壁紙を張り替えたい、外壁の塗装が剥がれてきた、など"
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-black text-base transition-colors"
            >
              送信する →
            </button>
          </form>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-white font-black text-lg mb-1">
              株式会社<span className="text-amber-500">戸根</span>
            </p>
            <p className="text-xs mb-3">TONE REFORM</p>
            <p className="text-sm leading-relaxed">創業50年。地域に根ざした<br />リフォーム・工務店。</p>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-3">サイトマップ</p>
            <div className="space-y-1.5 text-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={label} href={href} className="block hover:text-white transition-colors">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-3">お問い合わせ</p>
            <p className="text-2xl font-black text-white mb-1">00-0000-0000</p>
            <p className="text-xs mb-4">月〜土 8:00〜18:00（日祝応相談）</p>
            <a href="#contact" className="inline-block px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded hover:bg-amber-500 transition-colors">
              メールで相談
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-stone-800 text-center text-xs">
          © 2024 株式会社戸根. All rights reserved.
        </div>
      </footer>

      {/* ── 固定CTAボタン（スマホ） ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-stone-200">
        <a href="tel:0000000000" className="flex-1 py-4 bg-stone-800 text-white text-xs font-bold text-center">
          📞 電話する
        </a>
        <a href="#contact" className="flex-1 py-4 bg-amber-600 text-white text-xs font-bold text-center">
          ✉ 無料相談
        </a>
      </div>
    </div>
  );
}
