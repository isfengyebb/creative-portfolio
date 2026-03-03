export const COLORS = {
  BG: '#030311',
  BG_SECONDARY: '#0b0b1f',
  PRIMARY: '#7c3aed',
  PRIMARY_LIGHT: '#a78bfa',
  ACCENT: '#06b6d4',
  ACCENT_LIGHT: '#67e8f9',
  LIME: '#84cc16',
  AMBER: '#f59e0b',
  TEXT: '#f1f5f9',
  TEXT_SECONDARY: '#94a3b8',
};

export const PARTICLE_CONFIG = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    color: { value: [COLORS.PRIMARY_LIGHT, COLORS.ACCENT, COLORS.LIME] },
    links: {
      color: COLORS.PRIMARY,
      distance: 130,
      enable: true,
      opacity: 0.12,
      width: 0.8,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none',
      outModes: { default: 'bounce' },
      random: true,
    },
    number: {
      density: { enable: true, area: 800 },
      value: 60,
    },
    opacity: { value: { min: 0.15, max: 0.6 } },
    size: { value: { min: 1, max: 2.5 } },
    twinkle: {
      particles: { enable: true, frequency: 0.05, opacity: 1 },
    },
  },
  detectRetina: true,
};
