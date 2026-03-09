import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import particlesConfig from '../styles/particlesConfig.json';
import '../styles/Home.css';

function Home() {
  const [profile, setProfile] = useState(null);
  const [particles, setParticles] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/profile')
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  // 加载状态检查 - 防止访问 null 对象的属性
  if (!profile) {
    return (
      <div className="home-container">
        <Particles
          id="tsparticles"
          init={async (main) => {
            const particlesInstance = await loadFull(main);
            setParticles(particlesInstance);
            return particlesInstance;
          }}
          options={particlesConfig}
          className="particles"
        />
        <div className="content-wrapper">
          <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const particlesLoaded = (container) => {
    console.log('Particles loaded:', container);
  };

  return (
    <div className="home-container">
      <Particles
        id="tsparticles"
        init={async (main) => {
          const particlesInstance = await loadFull(main);
          setParticles(particlesInstance);
          return particlesInstance;
        }}
        loaded={particlesLoaded}
        options={particlesConfig}
        className="particles"
      />
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="profile-section"
        >
          <motion.img
            src={profile.avatar}
            alt={profile.name}
            className="avatar"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.h1
            className="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {profile.name}
          </motion.h1>
          <motion.p
            className="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {profile.title}
          </motion.p>
          <motion.p
            className="bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {profile.bio}
          </motion.p>
          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {profile.socialLinks && profile.socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={link.icon} alt={link.name} className="social-icon" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
        >
          <span>Scroll</span>
          <div className="arrow">↓</div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;