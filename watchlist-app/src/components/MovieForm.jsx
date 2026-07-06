import genres from "../data/genres";
import countries from "../data/countries";
import { useEffect, useRef, useState } from "react";

export default function MovieForm({ addMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState([]);
  const [country, setCountry] = useState([]);

  const [showGenres, setShowGenres] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  // State untuk menyimpan pesan dan tipe notifikasi (error atau success)
  const [toast, setToast] = useState({ message: "", type: "" });

  const genreRef = useRef(null);
  const countryRef = useRef(null);

  // Fungsi pemicu toast
  const triggerToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  };

  // =========================
  // RESET / CLEAR FORM FUNCTION
  // =========================
  const handleReset = () => {
    setTitle("");
    setGenre([]);
    setCountry([]);
    setShowGenres(false);
    setShowCountries(false);
  };

  // =========================
  // CLOSE DROPDOWN CLICK OUTSIDE
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Tutup dropdown genre jika klik di luar
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setShowGenres(false);
      }
      // Tutup dropdown negara jika klik di luar
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountries(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input kosong memicu Toast Kustom Error
    if (!title.trim()) {
      triggerToast("Kamu belum memasukkan judul film!", "error");
      return;
    }

    if (genre.length === 0) {
      triggerToast("Kamu belum memilih genre!", "error");
      return;
    }

    if (country.length === 0) {
      triggerToast("Kamu belum memilih negara asal film!", "error");
      return;
    }

    // =========================
    // ADD MOVIE
    // =========================
    const newMovie = {
      id: crypto.randomUUID(),
      title,
      genre,
      country,
      watched: false,
      createdAt: new Date().toLocaleDateString(),
    };

    addMovie(newMovie);

    // Memicu Toast Kustom Sukses
    triggerToast(`Film "${title}" Ditambahkan 🎉`, "success");

    handleReset();
  };

  return (
    <>
      {/* TAMPILAN TOAST/ALERT KUSTOM */}
      {toast.message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] animate-bounce">
          <div
            className={`bg-[#1f2937] border-2 rounded-2xl px-6 py-3 shadow-2xl backdrop-blur-md flex items-center gap-3 transition-all duration-300 ${
              toast.type === "success"
                ? "border-emerald-500 shadow-emerald-500/20"
                : "border-purple-500 shadow-purple-500/20"
            }`}
          >
            <span className="text-xl">
              {toast.type === "success" ? "✅" : "⚠️"}
            </span>
            <p className="text-white font-medium text-sm md:text-base whitespace-nowrap">
              {toast.message}
            </p>
            <button
              onClick={() => setToast({ message: "", type: "" })}
              className="text-gray-400 hover:text-white ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="
        relative 
        z-30
        bg-white/[0.07]
        border border-white/10
        rounded-2xl
        p-6
        backdrop-blur-xl
        mb-10
        "
      >
        <h2 className="text-2xl font-bold mb-2 text-white">Tambah Film Baru</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Judul Film"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
            font-semibold
            bg-white/10
            border border-white/10
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-purple-500
            focus:ring-2
            focus:ring-purple-500/40
            transition-all
            duration-300
            text-white
            "
          />

          {/* Genre Dropdown */}
          <div ref={genreRef} className="relative z-[60]">
            <button
              type="button"
              onClick={() => {
                setShowGenres(!showGenres);
                setShowCountries(false);
              }}
              className="
              font-semibold
              w-full
              bg-white/10
              border border-white/10
              rounded-xl
              px-4 py-3
              text-left
              outline-none
              transition-all
              duration-300
              text-white
              flex
              justify-between
              items-center
              cursor-pointer
              min-h-[50px]
              "
              style={{
                borderColor: showGenres ? "#a855f7" : "",
                boxShadow: showGenres
                  ? "0 0 0 2px rgba(168, 85, 247, 0.4)"
                  : "",
              }}
            >
              <span className="truncate">
                {genre.length > 0 ? genre.join(", ") : "Pilih Genre"}
              </span>
              <span
                className={`text-xs transition-transform duration-200 ${showGenres ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {/* List Pilihan Checkbox Grid */}
            {showGenres && (
              <div className="absolute left-0 w-full md:w-[180%] mt-2 bg-[#1f2937] border border-white/10 rounded-xl p-4 max-h-60 overflow-y-auto shadow-2xl z-[100]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
                  {genres.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer font-semibold text-white p-1 rounded hover:bg-white/[0.07] transition-colors w-full"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={genre.includes(item)}
                        className="accent-purple-500 w-4 h-4 cursor-pointer shrink-0"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGenre([...genre, item]);
                          } else {
                            setGenre(genre.filter((g) => g !== item));
                          }
                        }}
                      />
                      <span className="select-none truncate">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div ref={countryRef} className="relative z-[50]">
            <button
              type="button"
              onClick={() => {
                setShowCountries(!showCountries);
                setShowGenres(false);
              }}
              className="
              font-semibold
              w-full
              bg-white/10
              border border-white/10
              rounded-xl
              px-4 py-3
              text-left
              outline-none
              transition-all
              duration-300
              text-white
              flex
              justify-between
              items-center
              cursor-pointer
              min-h-[50px]
              "
              style={{
                borderColor: showCountries ? "#a855f7" : "",
                boxShadow: showCountries
                  ? "0 0 0 2px rgba(168, 85, 247, 0.4)"
                  : "",
              }}
            >
              <span className="truncate">
                {country.length > 0 ? country.join(", ") : "Pilih Negara Asal"}
              </span>
              <span
                className={`text-xs transition-transform duration-200 ${showCountries ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {/* List Pilihan Checkbox Grid Negara */}
            {showCountries && (
              <div className="absolute right-0 w-full md:w-[180%] mt-2 bg-[#1f2937] border border-white/10 rounded-xl p-4 max-h-60 overflow-y-auto shadow-2xl z-[100]">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
                  {countries.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer font-semibold text-white p-1 rounded hover:bg-white/[0.07] transition-colors w-full"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={country.includes(item)}
                        className="accent-purple-500 w-4 h-4 cursor-pointer shrink-0"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCountry([...country, item]);
                          } else {
                            setCountry(country.filter((c) => c !== item));
                          }
                        }}
                      />
                      <span className="select-none truncate">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="
            bg-purple-500
            hover:bg-purple-600
            hover:scale-[1.03] active:scale-[0.98]
            transition-all
            duration-300
            px-5 py-3
            rounded-xl
            font-medium
            shadow-lg
            shadow-purple-500/30
            cursor-pointer
            text-white
            "
          >
            Tambah Film
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="
            bg-red-500/20
            hover:bg-red-500/30
            text-red-400
            hover:scale-[1.03] active:scale-[0.98]
            transition-all
            duration-300
            px-5 py-3
            rounded-xl
            font-medium
            cursor-pointer
            "
          >
            Batal
          </button>
        </div>
      </form>
    </>
  );
}
