import { useState } from "react";

export default function MovieCard({
  movie,
  toggleWatched,
  onEdit,
  editMovie,
  deleteMovie,
}) {
  const isEditing = editMovie?.id === movie.id;

  // State untuk data pesan dan tipe
  const [toast, setToast] = useState({ message: "", type: "" });
  // State untuk mengontrol transisi masuk/keluar
  const [showToast, setShowToast] = useState(false);

  const handleWatchClick = () => {
    if (movie.watched) {
      setToast({
        message: `Film "${movie.title}" batal ditonton!`,
        type: "cancel",
      });
    } else {
      setToast({
        message: `Film "${movie.title}" selesai ditonton! 🎉`,
        type: "watch",
      });
    }

    // Aktifkan transisi masuk
    setShowToast(true);

    setTimeout(() => {
      toggleWatched(movie.id);
    }, 1000);

    setTimeout(() => {
      setShowToast(false);

      setTimeout(() => {
        setToast({ message: "", type: "" });
      }, 300);
    }, 2500);
  };

  return (
    <>
      {toast.message && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999] p-4 transition-all duration-300 ease-out ${
            showToast
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div
            className={`bg-[#1f2937]/95 border-2 rounded-2xl px-6 py-3 shadow-2xl backdrop-blur-md flex items-center gap-3 ${
              toast.type === "watch"
                ? "border-emerald-500 shadow-emerald-500/20"
                : "border-purple-500 shadow-purple-500/20"
            }`}
          >
            <span className="text-xl">
              {toast.type === "watch" ? "✅" : "🔮"}
            </span>
            <p className="text-white font-medium text-sm md:text-base whitespace-nowrap">
              {toast.message}
            </p>
            <button
              onClick={() => setShowToast(false)}
              className="text-gray-400 hover:text-white ml-2 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* CARD COMPONENT */}
      <div className="bg-white/[0.07] animate-[fadeIn_.4s_ease] border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col h-full">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold break-words">
                {movie.title}
              </h3>

              <p className="font-semibold text-gray-400 text-sm md:text-sm mt-1 break-words">
                {movie.genre.join(", ")} •{" "}
                {Array.isArray(movie.country)
                  ? movie.country.join(", ")
                  : movie.country}
              </p>
            </div>

            <span
              className={`font-semibold text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                movie.watched
                  ? "bg-green-500/20 text-green-400"
                  : "bg-pink-500/20 text-pink-400"
              }`}
            >
              {movie.watched ? "Sudah Ditonton" : "Belum Ditonton"}
            </span>
          </div>

          <p className="font-semibold text-gray-500 text-sm mt-4">
            Ditambahkan: {movie.createdAt}
          </p>
        </div>

        <div className="flex gap-3 mt-6 mt-auto">
          {/* WATCH BUTTON */}
          <button
            onClick={handleWatchClick}
            className="flex-1 min-h-[44px] text-sm md:text-base bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 rounded-xl transition-all duration-300 font-medium cursor-pointer"
          >
            {movie.watched ? "Batal" : "Tonton"}
          </button>

          {/* EDIT BUTTON */}
          <button
            onClick={() => {
              console.log(movie);
              onEdit(movie);
            }}
            className="flex-1 min-h-[44px] text-sm md:text-base bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 rounded-xl transition-all duration-300 font-medium cursor-pointer"
          >
            Edit
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={() => deleteMovie(movie.id)}
            className="flex-1 min-h-[44px] text-sm md:text-base bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-xl transition-all duration-300 font-medium cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>
    </>
  );
}
