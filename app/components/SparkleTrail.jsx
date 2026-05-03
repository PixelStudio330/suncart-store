"use client";

import { useEffect, useRef } from "react";

export default function SparkleTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    let particles = [];
    
    const colors = ["#FFD166", "#C85555", "#2A9D8F", "#D81159", "#FF595E", "#8AC926", "#1982C4", "#6A4C93"];
    const emojis = ["✨", "🌸", "⭐", "💎", "🔥"];

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      for (let i = 0; i < 5; i++) {
        const typeRand = Math.random();
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2 + 1,
          life: 1,
          speedX: (Math.random() - 0.5) * 6,
          speedY: (Math.random() - 0.5) * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.15,
          type: typeRand > 0.92 ? "emoji" : typeRand > 0.8 ? "star" : "sparkle",
          emoji: emojis[Math.floor(Math.random() * emojis.length)]
        });
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Simplified star math for better performance
    function drawStar(ctx, x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * r + x, -Math.sin((18 + i * 72) / 180 * Math.PI) * r + y);
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * (r / 2) + x, -Math.sin((54 + i * 72) / 180 * Math.PI) * (r / 2) + y);
      }
      ctx.closePath();
      ctx.fill();
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      if (particles.length > 120) {
        particles.splice(0, particles.length - 120);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.spin;
        
        p.life -= 0.035; 
        p.size *= 0.95;

        if (p.life <= 0 || p.size <= 0.4) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;

        if (p.type === "emoji") {
          // SHRUNK: Emojis are now much smaller
          ctx.font = `${p.size * 4}px serif`;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillText(p.emoji, 0, 0);
        } else if (p.type === "star") {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          drawStar(ctx, 0, 0, p.size * 1.8);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}