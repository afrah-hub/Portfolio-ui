import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ThemeAwareTileLayer = ({ isDark }) => {
  const map = useMap();
  useEffect(() => {
    map.getContainer().style.transition = 'filter 0.5s ease';
    map.getContainer().style.filter = isDark
      ? 'brightness(0.85) saturate(0.8)'
      : 'brightness(1)';
  }, [isDark, map]);

  return isDark ? (
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      attribution='&copy; OpenStreetMap contributors &copy; CARTO'
    />
  ) : (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; OpenStreetMap contributors'
    />
  );
};

const MALAPPURAM_COORDS = [11.0509, 76.0711];

// Lightweight interactive hover 3D tilt card component
const TiltCard = ({ children, className, style, ...props }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max 10 degrees tilt
    const factorX = -(y / (box.height / 2)) * 10;
    const factorY = (x / (box.width / 2)) * 10;
    
    setRotateX(factorX);
    setRotateY(factorY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const availableFor = [
  'Full Stack Development',
  'Web Applications',
  'E-commerce Solutions',
  'API Development',
];

// ─── Reusable scroll-triggered wrappers ────────────────────────────────────────

// Each component uses its own whileInView so it triggers individually on scroll

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

const SlideLeft = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -36 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

const SlideRight = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: 36 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

const PopIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.82 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
  >
    {children}
  </motion.div>
);

// ─── Component ─────────────────────────────────────────────────────────────────

const Contact = () => {
  const { isDark } = useTheme();

  // Parallax mouse movements tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring options for ultra-smooth easing
  const springConfig = { damping: 50, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transformed values for parallax grid floor
  const gridRotateX = useTransform(smoothMouseY, [-1, 1], [50, 60]);
  const gridRotateY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const profile = {
    name: 'Afrah Kabeer',
    email: 'afrahkabeer321@gmail.com',
    location: 'Malappuram, Kerala, India',
    gitHubUrl: 'https://github.com/afrah-hub',
    linkedInUrl: 'https://www.linkedin.com/in/afrah-tk',
    socialEmail: 'afrahkabeer328@gmail.com',
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Message is required.';
    else if (formData.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setErrors({});
    setStatus('sending');
    
    // Construct mailto link
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    try {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Mailto submission error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="py-20 scroll-mt-24 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden relative">
      {/* 3D Perspective Grid Floor */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}
      >
        <motion.div
          style={{
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-x-0 -top-[20%] w-full h-[150%] origin-top opacity-[0.05] dark:opacity-[0.1] transition-opacity duration-500"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-3d-contact" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" className="stroke-purple-600 dark:stroke-purple-500" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-3d-contact)" />
          </svg>
        </motion.div>
      </div>

      {/* Breathing glow blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/5 dark:bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Header – every element independently animated ── */}
        <div className="text-center mb-16">
          {/* Label */}
          <motion.span
            className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400/90 block mb-3"
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Get In Touch
          </motion.span>

          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Contact{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>

          {/* Divider draws in */}
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-4"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            style={{ originX: 0.5 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
          >
            Have a project in mind or just want to say hi? Feel free to reach out!
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ━━━ LEFT COLUMN ━━━ */}
          <div className="flex flex-col gap-6">

            {/* Contact Info Card — slides from left */}
            <SlideLeft delay={0}>
              <TiltCard 
                style={{ perspective: "1000px" }}
                className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl group"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-colors duration-500 pointer-events-none"></div>

                {/* Card title */}
                <SlideLeft delay={0.08}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 inline-block"></span>
                    Contact Information
                  </h3>
                </SlideLeft>

                  <div className="space-y-4">
                    {/* Email row */}
                    <SlideLeft delay={0.14}>
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300">
                        <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center border border-purple-500/20 shrink-0">
                          <Mail className="text-purple-400" size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email Me</p>
                          <a href={`mailto:${profile.email}`} className="text-sm text-slate-800 dark:text-white font-medium break-all hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {profile.email}
                          </a>
                        </div>
                      </div>
                    </SlideLeft>

                    {/* Location row */}
                    <SlideLeft delay={0.2}>
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300">
                        <div className="w-10 h-10 bg-pink-600/10 rounded-xl flex items-center justify-center border border-pink-500/20 shrink-0">
                          <MapPin className="text-pink-400" size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Location</p>
                          <p className="text-sm text-slate-800 dark:text-white font-medium">{profile.location}</p>
                        </div>
                      </div>
                    </SlideLeft>
                  </div>

                {/* Social Buttons */}
                <FadeUp delay={0.26} className="mt-5 pt-5 border-t border-slate-200 dark:border-white/5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Find me on</p>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { href: profile.gitHubUrl, icon: 'fa-brands fa-github', label: 'GitHub', hover: 'hover:border-purple-500/30 hover:bg-purple-500/5 hover:text-purple-600 dark:hover:text-purple-400' },
                      { href: profile.linkedInUrl, icon: 'fa-brands fa-linkedin', label: 'LinkedIn', hover: 'hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400' },
                      { href: `mailto:${profile.socialEmail}`, icon: null, label: 'Email', hover: 'hover:border-pink-500/30 hover:bg-pink-500/5 hover:text-pink-600 dark:hover:text-pink-400' },
                    ].map((s, i) => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target={s.icon ? '_blank' : undefined}
                        rel={s.icon ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, scale: 0.7, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.32 + i * 0.07 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.94 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 text-xs font-semibold transition-all duration-300 ${s.hover}`}
                      >
                        {s.icon ? <i className={`${s.icon} text-sm`}></i> : <Mail size={13} />}
                        {s.label}
                      </motion.a>
                    ))}
                  </div>
                </FadeUp>
              </TiltCard>
            </SlideLeft>

            {/* Map — blurs + fades in */}
            <motion.div
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl"
              style={{ height: '220px' }}
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <MapContainer
                center={MALAPPURAM_COORDS}
                zoom={11}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <ThemeAwareTileLayer isDark={isDark} />
                <Marker position={MALAPPURAM_COORDS} icon={purpleIcon}>
                  <Popup>
                    <div className="text-center py-1">
                      <strong className="block text-sm">Afrah Kabeer</strong>
                      <span className="text-xs text-gray-500">Malappuram, Kerala</span>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>

            {/* Available For card */}
            <FadeUp delay={0}>
              <TiltCard 
                style={{ perspective: "1000px" }}
                className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <SlideLeft delay={0.05}>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-4">
                    Available For
                  </h4>
                </SlideLeft>
                <ul className="space-y-2.5">
                  {availableFor.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-300 font-medium"
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
                    >
                      <motion.span
                        className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.18 + i * 0.08 }}
                      >
                        <i className="fa-solid fa-check text-[9px] text-purple-400"></i>
                      </motion.span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </TiltCard>
            </FadeUp>

          </div>

          {/* ━━━ RIGHT COLUMN: Form ━━━ */}
          <div className="flex flex-col gap-6">

            {/* Form Card — slides from right */}
            <SlideRight delay={0}>
              <TiltCard 
                style={{ perspective: "1000px" }}
                className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Form title */}
                <SlideRight delay={0.08}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 inline-block"></span>
                    Send Me a Message
                  </h3>
                </SlideRight>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Name field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Afrah Kabeer"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border text-slate-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 ${
                          errors.name ? 'border-red-400' : 'border-slate-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 font-medium">
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border text-slate-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 ${
                          errors.email ? 'border-red-400' : 'border-slate-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 font-medium">
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Message field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                  >
                    <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-400" size={16} />
                      <textarea
                        rows={5}
                        placeholder="Tell me about your project or idea..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border text-slate-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 resize-none ${
                          errors.message ? 'border-red-400' : 'border-slate-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500'
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 font-medium">
                        {errors.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.34 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={status === 'sending' || status === 'success'}
                      whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 8px 30px rgba(147,51,234,0.35)' } : {}}
                      whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                      className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                        status === 'success' ? 'bg-green-500 cursor-default'
                        : status === 'error' ? 'bg-red-500'
                        : 'bg-gradient-to-r from-purple-600 to-pink-500'
                      } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {status === 'sending' ? (
                        <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Sending...</>
                      ) : status === 'success' ? (
                        <><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}><CheckCircle size={18} /></motion.span>Message Sent!</>
                      ) : status === 'error' ? (
                        'Failed — Try Again'
                      ) : (
                        <><Send size={16} />Send Message</>
                      )}
                    </motion.button>
                  </motion.div>

                  {status === 'success' && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-green-600 dark:text-green-400 text-xs text-center font-semibold">
                      Your message has been received! I'll get back to you soon.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs text-center font-semibold">
                      Something went wrong. Please try again or email me directly.
                    </motion.p>
                  )}
                </form>
              </TiltCard>
            </SlideRight>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
