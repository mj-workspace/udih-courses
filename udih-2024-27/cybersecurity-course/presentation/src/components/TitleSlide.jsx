import { QRCodeSVG } from 'qrcode.react'

const base = import.meta.env.BASE_URL
const DEMO_URL = 'https://udih.anis.bg/cyber-demo/'

function LecturerCard({ avatar, name, role, expertise, bio }) {
  return (
    <div className="flex flex-col items-center text-center max-w-sm">
      {/* Avatar with gradient border */}
      <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-full h-full rounded-full object-cover border-3 border-slate-900"
        />
      </div>

      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-blue-400 font-medium text-sm mb-2">{role}</p>
      <p className="text-xs text-slate-400 leading-relaxed mb-1">{expertise}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{bio}</p>
    </div>
  )
}

export default function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-12">
      <p className="text-sm uppercase tracking-[0.25em] text-blue-400 mb-2">
        UDIH — Програма 2024–2027
      </p>

      <h1 className="text-3xl font-bold text-white mb-1 leading-tight text-center">
        Киберсигурност и защита на данните
      </h1>

      <p className="text-slate-400 text-sm mb-8 text-center">
        Академия по национална и информационна сигурност — АНИС
      </p>

      {/* Lecturers + QR code */}
      <div className="flex items-center justify-center gap-16">
        <LecturerCard
          avatar={`${base}assets/tuntova-avatar.png`}
          name="доц. д-р Атанаска Тунтова"
          role="Декан и преподавател"
          expertise="Експерт в киберсигурността"
          bio="Над 10 години преподавателски опит. Професионален път в държавния и академичния сектор."
        />

        {/* QR Code */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white p-3 rounded-xl shadow-lg shadow-red-500/10 border border-red-500/20">
            <QRCodeSVG
              value={DEMO_URL}
              size={140}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="M"
            />
          </div>
          <p className="text-red-400 font-semibold text-sm tracking-wide">
            Сканирай ме, ако смееш!
          </p>
        </div>

        <LecturerCard
          avatar={`${base}assets/varbanov-avatar.jpg`}
          name="инж. Иван Върбанов"
          role="Предприемач и лектор"
          expertise="Киберсигурност · Софтуерно инженерство · Социално инженерство"
          bio="Предприемач от 2008 г. Блокчейн, AI, софтуерна разработка и дигитален маркетинг."
        />
      </div>
    </div>
  )
}
