import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { PARTICLE_CONFIG } from '../../constants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

function ParticleBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={PARTICLE_CONFIG}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}

export default ParticleBackground;
