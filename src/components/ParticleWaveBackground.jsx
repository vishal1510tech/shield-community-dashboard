import { useEffect, useRef } from 'react';

export default function ParticleWaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Parallax Stardust Particles (Layered Z-Depth)
    const particleCount = Math.min(140, Math.floor((width * height) / 10000));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 3 + 0.5; // Z depth scaling (0.5 far, 3.5 near)
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (Math.random() * 1.2 + 0.4) * (z * 0.8),
        alpha: (Math.random() * 0.6 + 0.2) / (z * 0.7),
        speedX: (Math.random() - 0.5) * 0.15 * z,
        speedY: (Math.random() - 0.5) * 0.15 * z,
        pulseSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    // 3D Infinity Wave Stardust Ribbon Particles
    const waveParticleCount = 900;
    const waveParticles = [];
    for (let i = 0; i < waveParticleCount; i++) {
      waveParticles.push({
        t: Math.random() * Math.PI * 2,
        offsetY: (Math.random() - 0.5) * 70,
        offsetX: (Math.random() - 0.5) * 70,
        speed: 0.0008 + Math.random() * 0.0008,
        size: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.004;

      // Deep dark 3D luxury gradient background
      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        100,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGradient.addColorStop(0, '#0c1019');
      bgGradient.addColorStop(0.5, '#06080d');
      bgGradient.addColorStop(1, '#030407');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Render Layered 3D Background Particles (Distant to Near)
      particles.sort((a, b) => a.z - b.z);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(time * 2 + p.z) * p.pulseSpeed * 0.08;
        const currentAlpha = Math.max(0.08, Math.min(0.75, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 245, 255, ${currentAlpha})`;
        if (p.z > 2.2) {
          ctx.shadowBlur = 6 * p.z;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render 3D Floating Infinity Ribbon with Dynamic Spatial Perspective
      const centerX = width / 2;
      const centerY = height * 0.42;
      const scaleX = Math.min(width * 0.44, 620);
      const scaleY = Math.min(height * 0.26, 250);

      // Ribbon ambient volumetric 3D light glow
      ctx.save();
      ctx.beginPath();
      for (let theta = 0; theta <= Math.PI * 2; theta += 0.04) {
        const x = centerX + scaleX * Math.sin(theta + time * 0.4);
        const y = centerY + scaleY * Math.sin(theta + time * 0.4) * Math.cos(theta + time * 0.4);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 150;
      ctx.shadowBlur = 70;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();
      ctx.restore();

      // Ribbon Core Metallic Fluid Strand Layers
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        const layerTime = time * 0.35 + layer * 0.25;
        const layerScaleX = scaleX + layer * 10;
        const layerScaleY = scaleY + layer * 5;

        for (let theta = 0; theta <= Math.PI * 2; theta += 0.03) {
          const waveShift = Math.sin(theta * 3 + layerTime) * 10;
          const x = centerX + layerScaleX * Math.sin(theta) + waveShift;
          const y = centerY + layerScaleY * Math.sin(theta) * Math.cos(theta) + waveShift * 0.5;

          if (theta === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.1 - layer * 0.018;
        ctx.strokeStyle = `rgba(245, 248, 255, ${alpha})`;
        ctx.lineWidth = 32 - layer * 5;
        ctx.stroke();
      }

      // Ribbon Stardust Particles
      waveParticles.forEach((wp) => {
        wp.t += wp.speed;
        if (wp.t > Math.PI * 2) wp.t = 0;

        const currentT = wp.t + time * 0.18;
        const baseX = centerX + scaleX * Math.sin(currentT);
        const baseY = centerY + scaleY * Math.sin(currentT) * Math.cos(currentT);

        const x = baseX + wp.offsetX + Math.sin(time + wp.t * 3) * 6;
        const y = baseY + wp.offsetY + Math.cos(time + wp.t * 3) * 6;

        ctx.beginPath();
        ctx.arc(x, y, wp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${wp.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
}
