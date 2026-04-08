import { QRCodeSVG } from 'qrcode.react'

const base = import.meta.env.BASE_URL
const DEMO_URL = 'https://udih.anis.bg/cyber-demo/'

function LecturerCard({ avatar, name, role, expertise }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 shrink-0 rounded-full p-0.5 bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
        <img
          src={avatar}
          alt={name}
          className="w-full h-full rounded-full object-cover border-2 border-slate-900"
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <p className="text-blue-400 font-medium text-sm">{role}</p>
        <p className="text-xs text-slate-400 leading-relaxed mt-1">{expertise}</p>
      </div>
    </div>
  )
}

export default function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-12">
      <h1 className="text-3xl font-bold text-white mb-1 leading-tight text-center">
        Киберсигурност и защита на данните
      </h1>

      <p className="text-slate-400 text-sm mb-8 text-center">
        Академия по национална и информационна сигурност — АНИС
      </p>

      {/* QR code (left) + Lecturers (right) */}
      <div className="flex items-center justify-center gap-16">
        {/* QR Code */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="bg-white p-4 rounded-2xl shadow-lg shadow-red-500/10 border border-red-500/20">
            <QRCodeSVG
              value={DEMO_URL}
              size={200}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="M"
            />
          </div>
          <p className="text-red-400 font-semibold text-sm tracking-wide">
            Сканирай ме, ако смееш!
          </p>
        </div>

        {/* Lecturers stacked */}
        <div className="flex flex-col gap-6">
          <LecturerCard
            avatar={`${base}assets/tuntova-avatar.png`}
            name="доц. д-р Атанаска Тунтова"
            role="Декан и преподавател"
            expertise="Експерт в киберсигурността. Над 10 години преподавателски опит."
          />
          <LecturerCard
            avatar={`${base}assets/varbanov-avatar.jpg`}
            name="инж. Иван Върбанов"
            role="Предприемач и лектор"
            expertise="Киберсигурност · Софтуерно инженерство · Социално инженерство"
          />
        </div>
      </div>
    </div>
  )
}
