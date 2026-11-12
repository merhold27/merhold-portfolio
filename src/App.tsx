import React, { useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Code,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  Terminal,
  User,
  Wifi,
  X,
  FileCode,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  Facebook
} from 'lucide-react';

interface Certificate {
  id: string;
  imagePath: string;
  title: string;
  awardType: string;
  event: string;
  issuer: string;
  recipient: string;
  citation: string;
  date: string;
  signatories: string[];
  category: 'academic' | 'campus';
  highlightBadge?: string;
  colorScheme: 'emerald' | 'amber' | 'cyan' | 'purple';
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'cert1',
    imagePath: 'images/cert1.jpg',
    title: 'Certificate of "Hotspot ng Lahat"',
    awardType: 'Special Recognition Award',
    event: '4th Techcellence Awards',
    issuer: 'Cavite State University – Bacoor City Campus (Department of Computer Studies / Alliance of Computer Scientists)',
    recipient: 'Merhold B. Petes',
    citation:
      'In recognition of your unmatched generosity and reliable connectivity, keeping your classmates connected, updated, and online through every lecture and lab session.',
    date: 'October 28, 2026',
    signatories: [
      'Jovelyn D. Ocampo, MIT (Chairperson, DCS)',
      'Steffanie M. Bato, MIT (Head, OSAS)',
      'Menvyluz S. Macalalad, MBA (Campus Administrator)',
    ],
    category: 'academic',
    highlightBadge: 'Peer Community Champion',
    colorScheme: 'emerald',
  },
  {
    id: 'cert2',
    imagePath: 'images/cert2.jpg',
    title: 'Certificate of "Most Crammer"',
    awardType: 'Class Camaraderie Award',
    event: '4th Techcellence Awards',
    issuer: 'Cavite State University – Bacoor City Campus (Department of Computer Studies / Alliance of Computer Scientists)',
    recipient: 'BSCS 3-3 (Class Award)',
    citation:
      'Awarded to BSCS 3-3 in celebration of the relentless midnight sprints, deadline clutch moments, and undeniable camaraderie that defines the computer science student spirit.',
    date: 'October 28, 2026',
    signatories: [
      'Jovelyn D. Ocampo, MIT (Chairperson, DCS)',
      'Steffanie M. Bato, MIT (Head, OSAS)',
      'Menvyluz S. Macalalad, MBA (Campus Administrator)',
    ],
    category: 'campus',
    highlightBadge: 'BSCS 3-3 Class Honor',
    colorScheme: 'amber',
  },
  {
    id: 'cert3',
    imagePath: 'images/cert3.jpg',
    title: 'Certificate of Achievement – Champion',
    awardType: 'University Championship',
    event: 'Zumba Nation Competition 2025 ("Shake It To Win It")',
    issuer: 'NSTP (National Service Training Program), Cavite State University – Bacoor City Campus',
    recipient: 'Merhold Bale Petes & Ensemble',
    citation:
      'In honor for emerging as the Champion during the Zumba Nation Competition 2025 with the theme "Shake It To Win It" — in recognition of outstanding performance, exceptional choreography, and inspiring energy.',
    date: 'June 13, 2025',
    signatories: [
      'Steffanie M. Bato, MIT (NSTP Coordinator)',
      'Menvyluz S. Macalalad, MBA (Campus Administrator)',
    ],
    category: 'campus',
    highlightBadge: 'CvSU NSTP Champion',
    colorScheme: 'cyan',
  },
  {
    id: 'cert4',
    imagePath: 'images/cert4.jpg',
    title: 'Certificate of Award – Best in Choreography',
    awardType: 'Artistic & Performance Excellence',
    event: 'Zumba Nation Competition 2025 ("Shake It To Win It")',
    issuer: 'NSTP, Cavite State University – Bacoor City Campus',
    recipient: 'Merhold Bale Petes & Ensemble',
    citation:
      'In recognition of Outstanding Performance in Choreography during the Zumba Nation Competition 2025 with the theme "Shake It To Win It" — honoring creativity, precision, and artistry in developing choreography.',
    date: 'June 13, 2025',
    signatories: [
      'Steffanie M. Bato, MIT (NSTP Coordinator)',
      'Menvyluz S. Macalalad, MBA (Campus Administrator)',
    ],
    category: 'campus',
    highlightBadge: 'Best Choreography Honor',
    colorScheme: 'purple',
  },
  {
    id: 'cert5',
    imagePath: 'images/cert5.jpg',
    title: 'Certificate of Achievement (90.62% Academic Average)',
    awardType: 'Academic Excellence Award',
    event: 'Grade 11 - Ruby, Midterm Grade – 1st Semester, S.Y. 2022–2023',
    issuer: 'Datacom Institute of Computer Technology Corporation – Senior High School',
    recipient: 'Petes, Merhold Bale',
    citation:
      'Congratulations, for your great performance shown during this Quarter. We really appreciate with your contributions: 90.62%.',
    date: 'Academic Year 2022–2023',
    signatories: ['James Patrick D. Tombucon (Class Adviser)'],
    category: 'academic',
    highlightBadge: '90.62% General Average',
    colorScheme: 'emerald',
  },
];

export default function App() {
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [certFilter, setCertFilter] = useState<'all' | 'academic' | 'campus'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDeploymentGuide, setShowDeploymentGuide] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Typewriter effect states
  const typingWords = [
    '3rd Year BSCS Student',
    'Working Student',
    'Problem Solver',
    'Aspiring Software Developer',
    'CvSU Bacoor Peer Leader',
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        if (displayedText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  // Handle keyboard ESC for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCertIndex(null);
        setShowDeploymentGuide(false);
        setShowDownloadModal(false);
      }
      if (activeCertIndex !== null) {
        if (e.key === 'ArrowRight') {
          setActiveCertIndex((prev) => (prev !== null ? (prev + 1) % CERTIFICATES.length : 0));
        } else if (e.key === 'ArrowLeft') {
          setActiveCertIndex((prev) =>
            prev !== null ? (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length : 0
          );
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCertIndex]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      showToast('Email copied to clipboard: merholdpetes@gmail.com');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      showToast('Phone number copied to clipboard: 09771182852');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;

    setFormSubmitted(true);
    showToast('Message composed! Launching your mail client...');
    const mailtoUrl = `mailto:merholdpetes@gmail.com?subject=${encodeURIComponent(
      formSubject || `Portfolio Inquiry from ${formName}`
    )}&body=${encodeURIComponent(
      `Hello Merhold,\n\nName: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  const filteredCertificates =
    certFilter === 'all'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === certFilter);

  // Generate standalone single-file HTML for download
  const handleDownloadSingleFileHtml = () => {
    const standaloneHtml = generateStandaloneHtml();
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Single-file index.html downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-bold font-display tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </span>
            <span>Merhold<span className="text-emerald-400">.dev</span></span>
          </a>

          {/* Zone 2: 5 Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              About
            </a>
            <a href="#journey" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Journey
            </a>
            <a href="#certificates" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Certificates
            </a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Skills & Tech
            </a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Utility Menu */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowDeploymentGuide(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Vercel & Local Setup Instructions"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deploy Guide</span>
            </button>
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-500/20 transition-colors whitespace-nowrap shrink-0"
            >
              Get In Touch
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950/98 px-6 py-5 space-y-4">
            <nav className="flex flex-col gap-3 text-base font-medium text-slate-300">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-400 py-1 transition-colors"
              >
                About Me
              </a>
              <a
                href="#journey"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-400 py-1 transition-colors"
              >
                Working Student Journey
              </a>
              <a
                href="#certificates"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-400 py-1 transition-colors"
              >
                Awards & Certificates
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-400 py-1 transition-colors"
              >
                Skills & Tech Stack
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-400 py-1 transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowDeploymentGuide(true);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 text-sm text-cyan-300 bg-slate-900 border border-slate-800 rounded-lg"
              >
                <FileCode className="w-4 h-4" />
                <span>Local Setup & Vercel Guide</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDownloadSingleFileHtml();
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 text-sm text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 rounded-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Single-File index.html</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/90 tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CvSU Bacoor Campus</span>
                  <span aria-hidden="true">·</span>
                  <span>BSCS 3-3</span>
                  <span aria-hidden="true">·</span>
                  <span>Working Student</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
                    Merhold Bale Petes
                  </h1>
                  <div className="h-9 sm:h-11 flex items-center">
                    <p className="text-xl sm:text-2xl font-semibold text-emerald-400 font-mono flex items-center gap-1">
                      <span>{displayedText}</span>
                      <span className="w-2.5 h-6 bg-emerald-400 animate-pulse ml-0.5 inline-block" />
                    </p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  3rd-year Bachelor of Science in Computer Science student at{' '}
                  <strong className="text-white font-medium">Cavite State University – Bacoor City Campus</strong>.
                  Navigating the dual challenges of a working student while mastering software development, data
                  structures, and web technologies. Known in campus as the peer champion who keeps everyone connected.
                </p>

                {/* Location & Quick Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Kaunlaran 2 Village, Molino 3, Bacoor, Cavite</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>Alliance of Computer Scientists (ACS)</span>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#certificates"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Achievements & Certs</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all hover:-translate-y-0.5"
                  >
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Send Message</span>
                  </a>
                  <button
                    onClick={handleDownloadSingleFileHtml}
                    className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors"
                    title="Download pristine single-file index.html"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export index.html</span>
                  </button>
                </div>

                {/* Quick Copy Contact Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <button
                    onClick={() => copyToClipboard('merholdpetes@gmail.com', 'email')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>merholdpetes@gmail.com</span>
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard('09771182852', 'phone')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>09771182852</span>
                    {copiedPhone ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Facebook Profile"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Profile Portrait Container */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm sm:max-w-md">
                  {/* Subtle Glowing Aura */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000" />

                  {/* Main Portrait Card */}
                  <div className="relative bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                      {/* Image element with pre-configured path images/profile.jpg and clean onerror fallback */}
                      <img
                        src="images/profile.jpg"
                        alt='Studio portrait of Merhold Bale Petes wearing a black oversized graphic t-shirt ("Cavite Pride") and silver watch against a warm cream studio backdrop.'
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          // Hide image and show fallback card seamlessly
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />

                      {/* Studio Fallback Avatar Card */}
                      <div
                        id="profile-fallback"
                        style={{ display: 'none' }}
                        className="w-full h-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-center"
                      >
                        <div className="w-full flex justify-between items-center text-xs text-slate-500 font-mono">
                          <span>CAVITE PRIDE</span>
                          <span>BSCS 3-3</span>
                        </div>

                        <div className="relative my-auto">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-emerald-400/30 border-2 border-emerald-400/40 flex items-center justify-center shadow-inner">
                            <span className="text-4xl font-extrabold font-display text-emerald-300">
                              MBP
                            </span>
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-emerald-500/40 rounded-full px-2.5 py-0.5 text-[10px] font-mono text-emerald-300 shadow">
                            CvSU Bacoor
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white font-display">
                            Merhold Bale Petes
                          </h4>
                          <p className="text-xs text-slate-400">
                            Studio Portrait Preview · <code className="text-emerald-400 font-mono">images/profile.jpg</code>
                          </p>
                          <p className="text-[11px] text-slate-500 italic mt-1 max-w-xs mx-auto">
                            "Wearing black oversized 'Cavite Pride' graphic tee & silver watch"
                          </p>
                        </div>
                      </div>

                      {/* Verified Badge Overlay */}
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs text-slate-200 shadow-lg">
                        <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono font-medium">Hotspot ng Lahat</span>
                      </div>
                    </div>

                    {/* Bottom Status Strip */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Available for Internships & Projects</span>
                      </div>
                      <span className="text-slate-500 font-mono">Cavite, PH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric KPI Strip (Adjacency & Quantitative Rigor) */}
            <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">3rd Year</div>
                <div className="text-xs text-slate-400 mt-1">BS Computer Science (BSCS 3-3)</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-3xl font-extrabold font-mono text-cyan-400 tabular-nums">90.62%</div>
                <div className="text-xs text-slate-400 mt-1">High Honor Academic Average</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-3xl font-extrabold font-mono text-purple-400 tabular-nums">5 Awards</div>
                <div className="text-xs text-slate-400 mt-1">Techcellence & University Honors</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-3xl font-extrabold font-mono text-amber-400 tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-1">Working Student Dedication</div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME & WORKING STUDENT STORY */}
        <section id="about" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase">
                01. About & Personal Profile
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mt-2">
                Grit, Code & The Working Student Spirit
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Story Narrative */}
              <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base">
                <p>
                  Kumusta! I am <strong className="text-white">Merhold Bale Petes</strong>, a passionate 3rd-year
                  Computer Science undergraduate at{' '}
                  <strong className="text-white">Cavite State University – Bacoor City Campus</strong>. Being a
                  working student is more than just a schedule—it is a daily masterclass in discipline, time
                  management, and unyielding focus.
                </p>
                <p>
                  Between balancing employment obligations and rigorous BSCS coursework—from Object-Oriented
                  Programming and Database Systems to Algorithm Analysis and Systems Architecture—I have cultivated
                  the resilience required to debug complex problems under tight deadlines.
                </p>
                <p>
                  Beyond individual academics, community is at the heart of my college journey. During the 4th
                  Techcellence Awards hosted by our Department of Computer Studies, I was honored with the memorable{' '}
                  <span className="text-emerald-400 font-semibold">"Hotspot ng Lahat"</span> award—a recognition of
                  ensuring my classmates remained connected, updated, and submitted lab requirements without being left
                  behind.
                </p>

                {/* Values Checklist */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Resourceful Problem Solver under Real-World Constraints</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Collaborative Team Player & Peer Support Champion</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Disciplined Working Student with High Academic GWA</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Proud Bacoor, Cavite Native & CvSU Advocate</span>
                  </div>
                </div>
              </div>

              {/* Bio Details Bento Card */}
              <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Profile Overview</span>
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Full Name</span>
                    <span className="text-white font-medium">Merhold Bale Petes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Academic Standing</span>
                    <span className="text-white font-medium">3rd Year, BSCS 3-3</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Institution</span>
                    <span className="text-emerald-400 font-medium text-right">CvSU – Bacoor City Campus</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Department</span>
                    <span className="text-slate-200 text-right">Dept. of Computer Studies (DCS)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Hometown</span>
                    <span className="text-slate-200">Molino 3, Bacoor, Cavite</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Primary Career Goal</span>
                    <span className="text-cyan-400 font-medium">Software Engineer / Web Dev</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Known For</span>
                    <span className="text-emerald-300 font-medium">Hotspot ng Lahat & Clutch Cramming</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION & TIMELINE */}
        <section id="journey" className="py-20 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono font-medium text-cyan-400 tracking-wider uppercase">
                02. Academic & Personal Milestones
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mt-2">
                Education & Journey
              </h2>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-12">
              {/* Item 1: Cavite State University */}
              <div className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-emerald-400 border-4 border-slate-950 shadow" />
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2 font-mono">
                    <span className="text-emerald-400 font-semibold">2023 – Present (In Progress)</span>
                    <span>Bacoor, Cavite, Philippines</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Cavite State University – Bacoor City Campus
                  </h3>
                  <p className="text-sm font-medium text-slate-300 mt-1">
                    Bachelor of Science in Computer Science (BSCS 3-3)
                  </p>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    Department of Computer Studies. Engaged in core computer science disciplines including Data
                    Structures & Algorithms, Database Management Systems (SQL), Object-Oriented Programming (Java /
                    C++), Web Systems, Software Engineering, and Computer Networks. Active member of the Alliance of
                    Computer Scientists (ACS).
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300">
                      BSCS 3-3
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300">
                      Techcellence Awards
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300">
                      NSTP Champion 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 2: Datacom Senior High */}
              <div className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950 shadow" />
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2 font-mono">
                    <span className="text-cyan-400 font-semibold">S.Y. 2022 – 2023</span>
                    <span>Cavite, Philippines</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Datacom Institute of Computer Technology Corporation
                  </h3>
                  <p className="text-sm font-medium text-slate-300 mt-1">
                    Senior High School – Grade 11 Ruby (ICT / Academic Track)
                  </p>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    Earned Certificate of Academic Achievement with a stellar{' '}
                    <strong className="text-cyan-300">90.62% Midterm General Average</strong> during the 1st
                    Semester under Class Adviser James Patrick D. Tombucon. Built the foundational bedrock in computer
                    literacy, logic formulation, and digital productivity.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/40 text-cyan-300">
                      Academic Distinction (90.62%)
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-slate-300">
                      Grade 11 - Ruby
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATES & AWARDS SHOWCASE (Bento Grid & Lightbox) */}
        <section id="certificates" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase">
                  03. Verified Honors & Certificates
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mt-2">
                  Recognized Achievements
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-xl">
                  Official certificates from Cavite State University – Bacoor City Campus and Datacom Institute.
                  Click on any card to view the high-resolution lightbox and full citation details.
                </p>
              </div>

              {/* Interactive Category Filter Controls (Buttons/Tabs) */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
                <button
                  onClick={() => setCertFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    certFilter === 'all'
                      ? 'bg-emerald-400 text-slate-950 font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Honors ({CERTIFICATES.length})
                </button>
                <button
                  onClick={() => setCertFilter('academic')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    certFilter === 'academic'
                      ? 'bg-emerald-400 text-slate-950 font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Academic & Tech
                </button>
                <button
                  onClick={() => setCertFilter('campus')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    certFilter === 'campus'
                      ? 'bg-emerald-400 text-slate-950 font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Campus & NSTP
                </button>
              </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((cert, index) => {
                const originalIndex = CERTIFICATES.findIndex((c) => c.id === cert.id);
                return (
                  <div
                    key={cert.id}
                    onClick={() => setActiveCertIndex(originalIndex)}
                    className="group cursor-pointer bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
                  >
                    <div>
                      {/* Image Frame with relative path images/certX.jpg and styled fallback */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 flex items-center justify-center">
                        <img
                          src={cert.imagePath}
                          alt={`${cert.title} - ${cert.event}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />

                        {/* Certificate Fallback Styling */}
                        <div
                          style={{ display: 'none' }}
                          className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-center border border-slate-800/80"
                        >
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-2">
                            <Award className="w-6 h-6 text-emerald-400" />
                          </div>
                          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                            CvSU Bacoor Verified
                          </span>
                          <h4 className="text-xs font-bold text-white line-clamp-1 mt-1">
                            {cert.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono mt-1">
                            {cert.imagePath}
                          </span>
                        </div>

                        {/* Interactive Click Indicator */}
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <span className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5">
                            <span>Inspect Certificate</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>

                        {/* Award Badge Tag */}
                        {cert.highlightBadge && (
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-slate-950/90 border border-slate-700 text-[11px] font-mono font-medium text-emerald-300">
                            {cert.highlightBadge}
                          </div>
                        )}
                      </div>

                      {/* Header Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                          <span>{cert.date}</span>
                          <span aria-hidden="true">·</span>
                          <span>{cert.awardType}</span>
                        </div>
                        <h3 className="text-base font-bold font-display text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {cert.event}
                        </p>
                      </div>

                      {/* Citation Quote snippet */}
                      <p className="mt-3 text-xs text-slate-300/90 italic line-clamp-3 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
                        "{cert.citation}"
                      </p>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="truncate max-w-[190px]">
                        Recipient: <strong className="text-slate-200">{cert.recipient}</strong>
                      </span>
                      <span className="text-emerald-400 group-hover:underline flex items-center gap-1 shrink-0">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LIGHTBOX MODAL FOR CERTIFICATES */}
        {activeCertIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
            onClick={() => setActiveCertIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Award className="w-3.5 h-3.5" />
                    <span>
                      Certificate {activeCertIndex + 1} of {CERTIFICATES.length}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{CERTIFICATES[activeCertIndex].date}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {CERTIFICATES[activeCertIndex].title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveCertIndex(
                        (prev) => (prev! - 1 + CERTIFICATES.length) % CERTIFICATES.length
                      )
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Previous Certificate (Left Arrow)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveCertIndex((prev) => (prev! + 1) % CERTIFICATES.length)
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Next Certificate (Right Arrow)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveCertIndex(null)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Close (ESC)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Large Certificate Preview Box */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <img
                    src={CERTIFICATES[activeCertIndex].imagePath}
                    alt={CERTIFICATES[activeCertIndex].title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />

                  {/* High-Resolution Certificate In-Modal Fallback Frame */}
                  <div
                    style={{ display: 'none' }}
                    className="w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-center border-2 border-dashed border-emerald-500/30"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                        {CERTIFICATES[activeCertIndex].issuer}
                      </div>
                      <div className="text-sm font-semibold text-slate-300">
                        {CERTIFICATES[activeCertIndex].event}
                      </div>
                    </div>

                    <div className="my-auto space-y-3">
                      <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                        {CERTIFICATES[activeCertIndex].title}
                      </h4>
                      <p className="text-sm text-emerald-300 font-mono">
                        Conferred to: <strong className="text-white text-base">{CERTIFICATES[activeCertIndex].recipient}</strong>
                      </p>
                      <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 italic leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        "{CERTIFICATES[activeCertIndex].citation}"
                      </p>
                    </div>

                    <div className="text-xs text-slate-500 font-mono">
                      Image Target: <code className="text-emerald-400">{CERTIFICATES[activeCertIndex].imagePath}</code>
                    </div>
                  </div>
                </div>

                {/* Metadata & Signatories Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-sm">
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">Issuing Body & Event</span>
                      <p className="font-medium text-slate-200 mt-0.5">
                        {CERTIFICATES[activeCertIndex].event}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {CERTIFICATES[activeCertIndex].issuer}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 font-mono">Recipient</span>
                      <p className="font-semibold text-emerald-400 mt-0.5">
                        {CERTIFICATES[activeCertIndex].recipient}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">Official Signatories</span>
                      <ul className="mt-1 space-y-1.5 text-xs text-slate-300">
                        {CERTIFICATES[activeCertIndex].signatories.map((sig, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>{sig}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 font-mono">Date of Conferment</span>
                      <p className="text-slate-200 font-medium mt-0.5">
                        {CERTIFICATES[activeCertIndex].date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS & TECH STACK */}
        <section id="skills" className="py-20 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono font-medium text-purple-400 tracking-wider uppercase">
                04. Technical Competencies
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mt-2">
                Skills & Developer Toolkit
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                A combination of foundational Computer Science theory and hands-on modern development tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Programming Languages */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Code className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold font-display text-white">Languages</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Java & C++</span>
                    <span className="text-xs font-mono text-slate-400">OOP & Data Structures</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>JavaScript / TypeScript</span>
                    <span className="text-xs font-mono text-slate-400">Web Development</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Python</span>
                    <span className="text-xs font-mono text-slate-400">Scripting & Logic</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>SQL (MySQL / Postgres)</span>
                    <span className="text-xs font-mono text-slate-400">Relational DB</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span>HTML5 & Modern CSS</span>
                    <span className="text-xs font-mono text-slate-400">Semantic & Responsive</span>
                  </div>
                </div>
              </div>

              {/* Frameworks & Web Tools */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Layers className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold font-display text-white">Frameworks & Tools</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>React & Vite</span>
                    <span className="text-xs font-mono text-slate-400">Single Page Apps</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Tailwind CSS</span>
                    <span className="text-xs font-mono text-slate-400">Design Systems</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Git & GitHub</span>
                    <span className="text-xs font-mono text-slate-400">Version Control</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Node.js / Express</span>
                    <span className="text-xs font-mono text-slate-400">Server & APIs</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span>VS Code & CLI</span>
                    <span className="text-xs font-mono text-slate-400">Developer Workflow</span>
                  </div>
                </div>
              </div>

              {/* Core CS Domains & Coursework */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold font-display text-white">CS Coursework</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Data Structures</span>
                    <span className="text-xs font-mono text-slate-400">Trees, Graphs, Stacks</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Algorithm Analysis</span>
                    <span className="text-xs font-mono text-slate-400">Sorting & Complexity</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Database Systems</span>
                    <span className="text-xs font-mono text-slate-400">Normalization & ERD</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span>Computer Networks</span>
                    <span className="text-xs font-mono text-slate-400">Protocols & Topology</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span>Software Engineering</span>
                    <span className="text-xs font-mono text-slate-400">SDLC & Agile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Coursework / Project Highlights */}
            <div className="mt-12 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span>Featured Academic & Practical Projects</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="text-xs font-mono text-emerald-400">Web App / Concept</div>
                  <h4 className="text-base font-bold text-white mt-1">Campus Hotspot & Peer Hub</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Inspired by the "Hotspot ng Lahat" recognition. A responsive portal designed for peer resource
                    sharing, lab file distribution, and local network diagnostics in university lab environments.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span>HTML5</span> · <span>Tailwind</span> · <span>Node.js</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="text-xs font-mono text-cyan-400">Database System</div>
                  <h4 className="text-base font-bold text-white mt-1">CvSU Student Grade System</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Relational database management application with role-based access, GPA computation algorithms, and
                    secure data normalization modeled around CvSU academic grading systems.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span>MySQL</span> · <span>PHP / Java</span> · <span>SQL Queries</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="text-xs font-mono text-purple-400">Core CS / Algorithm</div>
                  <h4 className="text-base font-bold text-white mt-1">Algorithm Performance Visualizer</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Interactive visualization of sorting algorithms (QuickSort, MergeSort) and graph traversals (BFS,
                    DFS) demonstrating real-time step counters and Big-O computational time complexity.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span>JavaScript</span> · <span>Canvas</span> · <span>Algorithms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase">
                05. Communication & Inquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mt-2">
                Get In Touch
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Whether you have an internship opportunity, academic collaboration, or just want to connect with a
                working CS student from Cavite State University, my inbox is open!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Contact Information & Channels */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
                  <h3 className="text-lg font-bold font-display text-white">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-mono">Email Address</span>
                        <p className="text-sm font-medium text-white select-all">merholdpetes@gmail.com</p>
                        <button
                          onClick={() => copyToClipboard('merholdpetes@gmail.com', 'email')}
                          className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-mono pt-0.5"
                        >
                          {copiedEmail ? 'Copied to clipboard!' : 'Copy Email'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-mono">Mobile / Contact Number</span>
                        <p className="text-sm font-medium text-white select-all">09771182852</p>
                        <button
                          onClick={() => copyToClipboard('09771182852', 'phone')}
                          className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono pt-0.5"
                        >
                          {copiedPhone ? 'Copied to clipboard!' : 'Copy Number'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-mono">Residence & Location</span>
                        <p className="text-sm font-medium text-white">
                          Kaunlaran 2 Village, Molino 3, Bacoor, Cavite, Philippines
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Profile Links */}
                  <div className="pt-4 border-t border-slate-800">
                    <span className="text-xs font-mono text-slate-400 block mb-3">Online Profiles</span>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                      <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4 text-blue-400" />
                        <span>Merhold Petes</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Message Form */}
              <div className="lg:col-span-7">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-lg font-bold font-display text-white mb-2">Send a Direct Message</h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Fill out the form below. When submitted, it pre-populates your local email application directly
                    addressed to <code className="text-emerald-400 font-mono">merholdpetes@gmail.com</code>.
                  </p>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300" htmlFor="name">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Maria Santos"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300" htmlFor="email">
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        placeholder="Inquiry / Internship / Project Collaboration"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Write your message here..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send to merholdpetes@gmail.com</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-display">Merhold Bale Petes</span>
            <span aria-hidden="true">·</span>
            <span>BSCS 3-3, Cavite State University – Bacoor City Campus</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowDeploymentGuide(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Setup & Vercel Checklist
            </button>
            <button
              onClick={handleDownloadSingleFileHtml}
              className="hover:text-emerald-400 transition-colors"
            >
              Export HTML
            </button>
            <a href="#" className="hover:text-white transition-colors">
              Back to Top &uarr;
            </a>
          </div>
        </div>
      </footer>

      {/* DEPLOYMENT & LOCAL SETUP GUIDE MODAL */}
      {showDeploymentGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setShowDeploymentGuide(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold font-display text-white">
                  Local Setup & Vercel Deployment Guide
                </h3>
              </div>
              <button
                onClick={() => setShowDeploymentGuide(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
              <p>
                Hi Merhold! Here is your step-by-step checklist to organize your local <code className="text-emerald-400 font-mono">images/</code> folder, push your code to GitHub, and deploy it live on Vercel for free.
              </p>

              {/* Step 1: Images Folder */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-emerald-400 font-semibold font-mono text-xs uppercase tracking-wider">
                  Step 1: Your Local `images/` Folder
                </h4>
                <p className="text-xs text-slate-300">
                  Create a folder named <code className="text-white font-mono bg-slate-800 px-1.5 py-0.5 rounded">images/</code> in your project root, and copy your 6 files with these exact filenames:
                </p>
                <ul className="text-xs font-mono space-y-1 text-slate-400 pt-1">
                  <li>📸 <strong className="text-slate-200">images/profile.jpg</strong> – Studio portrait (Cavite Pride tee & watch)</li>
                  <li>📜 <strong className="text-slate-200">images/cert1.jpg</strong> – "Hotspot ng Lahat" (Techcellence)</li>
                  <li>📜 <strong className="text-slate-200">images/cert2.jpg</strong> – "Most Crammer" (BSCS 3-3)</li>
                  <li>📜 <strong className="text-slate-200">images/cert3.jpg</strong> – Champion (Zumba Nation 2025)</li>
                  <li>📜 <strong className="text-slate-200">images/cert4.jpg</strong> – Best in Choreography (Zumba Nation 2025)</li>
                  <li>📜 <strong className="text-slate-200">images/cert5.jpg</strong> – Datacom Academic Distinction (90.62%)</li>
                </ul>
              </div>

              {/* Step 2: Push to GitHub */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-cyan-400 font-semibold font-mono text-xs uppercase tracking-wider">
                  Step 2: Push Code to GitHub
                </h4>
                <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
                  <p className="text-slate-500"># In your terminal / command prompt:</p>
                  <p>git init</p>
                  <p>git add .</p>
                  <p>git commit -m "Initial commit: Merhold Bale Petes Portfolio"</p>
                  <p>git branch -M main</p>
                  <p>git remote add origin https://github.com/YOUR_USERNAME/merhold-portfolio.git</p>
                  <p>git push -u origin main</p>
                </div>
              </div>

              {/* Step 3: Deploy via Vercel */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-purple-400 font-semibold font-mono text-xs uppercase tracking-wider">
                  Step 3: One-Click Deploy on Vercel
                </h4>
                <ol className="list-decimal list-inside text-xs space-y-1.5 text-slate-300">
                  <li>Go to <strong className="text-white">vercel.com</strong> and log in with your GitHub account.</li>
                  <li>Click <strong className="text-white">"Add New..." &rarr; "Project"</strong>.</li>
                  <li>Select your <code className="text-emerald-400 font-mono">merhold-portfolio</code> repository.</li>
                  <li>Vercel automatically detects Vite! Simply click <strong className="text-emerald-400">Deploy</strong>.</li>
                  <li>In about 25 seconds, your site is live with an SSL HTTPS domain (e.g. <code className="text-white font-mono">merhold-portfolio.vercel.app</code>)!</li>
                </ol>
              </div>

              {/* Option to download single index.html */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleDownloadSingleFileHtml}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Standalone index.html</span>
                </button>
                <button
                  onClick={() => setShowDeploymentGuide(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Function to generate pure standalone single-file index.html with Tailwind CDN & Lucide
function generateStandaloneHtml(): string {
  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Merhold Bale Petes – 3rd Year BSCS Student & Aspiring Developer</title>
  <meta name="description" content="Official developer portfolio of Merhold Bale Petes, 3rd-year BS Computer Science working student at Cavite State University - Bacoor City Campus (CvSU)." />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Outfit"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">

  <!-- Navbar -->
  <header class="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
      <a href="#" class="flex items-center gap-2 text-lg font-bold font-display tracking-tight text-white whitespace-nowrap">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          &gt;_
        </span>
        <span>Merhold<span class="text-emerald-400">.dev</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
        <a href="#about" class="hover:text-emerald-400 transition-colors">About</a>
        <a href="#journey" class="hover:text-emerald-400 transition-colors">Journey</a>
        <a href="#certificates" class="hover:text-emerald-400 transition-colors">Certificates</a>
        <a href="#skills" class="hover:text-emerald-400 transition-colors">Skills</a>
        <a href="#contact" class="hover:text-emerald-400 transition-colors">Contact</a>
      </nav>

      <div class="flex items-center gap-3">
        <a href="#contact" class="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors">
          Get In Touch
        </a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="relative pt-16 pb-20 md:pt-24 md:pb-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          <div class="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>CvSU Bacoor Campus · BSCS 3-3 · Working Student</span>
          </div>
          <h1 class="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
            Merhold Bale Petes
          </h1>
          <p class="text-xl sm:text-2xl font-mono text-emerald-400 font-semibold">
            <span id="hero-typing-text">3rd Year BSCS Student</span><span class="animate-pulse">|</span>
          </p>
          <p class="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Computer Science student at Cavite State University – Bacoor City Campus. Balancing employment with rigorous software engineering and algorithm studies. Known as the peer champion who keeps classmates connected.
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="#certificates" class="px-5 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all">
              View Certificates
            </a>
            <a href="#contact" class="px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all">
              Contact Me
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl">
            <div class="aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
              <img src="images/profile.jpg" alt="Merhold Bale Petes studio portrait" class="w-full h-full object-cover" onerror="this.style.display='none'; document.getElementById('profile-fb').style.display='flex';" />
              <div id="profile-fb" style="display:none;" class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-slate-950">
                <div class="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center text-3xl font-bold text-emerald-300 font-display mb-3">
                  MBP
                </div>
                <h4 class="text-base font-bold text-white">Merhold Bale Petes</h4>
                <p class="text-xs text-slate-400 mt-1">Cavite State University – Bacoor</p>
                <p class="text-[10px] text-slate-500 font-mono mt-2">images/profile.jpg</p>
              </div>
            </div>
            <div class="mt-3 text-xs flex justify-between text-slate-400">
              <span class="text-emerald-400 font-medium">Hotspot ng Lahat</span>
              <span>Bacoor, Cavite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Certificates Section -->
  <section id="certificates" class="py-20 border-t border-slate-800 bg-slate-950/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <span class="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">03. Certificates</span>
        <h2 class="text-3xl sm:text-4xl font-bold font-display text-white mt-1">Honors & Certificates</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Cert 1 -->
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all">
          <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 relative">
            <img src="images/cert1.jpg" alt="Hotspot ng Lahat" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div style="display:none;" class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
              <span class="text-xs font-mono text-emerald-400">4th Techcellence Awards</span>
              <h4 class="text-sm font-bold text-white mt-1">Certificate of "Hotspot ng Lahat"</h4>
              <span class="text-[10px] text-slate-500 font-mono mt-2">images/cert1.jpg</span>
            </div>
          </div>
          <h3 class="text-base font-bold text-white">Certificate of "Hotspot ng Lahat"</h3>
          <p class="text-xs text-slate-400 mt-1">Cavite State University – Bacoor City Campus (DCS / ACS)</p>
          <p class="text-xs text-slate-300 italic mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            "In recognition of your unmatched generosity and reliable connectivity, keeping your classmates connected, updated, and online through every lecture and lab session."
          </p>
          <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            Date: October 28, 2026
          </div>
        </div>

        <!-- Cert 2 -->
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all">
          <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 relative">
            <img src="images/cert2.jpg" alt="Most Crammer" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div style="display:none;" class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
              <span class="text-xs font-mono text-amber-400">4th Techcellence Awards</span>
              <h4 class="text-sm font-bold text-white mt-1">Certificate of "Most Crammer"</h4>
              <span class="text-[10px] text-slate-500 font-mono mt-2">images/cert2.jpg</span>
            </div>
          </div>
          <h3 class="text-base font-bold text-white">Certificate of "Most Crammer"</h3>
          <p class="text-xs text-slate-400 mt-1">BSCS 3-3 Class Award · CvSU Bacoor</p>
          <p class="text-xs text-slate-300 italic mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            Celebrated by the Alliance of Computer Scientists for relentless midnight sprints and unbreakable camaraderie.
          </p>
          <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            Date: October 28, 2026
          </div>
        </div>

        <!-- Cert 3 -->
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all">
          <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 relative">
            <img src="images/cert3.jpg" alt="Champion Zumba Nation 2025" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div style="display:none;" class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
              <span class="text-xs font-mono text-cyan-400">NSTP CvSU Bacoor</span>
              <h4 class="text-sm font-bold text-white mt-1">Achievement – Champion</h4>
              <span class="text-[10px] text-slate-500 font-mono mt-2">images/cert3.jpg</span>
            </div>
          </div>
          <h3 class="text-base font-bold text-white">Certificate of Achievement – Champion</h3>
          <p class="text-xs text-slate-400 mt-1">Zumba Nation Competition 2025 ("Shake It To Win It")</p>
          <p class="text-xs text-slate-300 italic mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            "In honor for emerging as the Champion during the Zumba Nation Competition 2025 with exceptional choreography."
          </p>
          <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            Date: June 13, 2025
          </div>
        </div>

        <!-- Cert 4 -->
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all">
          <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 relative">
            <img src="images/cert4.jpg" alt="Best in Choreography" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div style="display:none;" class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
              <span class="text-xs font-mono text-purple-400">NSTP CvSU Bacoor</span>
              <h4 class="text-sm font-bold text-white mt-1">Best in Choreography</h4>
              <span class="text-[10px] text-slate-500 font-mono mt-2">images/cert4.jpg</span>
            </div>
          </div>
          <h3 class="text-base font-bold text-white">Certificate of Award – Best in Choreography</h3>
          <p class="text-xs text-slate-400 mt-1">Zumba Nation Competition 2025</p>
          <p class="text-xs text-slate-300 italic mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            Honoring creativity, precision, and artistry in choreography during university NSTP competition.
          </p>
          <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            Date: June 13, 2025
          </div>
        </div>

        <!-- Cert 5 -->
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all">
          <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 relative">
            <img src="images/cert5.jpg" alt="Datacom Achievement 90.62%" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div style="display:none;" class="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
              <span class="text-xs font-mono text-emerald-400">Datacom Institute</span>
              <h4 class="text-sm font-bold text-white mt-1">Academic Distinction (90.62%)</h4>
              <span class="text-[10px] text-slate-500 font-mono mt-2">images/cert5.jpg</span>
            </div>
          </div>
          <h3 class="text-base font-bold text-white">Certificate of Achievement (90.62% Average)</h3>
          <p class="text-xs text-slate-400 mt-1">Datacom Institute of Computer Technology Corporation</p>
          <p class="text-xs text-slate-300 italic mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            "Congratulations, for your great performance shown during this Quarter. We really appreciate with your contributions: 90.62%."
          </p>
          <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            Adviser: James Patrick D. Tombucon
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="py-20 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl">
        <span class="text-xs font-mono text-emerald-400 uppercase">05. Contact</span>
        <h2 class="text-3xl font-bold font-display text-white mt-1">Get In Touch</h2>
        <div class="mt-6 space-y-3 text-sm text-slate-300">
          <p>Email: <a href="mailto:merholdpetes@gmail.com" class="text-emerald-400 font-mono font-medium">merholdpetes@gmail.com</a></p>
          <p>Phone: <span class="text-cyan-400 font-mono font-medium">09771182852</span></p>
          <p>Location: <span class="text-slate-200">Kaunlaran 2 Village, Molino 3, Bacoor, Cavite, Philippines</span></p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-8 border-t border-slate-800 text-center text-xs text-slate-500">
    Merhold Bale Petes · 3rd Year BSCS (BSCS 3-3) · Cavite State University – Bacoor City Campus
  </footer>

  <script>
    lucide.createIcons();
    // Typing effect
    const words = ["3rd Year BSCS Student", "Working Student", "Problem Solver", "Aspiring Software Developer"];
    let wIdx = 0, chIdx = 0, isDel = false;
    const el = document.getElementById('hero-typing-text');
    function typeLoop() {
      const cur = words[wIdx];
      if (!isDel) {
        el.textContent = cur.substring(0, chIdx + 1);
        chIdx++;
        if (chIdx === cur.length) {
          isDel = true;
          setTimeout(typeLoop, 2000);
          return;
        }
      } else {
        el.textContent = cur.substring(0, chIdx - 1);
        chIdx--;
        if (chIdx === 0) {
          isDel = false;
          wIdx = (wIdx + 1) % words.length;
        }
      }
      setTimeout(typeLoop, isDel ? 50 : 100);
    }
    typeLoop();
  </script>
</body>
</html>`;
}
