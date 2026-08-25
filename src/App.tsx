import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Search, BookOpen, MessageCircle, Library, PenTool, Activity, Hash, Box, ArrowLeft, CheckCircle, Languages, Calculator, GraduationCap, User, Lock, LogOut, ArrowRight } from 'lucide-react';

// Hardcoded users for simple authentication
const validUsers = [
  { username: 'student1', password: '123' },
  { username: 'student2', password: '123' },
  { username: 'student3', password: '123' },
  { username: 'student4', password: '123' },
  { username: 'student5', password: '123' },
  { username: 'student6', password: '123' },
  { username: 'student7', password: '123' },
  { username: 'student8', password: '123' },
  { username: 'student9', password: '123' },
  { username: 'student10', password: '123' },
];

const subjects = [
  { id: 'calculus', name: { en: 'Calculus', ar: 'التفاضل والتكامل' }, prefix: 'C', dir: 'calculus', icon: Activity },
  { id: 'solid-geometry', name: { en: 'Solid Geometry', ar: 'الهندسة الفراغية' }, prefix: 'SG', dir: 'solid-geometry', icon: Box },
  { id: 'statics', name: { en: 'Statics', ar: 'الإستاتيكا' }, prefix: 'S', dir: 'statics', icon: Library },
  { id: 'dynamics', name: { en: 'Dynamics', ar: 'الديناميكا' }, prefix: 'D', dir: 'dynamics', icon: PenTool },
  { id: 'algebra', name: { en: 'Algebra', ar: 'الجبر' }, prefix: 'A', dir: 'algebra', icon: Hash },
];

const numSessions = 15;

const t = {
  en: {
    title: "Adnan Zahran's Math Hub",
    badge: "Math Tutor",
    slogan1: "Mastering mathematics step by step.",
    slogan2: "Simplifying complex concepts.",
    contact: "Contact via WhatsApp",
    filter: "Filter sessions...",
    noSessions: "No sessions found",
    noSessionsDesc: "We couldn't find any sessions matching",
    clearSearch: "Clear search",
    back: "Back to Sessions",
    classwork: "Classwork",
    cwPdf: "Classwork PDF",
    homework: "Homework",
    unsolvedPdf: "Unsolved PDF",
    solvedPdf: "Solved PDF",
    session: "Session",
    allRights: "All rights reserved.",
    heroWelcome: "Welcome to your premier math learning platform.",
    heroAction: "Enter Platform",
    loginTitle: "Student Login",
    loginDesc: "Please enter your credentials to access the sessions.",
    username: "Username",
    password: "Password",
    loginBtn: "Login",
    loginErr: "Invalid username or password.",
    logout: "Logout",
  },
  ar: {
    title: "منصة أ. عدنان زهران للرياضيات",
    badge: "مدرس رياضيات",
    slogan1: "إتقان الرياضيات خطوة بخطوة.",
    slogan2: "تبسيط المفاهيم المعقدة.",
    contact: "تواصل عبر واتساب",
    filter: "ابحث عن الحصص...",
    noSessions: "لا توجد حصص",
    noSessionsDesc: "لم نتمكن من العثور على حصص تطابق",
    clearSearch: "مسح البحث",
    back: "العودة للحصص",
    classwork: "حصة الشرح (العمل الصفي)",
    cwPdf: "ملزمة الشرح",
    homework: "الواجب",
    unsolvedPdf: "الواجب (غير محلول)",
    solvedPdf: "الواجب (محلول)",
    session: "حصة",
    allRights: "جميع الحقوق محفوظة.",
    heroWelcome: "مرحباً بك في منصتك التعليمية الشاملة للرياضيات.",
    heroAction: "دخول المنصة",
    loginTitle: "تسجيل دخول الطالب",
    loginDesc: "يرجى إدخال بياناتك للوصول إلى الحصص.",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    loginBtn: "دخول",
    loginErr: "اسم المستخدم أو كلمة المرور غير صحيحة.",
    logout: "تسجيل خروج",
  }
};

type ViewState = 'home' | 'login' | 'dashboard';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<ViewState>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState(subjects[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const activeSubject = useMemo(() => subjects.find((s) => s.id === activeTab) || subjects[0], [activeTab]);
  const text = t[lang];
  const isRtl = lang === 'ar';

  const filteredSessions = useMemo(() => {
    const sessions = Array.from({ length: numSessions }, (_, i) => i + 1);
    if (!searchQuery) return sessions;
    return sessions.filter((session) => 
      `${text.session} ${session}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activeSubject.name[lang].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeSubject, lang, text.session]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSelectedSession(null);
    setSearchQuery('');
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleEnterPlatform = () => {
    if (isLoggedIn) {
      setView('dashboard');
    } else {
      setView('login');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = validUsers.find(u => u.username === usernameInput && u.password === passwordInput);
    if (user) {
      setIsLoggedIn(true);
      setErrorMsg('');
      setView('dashboard');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setErrorMsg(text.loginErr);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
    setSelectedSession(null);
  };

  return (
    <div 
      className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-violet-500/20 selection:text-violet-900 flex flex-col"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8b5cf614_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf614_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start justify-between md:justify-start w-full md:w-auto gap-4">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setView('home')}
              >
                <div className="p-3 bg-violet-100 rounded-2xl border border-violet-200 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-200/50 to-transparent pointer-events-none" />
                  <GraduationCap className="w-8 h-8 text-violet-700 relative z-10" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
                      <Calculator className="w-3.5 h-3.5" />
                      {text.badge}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                    {text.title}
                  </h1>
                </div>
              </motion.div>
              
              {/* Mobile Language Toggle */}
              <button 
                onClick={toggleLanguage}
                className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors border border-slate-200"
                aria-label="Toggle Language"
              >
                <Languages className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 flex-wrap md:flex-nowrap"
            >
              <button 
                onClick={toggleLanguage}
                className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors border border-slate-200 shadow-sm"
              >
                <Languages className="w-4 h-4" />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>

              <a 
                href="https://wa.me/201060921688" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-1 justify-center md:flex-none items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white rounded-xl font-bold transition-all duration-300 border border-[#25D366]/30 shadow-sm"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden sm:inline">{text.contact}</span>
              </a>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{text.logout}</span>
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col">
        <AnimatePresence mode="wait">
          {/* HOME VIEW */}
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-grow flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-12 md:py-24"
            >
              <div className="w-24 h-24 bg-violet-100 text-violet-700 rounded-3xl flex items-center justify-center mb-8 border border-violet-200 shadow-xl shadow-violet-500/10 rotate-3">
                <BookOpen className="w-12 h-12 -rotate-3" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                {text.heroWelcome}
              </h2>
              <p className="text-lg md:text-2xl text-slate-500 font-medium mb-12 flex flex-col sm:flex-row items-center gap-2 justify-center">
                <span>{text.slogan1}</span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span>{text.slogan2}</span>
              </p>
              <button
                onClick={handleEnterPlatform}
                className="group flex items-center gap-3 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-1"
              >
                {text.heroAction}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''}`} />
              </button>
            </motion.div>
          )}

          {/* LOGIN VIEW */}
          {view === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex-grow flex flex-col items-center justify-center py-12"
            >
              <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 end-0 -mt-10 -me-10 w-40 h-40 bg-violet-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                
                <div className="text-center mb-8 relative z-10">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{text.loginTitle}</h2>
                  <p className="text-slate-500 mt-2 font-medium">{text.loginDesc}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      {text.username}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        className="w-full ps-11 pe-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all font-medium text-slate-900"
                        placeholder="student1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      {text.password}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full ps-11 pe-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all font-medium text-slate-900"
                        placeholder="••••••"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100"
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-all shadow-md shadow-violet-500/20 active:scale-[0.98]"
                  >
                    {text.loginBtn}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setView('home')}
                    className="w-full py-3 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors"
                  >
                    {text.back}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* DASHBOARD VIEW */}
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-grow flex flex-col"
            >
              {/* Controls - Only show if not inside a session */}
              <AnimatePresence>
                {!selectedSession && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 overflow-hidden"
                  >
                    {/* Tabs */}
                    <div className="flex overflow-x-auto hide-scrollbar w-full md:w-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      {subjects.map((subj) => {
                        const isActive = activeTab === subj.id;
                        const Icon = subj.icon;
                        return (
                          <button
                            key={subj.id}
                            onClick={() => handleTabChange(subj.id)}
                            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors duration-200 whitespace-nowrap ${
                              isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-violet-600 rounded-xl shadow-sm"
                                initial={false}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {subj.name[lang]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                      <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        placeholder={text.filter}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full ps-11 pe-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 font-medium"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content Area */}
              <AnimatePresence mode="wait">
                {!selectedSession ? (
                  /* Master View: Grid of Sessions */
                  <motion.div
                    key={`grid-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredSessions.length > 0 ? (
                      filteredSessions.map((session, index) => (
                        <motion.div
                          key={`${activeSubject.id}-${session}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          onClick={() => setSelectedSession(session)}
                          className="group bg-white border border-slate-200 shadow-sm hover:shadow-md rounded-2xl overflow-hidden hover:border-violet-300 transition-all cursor-pointer flex flex-col p-6 items-center justify-center gap-4 relative"
                        >
                          <div className="w-16 h-16 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center text-2xl font-bold group-hover:scale-110 group-hover:bg-violet-100 transition-transform duration-300 shadow-sm border border-violet-100">
                            {session}
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-slate-900 text-lg">{text.session} {session}</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">{activeSubject.name[lang]}</p>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 border border-slate-200">
                          <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{text.noSessions}</h3>
                        <p className="text-slate-500 mt-1 max-w-sm font-medium">
                          {text.noSessionsDesc} "{searchQuery}".
                        </p>
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="mt-6 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors border border-slate-200"
                        >
                          {text.clearSearch}
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* Detail View: Selected Session */
                  <motion.div
                    key={`detail-${selectedSession}`}
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-5xl mx-auto"
                  >
                    <button 
                      onClick={() => setSelectedSession(null)}
                      className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
                    >
                      <div className="p-2 bg-white rounded-full border border-slate-200 shadow-sm group-hover:bg-slate-50 transition-colors">
                        <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                      </div>
                      {text.back}
                    </button>

                    <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                      {/* Decorative background circle */}
                      <div className="absolute top-0 end-0 -mt-20 -me-20 w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-100 relative z-10">
                        <div>
                          <h2 className="text-3xl font-bold text-slate-900">{text.session} {selectedSession}</h2>
                          <p className="text-slate-500 mt-2 text-lg font-medium">{activeSubject.name[lang]}</p>
                        </div>
                        <div className="p-4 bg-violet-50 text-violet-600 rounded-2xl border border-violet-100 shadow-sm">
                          {(() => {
                            const Icon = activeSubject.icon;
                            return <Icon className="w-8 h-8" />;
                          })()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                        {/* Classwork Column */}
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-violet-100 text-violet-700 rounded-lg">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{text.classwork}</h3>
                          </div>

                          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-slate-900/5 shadow-md group">
                            <video 
                              controls 
                              preload="none"
                              className="w-full h-full object-cover"
                              poster={`https://ui-avatars.com/api/?name=${encodeURIComponent(activeSubject.name[lang])}+${selectedSession}+CW&background=f8fafc&color=7c3aed&size=640&font-size=0.12`}
                            >
                              <source src={`videos/${activeSubject.dir}/${activeSubject.prefix}_CW${selectedSession}_V.mp4`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>

                          <div className="flex flex-col gap-3">
                            <a 
                              href={`pdfs/${activeSubject.dir}/${activeSubject.prefix}_CW${selectedSession}.pdf`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 px-6 py-4 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-2xl font-bold text-sm border border-violet-200 hover:border-violet-300 transition-all duration-200 shadow-sm"
                            >
                              <FileText className="w-5 h-5" />
                              {text.cwPdf}
                            </a>
                          </div>
                        </div>

                        {/* Homework Column */}
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                              <PenTool className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{text.homework}</h3>
                          </div>

                          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-slate-900/5 shadow-md">
                            <video 
                              controls 
                              preload="none"
                              className="w-full h-full object-cover"
                              poster={`https://ui-avatars.com/api/?name=${encodeURIComponent(activeSubject.name[lang])}+${selectedSession}+HW&background=f8fafc&color=059669&size=640&font-size=0.12`}
                            >
                              <source src={`videos/${activeSubject.dir}/${activeSubject.prefix}_HW${selectedSession}_V.mp4`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <a 
                              href={`pdfs/${activeSubject.dir}/${activeSubject.prefix}_HW${selectedSession}.pdf`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-sm border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-sm"
                            >
                              <FileText className="w-5 h-5 text-slate-400" />
                              {text.unsolvedPdf}
                            </a>
                            <a 
                              href={`pdfs/${activeSubject.dir}/${activeSubject.prefix}_HW${selectedSession}_S.pdf`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl font-bold text-sm border border-emerald-200 hover:border-emerald-300 transition-all duration-200 shadow-sm"
                            >
                              <CheckCircle className="w-5 h-5" />
                              {text.solvedPdf}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur-md py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} {text.title}. {text.allRights}</p>
        </div>
      </footer>
    </div>
  );
}
