'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Database, Table2, Braces, Network, KeyRound,
  Layers3, Search, ShieldCheck, Zap, ChevronLeft, ChevronRight, Maximize,
  Minimize, BookOpen, CheckCircle2, CircleHelp, Sparkles, GitBranch,
  Users, ShoppingBag, Smartphone, Server, FileJson, Boxes, Gauge, ListChecks,
} from 'lucide-react';

const slides = [
  { type: 'cover', section: 'شروع', title: 'دیتابیس از صفر تا NoSQL', subtitle: 'یک سفر ساده از ذخیرهٔ اطلاعات تا دنیای پایگاه‌داده‌های غیررابطه‌ای' },
  { section: 'مبانی', eyebrow: '۰۱ / از زندگی روزمره', title: 'دیتابیس کجا به کار می‌آید؟', intro: 'هر بار که یک برنامه اطلاعاتی را برای استفادهٔ بعدی نگه می‌دارد، با ذخیره‌سازی داده سروکار داریم.', cards: [
    { icon: Smartphone, title: 'مخاطبان گوشی', text: 'نام، شماره تلفن و اطلاعات تماس', color: 'mint', label: 'اطلاعات شخصی' },
    { icon: ShoppingBag, title: 'فروشگاه اینترنتی', text: 'محصول‌ها، قیمت‌ها و سفارش‌ها', color: 'coral', label: 'خرید و فروش' },
    { icon: Users, title: 'شبکهٔ اجتماعی', text: 'پروفایل‌ها، پست‌ها و ارتباط افراد', color: 'lilac', label: 'تعامل کاربران' },
  ]},
  { section: 'مبانی', eyebrow: '۰۲ / تعریف ساده', title: 'دیتابیس دقیقاً چیست؟', intro: 'پایگاه‌داده مجموعه‌ای از اطلاعات است که به شکلی سازمان‌یافته نگه‌داری می‌شود تا پیدا کردن، اضافه کردن و تغییر دادن آن آسان باشد.', flow: [
    { title: 'داده', text: 'نام، قیمت، تاریخ', icon: FileJson, color: 'coral' },
    { title: 'پایگاه‌داده', text: 'اطلاعات ذخیره‌شده', icon: Database, color: 'mint' },
    { title: 'DBMS', text: 'نرم‌افزار مدیریت داده', icon: Server, color: 'lilac' },
  ], foot: 'نمونه‌های DBMS: MySQL، PostgreSQL و MongoDB؛ هرکدام مدل و شیوهٔ مدیریت خاص خود را دارند.' },
  { section: 'مبانی', eyebrow: '۰۳ / چرا استفاده می‌کنیم؟', title: 'چرا فایل معمولی همیشه کافی نیست؟', intro: 'برای چند یادداشت ساده، یک فایل ممکن است کافی باشد؛ اما با افزایش حجم داده و تعداد کاربران، مدیریت دشوارتر می‌شود.', cards: [
    { icon: Search, title: 'جست‌وجوی سریع', text: 'مثلاً سفارش‌های یک مشتری را پیدا کنیم.', color: 'mint' },
    { icon: Zap, title: 'به‌روزرسانی', text: 'قیمت یک محصول را به‌درستی تغییر بدهیم.', color: 'coral' },
    { icon: Users, title: 'استفادهٔ هم‌زمان', text: 'چند کاربر بتوانند با داده‌ها کار کنند.', color: 'lilac' },
    { icon: ShieldCheck, title: 'کنترل دسترسی', text: 'هر کاربر فقط اطلاعات مجاز را ببیند.', color: 'gold' },
  ]},
  { section: 'مبانی', eyebrow: '۰۴ / مدل رابطه‌ای', title: 'قبل از NoSQL: دیتابیس جدولی', intro: 'در پایگاه‌دادهٔ رابطه‌ای، اطلاعات اغلب در جدول‌هایی شبیه صفحهٔ گسترده قرار می‌گیرند.', table: true, foot: 'ردیف معمولاً یک رکورد است و ستون یک نوع ویژگی را نشان می‌دهد؛ جدول‌ها هم می‌توانند با کلیدها به هم مرتبط شوند.' },
  { section: 'پل ورود به NoSQL', eyebrow: '۰۵ / یک پرسش مهم', title: 'آیا همهٔ اطلاعات شبیه جدول هستند؟', intro: 'بعضی داده‌ها مرتب و هم‌شکل‌اند؛ بعضی دیگر ویژگی‌های متنوعی دارند یا ارتباط میان آن‌ها مهم‌تر است.', compare: true, foot: 'این به معنی ناتوانی مدل رابطه‌ای نیست؛ فقط بعضی مدل‌ها برای برخی شکل‌های داده طبیعی‌ترند.' },
  { section: 'NoSQL', eyebrow: '۰۶ / موضوع اصلی', title: 'NoSQL یعنی چه؟', intro: 'NoSQL نام خانواده‌ای از پایگاه‌داده‌هاست که داده‌ها را الزاماً در جدول‌های رابطه‌ای سنتی ذخیره نمی‌کنند.', bigNoSql: true, foot: 'NoSQL را بهتر است «نه فقط SQL» درک کنیم؛ این خانواده قرار نیست SQL را در همهٔ پروژه‌ها جایگزین کند.' },
  { section: 'NoSQL', eyebrow: '۰۷ / چهار خانوادهٔ رایج', title: 'NoSQL چند مدل دارد؟', intro: 'چهار مدل رایج را بشناسیم؛ هرکدام برای نوعی از داده یا الگوی دسترسی می‌تواند مناسب باشد.', types: [
    { icon: Braces, title: 'سندی', en: 'Document', text: 'اطلاعات مرتبط در قالب یک سند', color: 'mint', example: 'MongoDB' },
    { icon: KeyRound, title: 'کلید ـ مقدار', en: 'Key–Value', text: 'یک کلید، مقدار مربوط را پیدا می‌کند', color: 'coral', example: 'Redis' },
    { icon: Layers3, title: 'خانواده‌ستونی', en: 'Wide-column', text: 'برای برخی داده‌های حجیم و توزیع‌شده', color: 'lilac', example: 'Cassandra' },
    { icon: Network, title: 'گرافی', en: 'Graph', text: 'تمرکز بر ارتباط میان موجودیت‌ها', color: 'gold', example: 'Neo4j' },
  ]},
  { section: 'NoSQL', eyebrow: '۰۸ / مثال کاربردی', title: 'یک محصول به شکل سند', intro: 'در دیتابیس سندگرا، ویژگی‌های مرتبط یک محصول می‌توانند کنار هم ذخیره شوند.', document: true, foot: 'JSON قالبی رایج برای نمایش داده است؛ MongoDB داده‌ها را معمولاً با قالب BSON ذخیره می‌کند.' },
  { section: 'NoSQL', eyebrow: '۰۹ / مدل‌های دیگر', title: 'سه مدل دیگر با یک مثال ساده', cards: [
    { icon: KeyRound, title: 'کلید ـ مقدار', text: 'مثل دفترچه‌ای سریع: کلیدِ user:42 به اطلاعات کاربر می‌رسد.', color: 'coral', label: 'نمونه: Redis' },
    { icon: Layers3, title: 'خانواده‌ستونی', text: 'برای حجم زیاد داده و الگوهای دسترسی مشخص کاربرد دارد.', color: 'lilac', label: 'نمونه: Cassandra' },
    { icon: GitBranch, title: 'گرافی', text: 'وقتی ارتباط‌ها مهم‌اند: دوستِ دوست، مسیرها یا شبکه‌ها.', color: 'gold', label: 'نمونه: Neo4j' },
  ]},
  { section: 'مقایسه', eyebrow: '۱۰ / مقایسهٔ ساده', title: 'SQL و NoSQL چه فرقی دارند؟', intro: 'تفاوت اصلی در مدل ذخیره‌سازی و نوع نیازهایی است که هر سیستم برای پاسخ‌گویی به آن‌ها طراحی شده است.', comparison: true, foot: 'SQL نام یک زبان پرس‌وجو است؛ این مقایسه دربارهٔ پایگاه‌داده‌های رابطه‌ای در برابر خانواده‌های NoSQL است.' },
  { section: 'انتخاب', eyebrow: '۱۱ / انتخاب در عمل', title: 'کجا از چه مدلی استفاده کنیم؟', usecases: [
    { title: 'حسابداری و سفارش مالی', text: 'اغلب SQL گزینهٔ خوبی است؛ رابطه‌ها و تراکنش‌ها اهمیت دارند.', color: 'mint', icon: CheckCircle2 },
    { title: 'پروفایل و کاتالوگ محصول', text: 'مدل سندی ممکن است برای ویژگی‌های متنوع مناسب باشد.', color: 'coral', icon: Braces },
    { title: 'کش و دادهٔ کوتاه‌عمر', text: 'مدل کلید ـ مقدار مانند Redis می‌تواند مفید باشد.', color: 'lilac', icon: Zap },
    { title: 'شبکهٔ ارتباطات', text: 'مدل گرافی برای بررسی ارتباط میان افراد مناسب است.', color: 'gold', icon: Network },
  ], foot: 'این‌ها مثال‌اند، نه قانون قطعی؛ یک برنامه می‌تواند هم‌زمان از چند نوع دیتابیس استفاده کند.' },
  { section: 'انتخاب', eyebrow: '۱۲ / نگاه واقع‌بینانه', title: 'مزایا و نکاتی که باید بدانیم', prosCons: true, foot: 'NoSQL به‌تنهایی تضمین نمی‌کند برنامه‌ای ارزان‌تر، امن‌تر یا سریع‌تر شود؛ طراحی و پیاده‌سازی همچنان مهم‌اند.' },
  { section: 'جمع‌بندی', eyebrow: '۱۳ / مرور نهایی', title: 'چهار نکته که باید به خاطر بسپاریم', summary: true },
  { section: 'منابع', eyebrow: '۱۴ / مطالعهٔ بیشتر', title: 'منابع معتبر برای ادامهٔ مطالعه', sources: [
    { name: 'IBM — What is a database?', url: 'https://www.ibm.com/think/topics/database', desc: 'مفاهیم پایهٔ پایگاه‌داده' },
    { name: 'MongoDB — Types of NoSQL databases', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained/types-of-nosql-database-management-systems', desc: 'مروری بر مدل‌های NoSQL' },
    { name: 'Google Cloud — What is NoSQL?', url: 'https://cloud.google.com/discover/what-is-nosql', desc: 'تعریف و کاربردهای NoSQL' },
    { name: 'Microsoft Learn — Data store models', url: 'https://learn.microsoft.com/en-us/azure/architecture/data-guide/technology-choices/understand-data-store-models', desc: 'راهنمای انتخاب مدل داده' },
  ]},
];

const colorMap = {
  mint: { text: 'text-mint', bg: 'bg-mint/10', border: 'border-mint/25', solid: 'bg-mint', line: 'bg-mint/70' },
  coral: { text: 'text-coral', bg: 'bg-coral/10', border: 'border-coral/25', solid: 'bg-coral', line: 'bg-coral/70' },
  lilac: { text: 'text-lilac', bg: 'bg-lilac/10', border: 'border-lilac/25', solid: 'bg-lilac', line: 'bg-lilac/70' },
  gold: { text: 'text-amber-300', bg: 'bg-amber-300/10', border: 'border-amber-300/25', solid: 'bg-amber-300', line: 'bg-amber-300/70' },
};

function Pill({ children, color = 'mint' }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${colorMap[color].text} ${colorMap[color].bg} ${colorMap[color].border}`}>{children}</span>;
}
function Card({ item, index = 0 }) {
  const Icon = item.icon || Database; const c = colorMap[item.color || 'mint'];
  return <article className="glass group rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[.08] sm:p-6">
    <div className="mb-5 flex items-center justify-between"><span className={`grid h-12 w-12 place-items-center rounded-2xl ${c.bg} ${c.text}`}><Icon size={23}/></span><span className="text-xs tracking-[.2em] text-white/30">0{index + 1}</span></div>
    {item.label && <p className={`mb-2 text-xs font-bold ${c.text}`}>{item.label}</p>}
    <h3 className="mb-2 text-lg font-extrabold text-white sm:text-xl">{item.title}</h3>
    <p className="text-sm leading-7 text-white/60">{item.text}</p>
    {item.example && <p className={`mt-4 text-xs font-bold ${c.text}`}>{item.example}</p>}
  </article>;
}
function TableVisual() {
  const rows = [['۱۰۱', 'سارا', 'کامپیوتر', '۳'], ['۱۰۲', 'علی', 'شبکه', '۲'], ['۱۰۳', 'نیما', 'نرم‌افزار', '۴']];
  const heads = ['شماره', 'نام دانشجو', 'رشته', 'ترم'];
  return <div className="glass overflow-hidden rounded-3xl">
    <div className="grid grid-cols-4 bg-lilac/15">{heads.map((h, i) => <div key={h} className={`p-3 text-center text-xs font-bold sm:p-4 sm:text-sm ${i === 0 ? 'text-mint' : 'text-lilac'}`}>{h}</div>)}</div>
    {rows.map((row, i) => <div key={row[0]} className={`grid grid-cols-4 border-t border-white/10 ${i % 2 ? 'bg-white/[.015]' : ''}`}>{row.map((v, j) => <div key={j} className="p-3 text-center text-xs text-white/80 sm:p-4 sm:text-sm">{v}</div>)}</div>)}
  </div>;
}
function SlideContent({ slide }) {
  if (slide.type === 'cover') return <div className="relative flex min-h-[65vh] flex-col justify-center overflow-hidden py-8">
    <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-coral/20 blur-3xl"/><div className="absolute right-1/3 top-16 h-64 w-64 rounded-full bg-mint/10 blur-3xl"/>
    <Pill>ارائهٔ پژوهشی · پایگاه‌داده‌ها</Pill>
    <h1 className="relative mt-8 max-w-4xl text-4xl font-black leading-[1.35] tracking-tight sm:text-6xl lg:text-7xl">دیتابیس از صفر<br/><span className="text-mint">تا NoSQL</span></h1>
    <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-xl">{slide.subtitle}</p>
    <div className="mt-10 flex flex-wrap items-center gap-4"><div className="h-px w-12 bg-coral"/><p className="text-sm text-white/60">ارائه‌دهنده: <strong className="text-white">حسین حسنی</strong></p></div>
    <div className="mt-14 flex items-center gap-3 text-xs text-white/35"><Database size={16}/><span>مفاهیم پایه</span><span className="text-mint">✦</span><span>مدل‌های داده</span><span className="text-mint">✦</span><span>NoSQL</span></div>
  </div>;

  return <div className="slide-in">
    <div className="mb-5 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-coral"/><span className="text-xs font-bold tracking-wide text-mint">{slide.eyebrow}</span></div>
    <h2 className="max-w-4xl text-3xl font-black leading-[1.45] sm:text-4xl lg:text-5xl">{slide.title}</h2>
    {slide.intro && <p className="mt-5 max-w-4xl text-sm leading-8 text-white/65 sm:text-base">{slide.intro}</p>}

    {slide.cards && <div className={`mt-8 grid gap-4 ${slide.cards.length === 4 ? 'sm:grid-cols-2' : 'md:grid-cols-3'}`}>{slide.cards.map((item, i) => <Card item={item} index={i} key={item.title}/>)}</div>}

    {slide.flow && <div className="mt-10 grid gap-4 md:grid-cols-3">{slide.flow.map((item, i) => { const Icon = item.icon; const c = colorMap[item.color]; return <div key={item.title} className="relative"><div className="glass h-full rounded-3xl p-6"><div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl ${c.bg} ${c.text}`}><Icon size={27}/></div><p className={`text-xs font-bold ${c.text}`}>مرحلهٔ {i + 1}</p><h3 className="mt-2 text-xl font-extrabold">{item.title}</h3><p className="mt-2 text-sm text-white/55">{item.text}</p></div>{i < 2 && <ArrowLeft className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 text-white/30 md:block" size={22}/>}</div>; })}</div>}

    {slide.table && <div className="mt-8 grid items-center gap-5 lg:grid-cols-[1.6fr_1fr]"><TableVisual/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-2xl border border-coral/20 bg-coral/10 p-5"><p className="font-extrabold text-coral">ردیف</p><p className="mt-1 text-sm text-white/65">یک رکورد؛ مثلاً اطلاعات یک دانشجو</p></div><div className="rounded-2xl border border-mint/20 bg-mint/10 p-5"><p className="font-extrabold text-mint">ستون</p><p className="mt-1 text-sm text-white/65">یک ویژگی؛ مثل نام یا رشته</p></div></div></div>}

    {slide.compare && <div className="mt-8 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]"><div className="glass rounded-3xl p-6"><Pill color="lilac">جدول</Pill><div className="mt-5 space-y-3">{['نام', 'قیمت', 'موجودی'].map(x => <div key={x} className="rounded-xl bg-white/[.05] px-4 py-3 text-sm text-white/75">{x}</div>)}</div></div><div className="rotate-90 text-3xl font-light text-coral md:rotate-0">←</div><div className="rounded-3xl border border-mint/20 bg-mint/[.06] p-6"><Pill>سند منعطف</Pill><pre dir="ltr" className="mt-5 overflow-x-auto rounded-2xl bg-black/20 p-4 text-xs leading-7 text-mint sm:text-sm">{`{\n  "name": "کفش",\n  "sizes": [38, 39, 40],\n  "color": "مشکی"\n}`}</pre></div></div>}

    {slide.bigNoSql && <div className="mt-8 grid items-center gap-6 md:grid-cols-[.8fr_1.2fr]"><div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/[.03] p-7"><div className="text-center"><p className="text-5xl font-black tracking-tight sm:text-7xl"><span className="text-coral">No</span><span className="text-mint">SQL</span></p><div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-l from-coral to-mint"/></div></div><div className="glass rounded-3xl p-7"><div className="mb-4 flex items-center gap-3"><Sparkles className="text-lilac"/><h3 className="text-xl font-extrabold">نه فقط SQL</h3></div><p className="leading-8 text-white/65">پایگاه‌داده‌های NoSQL می‌توانند سند، جفت کلیدـمقدار، دادهٔ خانواده‌ستونی یا گراف را ذخیره کنند. انتخاب مدل به نوع داده و روش استفاده از آن بستگی دارد.</p></div></div>}

    {slide.types && <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{slide.types.map((item, i) => <div key={item.title} className="glass rounded-3xl p-5"><div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl ${colorMap[item.color].bg} ${colorMap[item.color].text}`}><item.icon size={28}/></div><h3 className="text-lg font-extrabold">{item.title}</h3><p className="mt-1 text-xs font-semibold text-white/35" dir="ltr">{item.en}</p><p className="mt-4 min-h-12 text-sm leading-7 text-white/60">{item.text}</p><div className={`mt-5 border-t pt-4 text-xs font-bold ${colorMap[item.color].text} ${colorMap[item.color].border}`}>{item.example}</div></div>)}</div>}

    {slide.document && <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="overflow-hidden rounded-3xl border border-mint/20 bg-[#111020] p-5 sm:p-7"><div className="mb-5 flex items-center justify-between"><Pill>نمونهٔ سند</Pill><span className="text-xs text-white/30">product.json</span></div><pre dir="ltr" className="overflow-x-auto text-sm leading-8 sm:text-base"><code><span className="text-white/60">{'{'}</span>{'\n'}  <span className="text-lilac">&quot;name&quot;</span><span className="text-white/60">: </span><span className="text-mint">&quot;کوله‌پشتی&quot;</span>,{'\n'}  <span className="text-lilac">&quot;price&quot;</span><span className="text-white/60">: </span><span className="text-coral">450000</span>,{'\n'}  <span className="text-lilac">&quot;colors&quot;</span><span className="text-white/60">: [</span><span className="text-mint">&quot;مشکی&quot;</span>, <span className="text-mint">&quot;آبی&quot;</span><span className="text-white/60">]</span>,{'\n'}  <span className="text-lilac">&quot;available&quot;</span><span className="text-white/60">: </span><span className="text-coral">true</span>{'\n'}<span className="text-white/60">{' }'}</span></code></pre></div><div className="grid gap-4"><div className="glass rounded-3xl p-6"><Database className="mb-4 text-mint"/><h3 className="font-extrabold">نمونهٔ شناخته‌شده</h3><p className="mt-2 text-sm leading-7 text-white/60">MongoDB یکی از پایگاه‌داده‌های سندگراست.</p></div><div className="glass rounded-3xl p-6"><ListChecks className="mb-4 text-coral"/><h3 className="font-extrabold">نکتهٔ مهم</h3><p className="mt-2 text-sm leading-7 text-white/60">ساختار منعطف مفید است، اما جای طراحی درست را نمی‌گیرد.</p></div></div></div>}

    {slide.comparison && <div className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-3xl border border-lilac/20 bg-lilac/[.06] p-6 sm:p-8"><Pill color="lilac">RELATIONAL</Pill><h3 className="mt-5 text-3xl font-black">SQL</h3><ul className="mt-5 space-y-4 text-sm leading-7 text-white/65"><li>• جدول‌ها و رابطه‌های مشخص</li><li>• ساختار معمولاً از پیش تعریف‌شده‌تر</li><li>• مناسب بسیاری از سامانه‌های تراکنشی</li></ul></div><div className="rounded-3xl border border-mint/20 bg-mint/[.05] p-6 sm:p-8"><Pill>NoSQL</Pill><h3 className="mt-5 text-3xl font-black">NoSQL</h3><ul className="mt-5 space-y-4 text-sm leading-7 text-white/65"><li>• چند مدل مختلف ذخیره‌سازی</li><li>• در بسیاری از مدل‌ها ساختار منعطف‌تر</li><li>• مناسب بعضی نیازهای تخصصی یا توزیع‌شده</li></ul></div></div>}

    {slide.usecases && <div className="mt-8 space-y-3">{slide.usecases.map((item, i) => <div key={item.title} className="glass flex items-start gap-4 rounded-2xl p-4 sm:items-center sm:p-5"><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${colorMap[item.color].bg} ${colorMap[item.color].text}`}><item.icon size={22}/></div><div className="grid flex-1 gap-1 sm:grid-cols-[.8fr_1.2fr] sm:items-center sm:gap-5"><h3 className="font-extrabold">{item.title}</h3><p className="text-sm leading-7 text-white/55">{item.text}</p></div></div>)}</div>}

    {slide.prosCons && <div className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-3xl border border-mint/20 bg-mint/[.05] p-6 sm:p-8"><Pill>نقاط قوت</Pill><ul className="mt-6 space-y-4 text-sm leading-7 text-white/70"><li>＋ انعطاف در شکل داده</li><li>＋ مدل‌های تخصصی برای نیازهای مختلف</li><li>＋ امکان توزیع داده در چند سرور</li></ul></div><div className="rounded-3xl border border-coral/20 bg-coral/[.05] p-6 sm:p-8"><Pill color="coral">ملاحظات</Pill><ul className="mt-6 space-y-4 text-sm leading-7 text-white/70"><li>! طراحی داده همچنان مهم است</li><li>! روش پرس‌وجو در محصولات فرق می‌کند</li><li>! امنیت و پشتیبان‌گیری ضروری‌اند</li></ul></div></div>}

    {slide.summary && <div className="mt-8 grid gap-4 sm:grid-cols-2">{[
      { n: '۰۱', title: 'دیتابیس', text: 'برای نگه‌داری، جست‌وجو و مدیریت اطلاعات است.', color: 'mint' },
      { n: '۰۲', title: 'SQL', text: 'در مدل رابطه‌ای، داده‌ها اغلب در جدول‌ها سازمان‌دهی می‌شوند.', color: 'lilac' },
      { n: '۰۳', title: 'NoSQL', text: 'چند مدل دارد؛ از سندی تا گرافی و کلیدـمقدار.', color: 'coral' },
      { n: '۰۴', title: 'انتخاب درست', text: 'به نوع داده و نیاز برنامه بستگی دارد.', color: 'gold' },
    ].map(x => <div key={x.n} className="glass flex gap-4 rounded-3xl p-5 sm:p-6"><span className={`text-3xl font-black ${colorMap[x.color].text}`}>{x.n}</span><div><h3 className="text-lg font-extrabold">{x.title}</h3><p className="mt-2 text-sm leading-7 text-white/60">{x.text}</p></div></div>)}</div>}

    {slide.sources && <div className="mt-8 grid gap-3">{slide.sources.map((item, i) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className="glass group flex items-center gap-4 rounded-2xl p-4 transition hover:border-mint/30 hover:bg-white/[.08] sm:p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint/10 text-mint"><BookOpen size={21}/></span><span className="min-w-0 flex-1"><strong className="block text-sm sm:text-base">{item.name}</strong><span className="mt-1 block text-xs text-white/45">{item.desc}</span></span><ArrowLeft className="shrink-0 text-white/35 transition group-hover:-translate-x-1 group-hover:text-mint" size={20}/></a>)}</div>}

    {slide.foot && <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-5 text-xs leading-7 text-white/45 sm:text-sm"><CircleHelp className="mt-1 shrink-0 text-lilac" size={17}/><p>{slide.foot}</p></div>}
  </div>;
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const slide = slides[current];
const go = useCallback((n) => {
  setCurrent(Math.max(0, Math.min(slides.length - 1, n)));

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); setCurrent(v => Math.min(slides.length - 1, v + 1)); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); setCurrent(v => Math.max(0, v - 1)); }
      if (e.key === 'Home') setCurrent(0);
      if (e.key === 'End') setCurrent(slides.length - 1);
      if (e.key === 'Escape') setOverview(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) { await document.documentElement.requestFullscreen(); setFullscreen(true); }
      else { await document.exitFullscreen(); setFullscreen(false); }
    } catch { setFullscreen(false); }
  };

  return <main className="relative min-h-screen overflow-hidden bg-ink">
    <div className="deck-grid pointer-events-none absolute inset-0 opacity-70"/>
    <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-lilac/10 blur-[100px]"/>
    <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-mint/[.07] blur-[100px]"/>
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-5 sm:px-8 lg:px-12">
      <button onClick={() => go(0)} className="flex items-center gap-3 text-right" aria-label="رفتن به اسلاید اول"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-ink"><Database size={21}/></span><span><strong className="block text-sm font-black">NoSQL</strong><span className="mt-0.5 block text-[10px] text-white/40">ارائهٔ تعاملی</span></span></button>
      <div className="hidden items-center gap-2 text-xs text-white/45 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-mint"/> حسین حسنی <span className="mx-1 text-white/20">/</span> تحقیق NoSQL</div>
      <div className="flex items-center gap-2"><button onClick={() => setOverview(v => !v)} className={`rounded-xl border p-2.5 transition ${overview ? 'border-mint/30 bg-mint/10 text-mint' : 'border-white/10 text-white/60 hover:bg-white/5'}`} aria-label="نمایش فهرست اسلایدها" title="فهرست اسلایدها"><Table2 size={18}/></button><button onClick={toggleFullscreen} className="rounded-xl border border-white/10 p-2.5 text-white/60 transition hover:bg-white/5" aria-label="تمام صفحه" title="تمام صفحه">{fullscreen ? <Minimize size={18}/> : <Maximize size={18}/>}</button></div>
    </header>

    <section className="relative z-10 mx-auto grid min-h-[calc(100vh-150px)] w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-6 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 lg:px-12">
      <aside className="hidden lg:block"><div className="sticky top-6 rounded-3xl border border-white/10 bg-white/[.025] p-4"><p className="mb-4 px-2 text-xs font-bold text-white/35">فهرست ارائه</p><nav className="space-y-1">{slides.map((s, i) => <button key={`${s.title}-${i}`} onClick={() => { go(i); setOverview(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-xs transition ${i === current ? 'bg-mint text-ink font-extrabold' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`}><span className="w-5 text-center font-mono">{String(i + 1).padStart(2, '0')}</span><span className="truncate">{s.title}</span></button>)}</nav><div className="mt-5 border-t border-white/10 pt-4"><p className="text-[10px] leading-6 text-white/30">برای جابه‌جایی از کلیدهای جهت‌نما استفاده کن.</p></div></div></aside>

      <div className="relative min-w-0">
        {overview ? <div className="slide-in grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{slides.map((s, i) => <button key={`${s.title}-${i}`} onClick={() => { go(i); setOverview(false); }} className={`min-h-36 rounded-2xl border p-5 text-right transition hover:-translate-y-0.5 ${i === current ? 'border-mint/50 bg-mint/10' : 'border-white/10 bg-white/[.035] hover:bg-white/[.06]'}`}><span className={`text-xs font-bold ${i === current ? 'text-mint' : 'text-white/30'}`}>اسلاید {String(i + 1).padStart(2, '0')}</span><strong className="mt-4 block leading-7">{s.title}</strong><span className="mt-2 block text-xs text-white/35">{s.section || 'شروع'}</span></button>)}</div> : <div key={current} className="slide-in min-h-[62vh] rounded-[2rem] border border-white/[.08] bg-[#1e1b38]/75 p-5 shadow-glow sm:p-8 lg:p-10 xl:p-12"><SlideContent slide={slide}/></div>}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="text-xs font-bold text-white/70">{String(current + 1).padStart(2, '0')}</span><div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10 sm:w-44"><div className="h-full rounded-full bg-mint transition-all duration-300" style={{ width: `${((current + 1) / slides.length) * 100}%` }}/></div><span className="text-xs text-white/35">{slides.length} اسلاید</span></div><div className="flex items-center gap-2"><button onClick={() => go(current - 1)} disabled={current === 0} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-25"><ChevronRight size={17}/> قبلی</button><button onClick={() => go(current + 1)} disabled={current === slides.length - 1} className="inline-flex items-center gap-2 rounded-xl bg-mint px-4 py-2.5 text-sm font-extrabold text-ink transition hover:bg-[#a7f4d4] disabled:cursor-not-allowed disabled:opacity-25">بعدی <ChevronLeft size={17}/></button></div></div>
      </div>
    </section>
    <footer className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 border-t border-white/[.07] px-4 py-4 text-[10px] text-white/30 sm:px-8 lg:px-12"><span>موضوع تحقیق: NoSQL</span><span>حسین حسنی</span><span>ارائهٔ مستقل · بدون بک‌اند</span></footer>
  </main>;
}
