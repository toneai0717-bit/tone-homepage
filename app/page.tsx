"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ── 型定義 ────────────────────────────────────────────────
interface WorkDetail {
  before?: string;
  after?: string;
  period: string;
  overview: string;
  priceBreakdown: { label: string; amount: string }[];
  materials?: string;
  customerVoice?: string;
}

interface WorkItem {
  category: string;
  title: string;
  price: string;
  img: string;
  detail?: WorkDetail;
}

interface BeforeAfterItem {
  label: string;
  before: string;
  after: string;
  title: string;
  desc: string;
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface VoiceItem {
  name: string;
  text: string;
  stars: number;
}

interface NewsItem {
  date: string;
  label: string;
  title: string;
}

interface InquiryOption {
  id: string;
  label: string;
}

// ── データ ────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#about-us", label: "はじめての方へ" },
  { href: "#works", label: "施工事例" },
  { href: "#voice", label: "お客様の声" },
  { href: "#news", label: "お知らせ" },
  { href: "#company", label: "会社情報" },
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
  { icon: "🌿", label: "畳" },
];

const WORKS: WorkItem[] = [
  {
    category: "リビング", title: "LDKを明るく広々リフォーム", price: "120万円", img: "/images/Living after.png",
    detail: {
      before: "/images/Living before.png", after: "/images/Living after.png",
      period: "約10日間",
      overview: "築25年のLDKを全面改装。天井・壁・床を一新し、白を基調としたモダンな空間に生まれ変わりました。",
      priceBreakdown: [
        { label: "フローリング工事", amount: "45万円" },
        { label: "壁紙・クロス工事", amount: "35万円" },
        { label: "天井工事", amount: "20万円" },
        { label: "諸経費・処分費", amount: "20万円" },
      ],
      materials: "東リ フローリング / サンゲツ クロス",
      customerVoice: "明るくなって毎日過ごすのが楽しくなりました。職人さんの仕事も丁寧で安心でした。",
    },
  },
  {
    category: "キッチン", title: "システムキッチン入れ替え", price: "85万円", img: "/images/Kitchen after.png",
    detail: {
      before: "/images/Kitchen before.png", after: "/images/Kitchen after.png",
      period: "約3日間",
      overview: "古いキッチンをLIXILのシステムキッチンに交換。収納も増え、毎日の料理が快適になりました。",
      priceBreakdown: [
        { label: "キッチン本体", amount: "55万円" },
        { label: "取付工事費", amount: "15万円" },
        { label: "給排水工事", amount: "10万円" },
        { label: "処分費・諸経費", amount: "5万円" },
      ],
      materials: "LIXIL アレスタ（I型 2550mm）",
      customerVoice: "収納が増えてキッチンがすっきりしました。使い勝手が全然違います！",
    },
  },
  {
    category: "浴室", title: "ユニットバスまるごと交換", price: "95万円", img: "/images/Bathroom.webp",
    detail: {
      after: "/images/Bathroom.webp",
      period: "約4日間",
      overview: "在来工法の浴室をTOTOのユニットバスに交換。保温性・清掃性が大幅に向上しました。",
      priceBreakdown: [
        { label: "ユニットバス本体", amount: "60万円" },
        { label: "解体・取付工事", amount: "20万円" },
        { label: "給排水・電気工事", amount: "10万円" },
        { label: "処分費・諸経費", amount: "5万円" },
      ],
      materials: "TOTO サザナ（1616サイズ）",
    },
  },
  {
    category: "外壁", title: "外壁塗装＋防水工事", price: "75万円", img: "/images/Exterior after.png",
    detail: {
      before: "/images/Exterior before.png", after: "/images/Exterior after.png",
      period: "約7日間",
      overview: "築20年の外壁を高耐久シリコン塗料で塗装。屋根・バルコニーの防水工事も同時施工しました。",
      priceBreakdown: [
        { label: "外壁塗装工事", amount: "50万円" },
        { label: "防水工事", amount: "15万円" },
        { label: "足場仮設・解体", amount: "10万円" },
      ],
      materials: "関西ペイント アレスダイナミックシリコン",
      customerVoice: "見た目が新築みたいになって近所にびっくりされました。",
    },
  },
  {
    category: "屋根", title: "屋根の葺き替えリフォーム", price: "110万円", img: "/images/Roof after.png",
    detail: {
      after: "/images/Roof after.png",
      period: "約5日間",
      overview: "劣化が進んだ瓦屋根を軽量のガルバリウム鋼板に葺き替え。耐震性・耐久性が大幅に向上しました。",
      priceBreakdown: [
        { label: "屋根材（ガルバリウム）", amount: "55万円" },
        { label: "既存屋根撤去・処分", amount: "25万円" },
        { label: "防水シート・下地工事", amount: "20万円" },
        { label: "足場仮設・諸経費", amount: "10万円" },
      ],
      materials: "ニチハ センタールーフ（ガルバリウム鋼板）",
    },
  },
  {
    category: "フルリノベ", title: "中古戸建まるごとリノベ", price: "580万円", img: "/images/fully renovated modern Japanese house after.png",
    detail: {
      after: "/images/fully renovated modern Japanese house after.png",
      period: "約60日間",
      overview: "築40年の中古戸建を全面リノベーション。間取り変更・全水回り交換・断熱改修まで一括施工しました。",
      priceBreakdown: [
        { label: "内装全面工事", amount: "180万円" },
        { label: "水回り全交換", amount: "150万円" },
        { label: "外壁・屋根工事", amount: "130万円" },
        { label: "断熱・窓工事", amount: "80万円" },
        { label: "諸経費・設計費", amount: "40万円" },
      ],
      customerVoice: "まるで新築のような仕上がりで、家族みんな大満足です！",
    },
  },
  {
    category: "畳", title: "畳の張り替えリフォーム", price: "8万円", img: "/images/tatami-after.jpeg",
    detail: {
      before: "/images/tatami-before.jpeg", after: "/images/tatami-after.jpeg",
      period: "1日",
      overview: "6畳の和室の畳を国産い草の新品に張り替え。青々とした清潔感あふれる和室に生まれ変わりました。",
      priceBreakdown: [
        { label: "畳材料費（6枚）", amount: "54,000円" },
        { label: "施工費", amount: "12,000円" },
        { label: "古畳処分費", amount: "12,000円" },
        { label: "出張費", amount: "2,000円" },
      ],
      materials: "国産い草（熊本産）/ 綿糸縁",
      customerVoice: "い草の香りが部屋に広がって、昔の和室が戻ってきたみたいです。",
    },
  },
  {
    category: "畳", title: "和室の畳張り替え①", price: "8万円", img: "/images/Tatami-after-1.jpeg",
    detail: {
      before: "/images/Tatami-before-1.jpeg",
      after: "/images/Tatami-after-1.jpeg",
      period: "1日",
      overview: "6畳の和室の畳を張り替え。長年使用した畳を国産い草の新品に交換し、清潔感ある和室に仕上げました。",
      priceBreakdown: [
        { label: "畳材料費（6枚）", amount: "54,000円" },
        { label: "施工費", amount: "12,000円" },
        { label: "古畳処分費", amount: "12,000円" },
        { label: "出張費", amount: "2,000円" },
      ],
      materials: "国産い草（熊本産）/ 綿糸縁",
    },
  },
];

const BEFORE_AFTERS: BeforeAfterItem[] = [
  {
    label: "リビング",
    before: "/images/Living before.png",
    after:  "/images/Living after.png",
    title: "LDKを明るく広々リフォーム",
    desc: "古い内装を一新。白を基調としたモダンな空間に生まれ変わりました。",
  },
  {
    label: "キッチン",
    before: "/images/Kitchen before.png",
    after:  "/images/Kitchen after.png",
    title: "システムキッチン全面リフォーム",
    desc: "使いにくかった古いキッチンを、最新のシステムキッチンに交換しました。",
  },
  {
    label: "畳",
    before: "/images/tatami-before.jpeg",
    after:  "/images/tatami-after.jpeg",
    title: "畳の張り替えリフォーム",
    desc: "色あせて傷んだ畳を新品に張り替え。青々とした清潔感あふれる和室に生まれ変わりました。",
  },
];

const TIMELINE: TimelineItem[] = [
  {
    year: "1974年",
    title: "畳店として創業",
    desc: "大阪南部にて、先代が畳職人として独立。地域のお客様に支えられながら、丁寧な仕事を積み重ねてきました。",
  },
  {
    year: "1990年代",
    title: "内装業へ進化",
    desc: "畳で培った職人技を活かし、壁紙・フローリングなど内装全般へと事業を拡大。地域の信頼が広がりました。",
  },
  {
    year: "2000年代",
    title: "総合リフォームへ",
    desc: "水回り・外装・増改築まで対応できる総合リフォーム会社として成長。設計から施工まで一貫して担う体制を整えました。",
  },
  {
    year: "現在",
    title: "創業50年・地域密着の誇り",
    desc: "1,000件以上の施工実績を誇り、今も「困ったらすぐ来てくれる」を合言葉に地域に根ざした工務店として歩み続けています。",
  },
];

const VOICES: VoiceItem[] = [
  { name: "K.Mさん（40代・女性）", text: "水回りのリフォームをお願いしました。担当の方がとても丁寧で、細かい要望にも柔軟に対応してくれました。仕上がりも大満足です！", stars: 5 },
  { name: "T.Yさん（50代・男性）", text: "外壁塗装をお願いしました。近所の紹介で来ましたが、見積もりから工事まで誠実に対応してもらえて安心でした。また何かあればお願いします。", stars: 5 },
  { name: "A.Sさん（60代・女性）", text: "急な雨漏りの修繕をお願いしました。連絡した翌日に来てくれて本当に助かりました。創業50年の実績は伊達じゃないと感じました。", stars: 5 },
];

const NEWS: NewsItem[] = [
  { date: "2024.05.01", label: "お知らせ", title: "GW期間中の営業についてのご案内" },
  { date: "2024.04.15", label: "お知らせ", title: "春のリフォームキャンペーン実施中！" },
  { date: "2024.03.20", label: "施工事例", title: "N様邸 LDKリフォーム事例を公開しました" },
  { date: "2024.03.01", label: "お知らせ", title: "ホームページをリニューアルしました" },
];

const INQUIRY_OPTIONS: InquiryOption[] = [
  { id: "tatami", label: "畳・和室のモダンリノベーション" },
  { id: "wallpaper", label: "壁紙・クロスの張り替え（内装）" },
  { id: "water", label: "水回り（キッチン・お風呂など）" },
  { id: "other", label: "その他・全体的なリフォーム" },
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

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  title: string;
  desc: string;
  label: string;
}

function BeforeAfterSlider({ before, after, title, desc, label }: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);

  return (
    <div className="fade-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{label}</span>
        <h3 className="font-black text-stone-800 text-lg">{title}</h3>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-md select-none" style={{ aspectRatio: "16/9" }}>
        {/* After（ベース） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt="After" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        {/* Before（クリップ） */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Before"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        {/* ラベル */}
        <span className="absolute top-3 left-3 bg-stone-800/90 text-white text-xs font-black px-3 py-1 rounded-full tracking-widest z-10 pointer-events-none">BEFORE</span>
        <span className="absolute top-3 right-3 bg-amber-500/90 text-white text-xs font-black px-3 py-1 rounded-full tracking-widest z-10 pointer-events-none">AFTER</span>
        {/* 境界線 */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
          style={{ left: `${pos}%` }}
        />
        {/* ドラッグハンドル */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center gap-0.5 z-10 pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <svg width="9" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="9" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
        {/* 透明rangeスライダー */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-20"
          aria-label="Before/After比較スライダー"
        />
      </div>
      <p className="text-stone-500 text-sm mt-3 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── 施工事例モーダル ──────────────────────────────────────
function WorkModal({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  const { detail } = work;
  const hasSlider = !!(detail?.before && detail?.after);
  const singleImg = detail?.before ?? detail?.after ?? work.img;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-stone-100 rounded-full shadow transition-colors"
          aria-label="閉じる"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 画像エリア */}
        {hasSlider ? (
          <ModalSlider before={detail!.before!} after={detail!.after!} />
        ) : (
          <div className="w-full rounded-t-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={singleImg} alt={work.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* 詳細コンテンツ */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shrink-0">{work.category}</span>
            <h2 className="font-black text-stone-800 text-lg leading-snug">{work.title}</h2>
          </div>

          {detail && (
            <>
              <p className="text-stone-600 text-sm leading-relaxed">{detail.overview}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-50 rounded-xl p-3.5">
                  <p className="text-xs font-bold text-stone-400 mb-1">工期</p>
                  <p className="font-bold text-stone-800 text-sm">{detail.period}</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-3.5">
                  <p className="text-xs font-bold text-stone-400 mb-1">施工費用目安</p>
                  <p className="font-bold text-amber-600 text-sm">{work.price}〜</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-stone-700 mb-2">金額内訳</p>
                <div className="border border-stone-100 rounded-xl overflow-hidden">
                  {detail.priceBreakdown.map(({ label, amount }, i) => (
                    <div key={i} className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}>
                      <span className="text-stone-500">{label}</span>
                      <span className="font-bold text-stone-800">{amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {detail.materials && (
                <div>
                  <p className="text-sm font-bold text-stone-700 mb-1.5">使用材料</p>
                  <p className="text-sm text-stone-500 bg-stone-50 px-4 py-2.5 rounded-xl">{detail.materials}</p>
                </div>
              )}

              {detail.customerVoice && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-xs font-bold text-amber-600 mb-1">お客様の声</p>
                  <p className="text-sm text-stone-700 leading-relaxed">「{detail.customerVoice}」</p>
                </div>
              )}
            </>
          )}

          <a
            href="#contact"
            onClick={onClose}
            className="block w-full py-3.5 text-center bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors text-sm"
          >
            同じようなリフォームを相談する →
          </a>
        </div>
      </div>
    </div>
  );
}

function ModalSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full rounded-t-2xl overflow-hidden select-none" style={{ aspectRatio: "16/9" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <span className="absolute top-3 left-3 bg-stone-800/90 text-white text-xs font-black px-3 py-1 rounded-full tracking-widest z-10 pointer-events-none">BEFORE</span>
      <span className="absolute top-3 right-3 bg-amber-500/90 text-white text-xs font-black px-3 py-1 rounded-full tracking-widest z-10 pointer-events-none">AFTER</span>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none" style={{ left: `${pos}%` }} />
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center gap-0.5 z-10 pointer-events-none" style={{ left: `${pos}%` }}>
        <svg width="9" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500"><polyline points="15 18 9 12 15 6" /></svg>
        <svg width="9" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500"><polyline points="9 18 15 12 9 6" /></svg>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-20" aria-label="Before/After比較スライダー" />
    </div>
  );
}

// ── メインコンポーネント ───────────────────────────────────
export default function Home() {
  useFadeUp();
  const scrolled = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");

  const filteredWorks = activeCategory === "すべて"
    ? WORKS
    : WORKS.filter((w) => w.category === activeCategory);

  const toggleInquiry = (id: string) => {
    setInquiryTypes((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setSending(true);
    setSendStatus("idle");
    const inquiryLabels = INQUIRY_OPTIONS
      .filter((o) => inquiryTypes.includes(o.id))
      .map((o) => o.label);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, inquiryTypes: inquiryLabels }),
      });
      if (res.ok) {
        setSendStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setInquiryTypes([]);
      } else {
        setSendStatus("error");
      }
    } catch {
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-800">

      {/* ── ヘッダー ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white header-shadow" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-tight">
            <span className={`text-xl font-black transition-colors ${scrolled ? "text-stone-800" : "text-white"}`}>
              株式会社<span className="text-amber-500">戸根</span>
            </span>
            <span className={`text-xs font-medium tracking-widest transition-colors ${scrolled ? "text-stone-400" : "text-white/70"}`}>TONE REFORM</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className={`transition-colors py-1 border-b-2 border-transparent hover:border-amber-500 ${scrolled ? "text-stone-600 hover:text-amber-600" : "text-white/90 hover:text-white"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-1.5"
            aria-label="メニュー"
          >
            <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-stone-800" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-stone-800" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-stone-800" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
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

      {/* ── ヒーロー（動画） ── */}
      <section className="relative h-[100dvh] min-h-[600px] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/hero-transition.mp4"
          poster="/images/Living after.png"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-10" />

        {/* 中央テキスト（左寄せ） */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 max-w-3xl">
          <p className="text-amber-400 text-xs md:text-sm font-bold tracking-[0.3em] mb-5 uppercase">
            Since 1974 ── 創業50年の技術と信頼
          </p>
          <h1
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", textShadow: "0 2px 32px rgba(0,0,0,0.6)" }}
          >
            リフォームで、<br />暮らしが変わる。
          </h1>
          <p className="text-white/75 text-sm md:text-base mb-8 leading-relaxed max-w-md">
            創業50年 ── 地域に根ざした確かな技術
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded transition-colors shadow-lg text-sm tracking-wide">
              無料お見積りはこちら
            </a>
            <a href="#works" className="px-8 py-4 border-2 border-white/80 text-white font-bold rounded hover:bg-white hover:text-stone-800 transition-colors text-sm backdrop-blur-sm">
              施工事例を見る
            </a>
          </div>
        </div>
      </section>

      {/* ── PC固定CTAボタン（右下） ── */}
      <div className="hidden md:flex fixed bottom-0 right-0 z-40 flex-col">
        <a href="tel:0721634427" className="flex items-center gap-3 px-6 py-4 bg-amber-600 hover:bg-amber-500 text-white transition-colors">
          <span className="text-xl">📞</span>
          <div>
            <p className="font-black text-lg leading-none">0721-63-4427</p>
            <p className="text-xs text-amber-100 mt-0.5">営業時間 9:00〜18:00</p>
          </div>
        </a>
        <a href="#contact" className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white text-sm font-bold transition-colors">
          ✉ お問い合わせ
        </a>
      </div>

      {/* ── Before / After スライダー ── */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 fade-up">
            <p className="text-amber-600 font-bold text-xs tracking-widest mb-2">BEFORE / AFTER</p>
            <h2 className="text-3xl font-black text-stone-800">施工前後の比較</h2>
            <div className="w-12 h-1 bg-amber-600 mx-auto mt-3" />
            <p className="text-stone-500 text-sm mt-4">スライダーを左右に動かして比較できます</p>
          </div>
          <div className="space-y-16">
            {BEFORE_AFTERS.map((item, i) => (
              <BeforeAfterSlider key={i} {...item} />
            ))}
          </div>
          <div className="text-center mt-12 fade-up">
            <a href="#contact" className="inline-block px-8 py-4 bg-amber-600 text-white font-bold rounded hover:bg-amber-500 transition-colors shadow-md">
              あなたのお家もご相談ください →
            </a>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work, i) => (
              <div
                key={i}
                onClick={() => setSelectedWork(work)}
                className="fade-up rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={work.img} alt={work.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{work.category}</span>
                  <h3 className="font-bold text-stone-800 mt-2 mb-1">{work.title}</h3>
                  <p className="text-sm text-stone-400">施工費用目安：{work.price}〜</p>
                  <p className="text-xs text-stone-300 mt-1.5">詳細を見る →</p>
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

      {/* ── CTAバナー ── */}
      <section className="bg-amber-600 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white text-center md:text-left">
            <p className="text-xl font-black">まずはお気軽にご相談ください</p>
            <p className="text-amber-100 text-sm mt-1">現地調査・お見積りは無料です。お電話でもお気軽にどうぞ。</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:0721634427" className="px-6 py-3 bg-white text-amber-600 font-black rounded text-sm hover:bg-amber-50 transition-colors whitespace-nowrap">
              📞 0721-63-4427
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
                <img src="/images/Craftman.png" alt="リフォームイメージ" loading="lazy" className="w-full h-full object-cover" />
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

      {/* ── 私たちの歩み（タイムライン） ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 fade-up">
            <p className="text-amber-600 font-bold text-xs tracking-widest mb-2">OUR STORY</p>
            <h2 className="text-3xl font-black text-stone-800">私たちの歩み</h2>
            <div className="w-12 h-1 bg-amber-600 mx-auto mt-3" />
            <p className="text-stone-500 text-sm mt-4">畳の匠から、地域の総合リフォーム会社へ</p>
          </div>
          <div className="relative">
            {/* 縦ライン */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 -translate-x-1/2" />
            <div className="space-y-10">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <div key={i} className={`fade-up relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* ドット */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-md z-10 top-1.5" />
                  {/* コンテンツ */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                    <span className="inline-block text-xs font-black text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">{year}</span>
                    <h3 className="font-black text-stone-800 text-lg mb-1">{title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── お知らせ ── */}
      <section id="news" className="py-20 px-6 bg-stone-50">
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
                <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${label === "施工事例" ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-600"}`}>{label}</span>
                <span className="text-stone-700 text-sm">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 会社情報 ── */}
      <section id="company" className="py-20 px-6 bg-white">
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
              { label: "電話番号", value: "0721-63-4427" },
              { label: "対応エリア", value: "日本全国対応" },
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
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 space-y-5 fade-up">

            {/* お困りごと選択 */}
            <div>
              <p className="text-sm font-semibold text-stone-700 mb-3">お困りごとの種類（複数選択可）</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INQUIRY_OPTIONS.map(({ id, label }) => {
                  const selected = inquiryTypes.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleInquiry(id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-stone-200 bg-white text-stone-600 hover:border-amber-300"
                      }`}
                    >
                      <span className="text-sm font-medium leading-tight">{label}</span>
                      {selected && <span className="ml-auto text-amber-500 font-black text-base shrink-0">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                お名前 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="山田 太郎"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">電話番号</label>
              <input
                type="tel"
                placeholder="0721-63-4427"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">メールアドレス</label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                ご相談内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="例：リビングの壁紙を張り替えたい、外壁の塗装が剥がれてきた、など"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors resize-none"
              />
            </div>
            {sendStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm font-medium">
                ✅ 送信完了しました！近日中にご連絡いたします。
              </div>
            )}
            {sendStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm font-medium">
                ❌ 送信に失敗しました。お電話にてご連絡ください。
              </div>
            )}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-stone-300 text-white font-black text-base transition-colors"
            >
              {sending ? "送信中..." : "送信する →"}
            </button>
          </form>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6 pb-28 md:pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-white font-black text-lg mb-1">株式会社<span className="text-amber-500">戸根</span></p>
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
            <p className="text-2xl font-black text-white mb-1">0721-63-4427</p>
            <p className="text-xs mb-4">月〜土 8:00〜18:00（日祝応相談）</p>
            <a href="#contact" className="inline-block px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded hover:bg-amber-500 transition-colors">
              メールで相談
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-stone-800 text-center text-xs">
          © 2026 株式会社戸根. All rights reserved.
        </div>
      </footer>

      {/* ── 施工事例モーダル ── */}
      {selectedWork && <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />}

      {/* ── スマホ固定フローティングCTA ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex shadow-2xl">
        <a
          href="tel:0721634427"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3.5 bg-white text-amber-600 border-t-2 border-amber-500 font-bold text-xs"
        >
          <span className="text-lg">📞</span>
          お電話で相談
        </a>
        <a
          href="#contact"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3.5 bg-amber-500 text-white font-bold text-xs"
        >
          <span className="text-lg">✉</span>
          WEBから見積もり
        </a>
      </div>
    </div>
  );
}
