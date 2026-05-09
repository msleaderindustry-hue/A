const { useState, useEffect, useRef } = React;
const { motion, useScroll, useTransform } = window.Motion;

// --- 1. ЛЕТАЮЩИЕ ЧАСТИЦЫ ---
const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10
    }));

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
                    transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
                        background: 'white', borderRadius: '50%', boxShadow: '0 0 10px white'
                    }}
                />
            ))}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.15 }}></div>
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.15 }}></div>
        </div>
    );
};

// --- 2. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ ---
const Typewriter = () => {
    const phrases = ["Digital Art.", "Web Magic.", "Future UI.", "Clean Code."];
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setText(isDeleting 
                ? fullText.substring(0, text.length - 1) 
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum]);

    return (
        <span className="shimmer-text">
            {text}<span className="cursor-blink">|</span>
        </span>
    );
};

// --- 3. REVEAL ---
const Reveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

// --- 4. HERO SECTION ---
const Hero = () => {
    const icons = [
        { icon: "devicon-react-original", x: -220, y: -120 },
        { icon: "devicon-javascript-plain", x: 220, y: -80 },
        { icon: "devicon-python-plain", x: -180, y: 160 },
        { icon: "devicon-html5-plain", x: 180, y: 180 },
        { icon: "devicon-css3-plain", x: 0, y: -230 }
    ];

    return (
        <section id="home">
            <div className="hero-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, zIndex: 10 }}>
                    <Reveal>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '25px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%', boxShadow: '0 0 10px #00ff88' }}></span>
                            <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '1px' }}>OPEN TO WORK</span>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 style={{ fontSize: 'clamp(45px, 6vw, 80px)', fontWeight: '900', lineHeight: 1, marginBottom: '25px' }}>
                            I create <br />
                            <Typewriter />
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p style={{ color: '#aaa', fontSize: '18px', maxWidth: '480px', lineHeight: 1.6, marginBottom: '40px' }}>
                            Full Stack разработчик, который превращает идеи в живые, дышащие интерфейсы.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,242,255,0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{ padding: '16px 40px', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}
                        >
                            SEE PROJECTS
                        </motion.button>
                    </Reveal>
                </div>

                <div className="floating-orbit" style={{ flex: 1, position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', width: '500px', height: '500px', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', width: '350px', height: '350px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%' }} />

                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.5 }} style={{ width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', zIndex: 5, boxShadow: '0 0 100px rgba(0,242,255,0.15)', position: 'relative' }}>
                        <img src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}></div>
                    </motion.div>

                    {icons.map((item, i) => (
                        <motion.div
                            key={i}
                            drag
                            dragConstraints={{ left: item.x - 50, right: item.x + 50, top: item.y - 50, bottom: item.y + 50 }}
                            initial={{ opacity: 0, x: item.x, y: item.y }}
                            animate={{ 
                                opacity: 1, 
                                y: [item.y - 20, item.y + 20, item.y - 20],
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                opacity: { duration: 1 },
                                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            style={{
                                position: 'absolute', width: '70px', height: '70px', 
                                background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontSize: '32px', color: '#fff', cursor: 'grab', zIndex: 10,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                            whileHover={{ scale: 1.2, borderColor: 'var(--primary)', boxShadow: '0 0 30px var(--primary)' }}
                        >
                            <i className={item.icon}></i>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 5. PROJECTS ---
const Projects = () => (
    <section id="projects">
        <Reveal>
            <h2 style={{ fontSize: '50px', fontWeight: '900', marginBottom: '60px', textAlign: 'center' }}>Work <span className="shimmer-text">Showcase</span></h2>
        </Reveal>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {[
                { title: "Testing Platform", tag: "Education", color: "#00f2ff" },
                { title: "Crypto Dashboard", tag: "Finance", color: "#bd00ff" },
                { title: "3D Portfolio", tag: "Creative", color: "#ff0055" }
            ].map((p, i) => (
                <Reveal key={i} delay={i * 0.2}>
                    <motion.div 
                        className="glass-card"
                        whileHover={{ y: -15, boxShadow: `0 0 40px ${p.color}40`, borderColor: p.color }}
                        style={{ height: '300px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                    >
                        <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '100%', height: '100%', background: p.color, filter: 'blur(100px)', opacity: 0.2 }}></div>
                        <span style={{ position: 'relative', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: p.color, fontWeight: '700', marginBottom: '10px' }}>{p.tag}</span>
                        <h3 style={{ position: 'relative', fontSize: '30px', margin: '0 0 10px 0' }}>{p.title}</h3>
                        <p style={{ position: 'relative', color: '#888', fontSize: '14px' }}>Интерактивное веб-приложение с использованием современных технологий.</p>
                        <motion.div initial={{ x: -20, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} style={{ marginTop: '20px', color: p.color, fontWeight: 'bold' }}>
                            Explore <i className="fa-solid fa-arrow-right"></i>
                        </motion.div>
                    </motion.div>
                </Reveal>
            ))}
        </div>
    </section>
);

// --- 6. ABOUT ---
const About = () => (
    <section id="about">
        <Reveal>
            <div style={{ padding: '60px', background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '40px', marginBottom: '20px' }}>More than just code</h2>
                <p style={{ maxWidth: '700px', margin: '0 auto 40px auto', color: '#aaa', fontSize: '18px', lineHeight: 1.8 }}>
                    Я Alisher, и я верю, что веб-сайты должны быть искусством. Я использую <span style={{color: 'var(--primary)'}}>React</span> и <span style={{color: 'var(--secondary)'}}>Motion</span>, чтобы создавать интерфейсы, которые запоминаются.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    {['JavaScript', 'React', 'Three.js', 'Node.js', 'Figma', 'Git'].map(skill => (
                        <motion.span 
                            key={skill}
                            whileHover={{ scale: 1.1, background: 'var(--primary)', color: '#000' }}
                            style={{ padding: '10px 25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', cursor: 'default' }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </Reveal>
    </section>
);

// --- 7. CONTACT ---
const Contact = () => (
    <section id="contact">
        <Reveal>
            <h2 style={{ fontSize: '50px', fontWeight: '900', marginBottom: '40px', textAlign: 'center' }}>Get In <span className="shimmer-text">Touch</span></h2>
            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '50px', textAlign: 'center' }}>
                <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '18px' }}>
                    Есть идея для проекта или просто хочешь поздороваться? Я всегда открыт для новых предложений.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <motion.a 
                        href="#"
                        whileHover={{ y: -5, background: 'var(--primary)', color: '#000' }}
                        style={{ padding: '15px 30px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        <i className="fa-regular fa-envelope"></i> Email Me
                    </motion.a>
                   <motion.a 
    href="https://t.me/m0rphxz" 
    target="_blank" 
    rel="noopener noreferrer"
    whileHover={{ y: -5, background: '#0088cc', color: '#fff', borderColor: '#0088cc' }}
    style={{ padding: '15px 30px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
>
    <i className="fa-brands fa-telegram"></i> Telegram
</motion.a>
                </div>
            </div>
        </Reveal>
    </section>
);

// --- APP ---
const App = () => (
    <>
        <FloatingParticles />
        <motion.nav 
            initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
            style={{ position: 'fixed', top: '30px', left: 0, width: '100%', padding: '0 10%', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}
        >
            <div style={{ fontWeight: '900', fontSize: '24px' }}>A<span style={{color: 'var(--primary)'}}>.</span></div>
            <div className="nav-links" style={{ display: 'flex', gap: '40px', background: 'rgba(0,0,0,0.5)', padding: '15px 40px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                {['Home', 'Projects', 'About', 'Contact'].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>{item}</a>
                ))}
            </div>
            <a href="https://github.com/vash-akk" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px' }}><i className="fa-brands fa-github"></i></a>
        </motion.nav>

        <Hero />
        <Projects />
        <About />
        <Contact />
        
        <footer style={{ padding: '50px', textAlign: 'center', opacity: 0.5, fontSize: '12px' }}>
            © 2025 Alisher. All Rights Reserved.
        </footer>
    </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
