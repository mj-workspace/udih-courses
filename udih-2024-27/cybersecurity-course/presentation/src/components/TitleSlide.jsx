import { QRCodeSVG } from 'qrcode.react'
import AnimatedBackground from './AnimatedBackground'

const base = import.meta.env.BASE_URL
const DEMO_URL = 'https://udih.anis.bg/cyber-demo/'

function LecturerCard({ avatar, name, role, expertise, gradient, haloColor }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-[240px]">
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-full blur-2xl pointer-events-none"
          style={{
            background: haloColor,
            animation: 'avatar-halo 4s ease-in-out infinite',
          }}
        />
        <svg
          className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50" cy="50" r="48"
            fill="none" stroke="#60a5fa" strokeWidth="0.3"
            strokeDasharray="2 5" opacity="0.45"
          >
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 50 50" to="360 50 50"
              dur="32s" repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div className={`relative w-[160px] h-[160px] rounded-full p-[3px] shadow-2xl shadow-blue-500/30 ${gradient}`}>
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover border-2 border-slate-900"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {name}
        </h3>
        <p className="text-blue-300 font-semibold text-sm tracking-wide">{role}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{expertise}</p>
      </div>
    </div>
  )
}

function QRHero() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        {/* Expanding pulse rings behind QR */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 rounded-2xl border-2 border-red-500/55"
            style={{ animation: 'qr-pulse-ring 2.2s ease-out infinite' }}
          />
          <div
            className="absolute inset-0 rounded-2xl border-2 border-orange-400/50"
            style={{ animation: 'qr-pulse-ring 2.2s ease-out infinite 0.73s' }}
          />
          <div
            className="absolute inset-0 rounded-2xl border-2 border-red-300/40"
            style={{ animation: 'qr-pulse-ring 2.2s ease-out infinite 1.46s' }}
          />
        </div>

        {/* Inward-pointing arrows */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 pointer-events-none">
          <span
            className="inline-block text-[36px] font-black leading-none text-red-400"
            style={{
              animation: 'arrow-nudge-right 1.2s ease-in-out infinite',
              textShadow: '0 0 14px rgba(239,68,68,0.7)',
            }}
          >
            →
          </span>
        </div>
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 pointer-events-none">
          <span
            className="inline-block text-[36px] font-black leading-none text-red-400"
            style={{
              animation: 'arrow-nudge-left 1.2s ease-in-out infinite',
              textShadow: '0 0 14px rgba(239,68,68,0.7)',
            }}
          >
            ←
          </span>
        </div>

        {/* Corner brackets — camera viewfinder */}
        <div className="absolute -top-3 -left-3 w-9 h-9 border-t-[3px] border-l-[3px] border-red-400 rounded-tl-lg" />
        <div className="absolute -top-3 -right-3 w-9 h-9 border-t-[3px] border-r-[3px] border-red-400 rounded-tr-lg" />
        <div className="absolute -bottom-3 -left-3 w-9 h-9 border-b-[3px] border-l-[3px] border-red-400 rounded-bl-lg" />
        <div className="absolute -bottom-3 -right-3 w-9 h-9 border-b-[3px] border-r-[3px] border-red-400 rounded-br-lg" />

        {/* QR card */}
        <div className="relative bg-white p-5 rounded-2xl shadow-[0_0_80px_rgba(239,68,68,0.5)] overflow-hidden">
          <QRCodeSVG
            value={DEMO_URL}
            size={280}
            bgColor="#ffffff"
            fgColor="#0f172a"
            level="M"
          />
          {/* Scanner line */}
          <div
            className="pointer-events-none absolute left-5 right-5 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
            style={{
              top: '20px',
              animation: 'qr-scan 3s linear infinite',
              boxShadow: '0 0 12px rgba(239,68,68,0.9)',
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <p
          className="text-2xl font-black uppercase tracking-[0.16em]"
          style={{ animation: 'cta-glow 1.6s ease-in-out infinite' }}
        >
          Сканирай ме, ако смееш!
        </p>
        <p className="text-[11px] text-slate-400 uppercase tracking-[0.28em]">
          интерактивно демо · на живо
        </p>
      </div>
    </div>
  )
}

export default function TitleSlide() {
  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
            Киберсигурност и защита на данните
          </h1>
          <p className="text-slate-400 text-sm tracking-[0.22em] uppercase">
            Академия по национална и информационна сигурност — АНИС
          </p>
        </div>

        {/* Body: lecturer | QR hero | lecturer */}
        <div className="flex items-center justify-center gap-16">
          <LecturerCard
            avatar={`${base}assets/tuntova-avatar.png`}
            name="доц. д-р Атанаска Тунтова"
            role="Декан и преподавател"
            expertise="Експерт в киберсигурността. Над 10 години преподавателски опит."
            gradient="bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600"
            haloColor="radial-gradient(circle, rgba(14,165,233,0.55), transparent 70%)"
          />
          <QRHero />
          <LecturerCard
            avatar={`${base}assets/varbanov-avatar.png`}
            name="инж. Иван Върбанов"
            role="Предприемач и лектор"
            expertise="Киберсигурност · Софтуерно инженерство · Социално инженерство"
            gradient="bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600"
            haloColor="radial-gradient(circle, rgba(168,85,247,0.5), transparent 70%)"
          />
        </div>
      </div>
    </div>
  )
}
