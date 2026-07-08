export default function StatsCard({ title, total, textColor, icon }) {
  return (
    <div
      className="
      bg-white/[0.07]
      border border-white/10
      rounded-2xl
      p-6
      backdrop-blur-xl
      hover:border-purple-500/30
      hover:shadow-lg
      hover:shadow-purple-500/10
      hover:-translate-y-1
      transition-all
      duration-300
      flex items-center gap-5 /* 2. Ditambahkan agar ikon & teks berjejer ke samping */
      "
    >
      {icon}

      <div>
        <p className="font-semibold text-gray-400 text-sm">{title}</p>
        <h3 className={`text-4xl font-bold mt-2 ${textColor}`}>{total}</h3>
      </div>
    </div>
  );
}
