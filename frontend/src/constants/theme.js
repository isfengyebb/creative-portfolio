export const COLORS = {
  BG: '#0a0a1a',
  BG_SECONDARY: '#12122a',
  PRIMARY: '#6c5ce7',
  PRIMARY_LIGHT: '#a29bfe',
  ACCENT: '#00cec9',
  ACCENT_LIGHT: '#55efc4',
  PINK: '#fd79a8',
  PINK_LIGHT: '#fab1c4',
  TEXT: '#e0e0e0',
  TEXT_SECONDARY: '#a0a0b8',
};

export const PARTICLE_CONFIG = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    color: { value: [COLORS.PRIMARY, COLORS.ACCENT, COLORS.PINK] },
    links: {
      color: COLORS.PRIMARY,
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none',
      outModes: { default: 'bounce' },
    },
    number: {
      density: { enable: true, area: 900 },
      value: 50,
    },
    opacity: { value: { min: 0.2, max: 0.5 } },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};
