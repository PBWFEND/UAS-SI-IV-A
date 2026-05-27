import { useEffect, useState, useRef } from "react";
import genres from "../data/genres";
import countries from "../data/countries";

export default function EditMovieModal({
  editMovie,
  setEditMovie,
  updateMovie,
}) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState([]);
  const [country, setCountry] = useState([]);

  // State dan Ref untuk Custom Dropdown
  const [showGenres, setShowGenres] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const genreRef = useRef(null);
  const countryRef = useRef(null);

  // State untuk memicu Toast Sukses di Tengah Layar
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (editMovie) {
      setTitle(editMovie.title);
      setGenre(
        Array.isArray(editMovie.genre) ? editMovie.genre : [editMovie.genre],
      );
      setCountry(
        Array.isArray(editMovie.country)
          ? editMovie.country
          : [editMovie.country],
      );
    }
  }, [editMovie]);

  // Menutup dropdown otomatis jika pengguna mengklik di luar area masing-masing dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setShowGenres(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountries(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!editMovie && !successMessage) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Kamu belum memasukkan judul film!");
      return;
    }

    if (genre.length === 0) {
      alert("Kamu belum memilih genre!");
      return;
    }

    if (country.length === 0) {
      alert("Kamu belum memilih negara asal film!");
      return;
    }

    const updatedMovie = {
      ...editMovie,
      title,
      genre,
      country,
    };

    setSuccessMessage("Perubahan berhasil disimpan! 🚀");
    setShowGenres(false);
    setShowCountries(false);

    setTimeout(() => {
      updateMovie(updatedMovie);
      setEditMovie(null);
      setSuccessMessage("");
    }, 1500);
  };

  return (
    <>
      {/* 1. TOAST SUKSES UTAMA */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black/40 backdrop-blur-xs pointer-events-auto">
          <div className="bg-[#111827]/95 border-2 border-purple-500 rounded-2xl px-8 py-5 shadow-[0_0_40px_rgba(168,85,247,0.5)] flex flex-col items-center gap-2 max-w-sm text-center animate-bounce">
            <span className="text-3xl">✨</span>
            <p className="text-white font-semibold text-base md:text-lg tracking-wide">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      {/* 2. LAYER MODAL UTAMA */}
      {editMovie && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 overflow-y-auto py-10">
          <div className="w-full max-w-2xl bg-[#111827] border border-white/10 rounded-3xl p-6 relative z-50 my-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Film</h2>
              <button
                onClick={() => setEditMovie(null)}
                className="text-gray-400 hover:text-white transition"
                type="button"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* Perubahan utama: Ditambahkan isolasi relative pada grid agar dropdown tidak bocor keluar modal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {/* TITLE */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium ml-1 md:hidden">
                    Judul Film
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Movie Title"
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 font-semibold text-white"
                  />
                </div>

                {/* GENRE */}
                <div
                  className={`relative flex flex-col gap-1 ${showGenres ? "z-40" : "z-20"}`}
                  ref={genreRef}
                >
                  <label className="text-xs text-gray-400 font-medium ml-1 md:hidden">
                    Genre
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowGenres(!showGenres);
                      setShowCountries(false);
                    }}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-left outline-none transition-all duration-300 font-semibold text-white flex justify-between items-center cursor-pointer min-h-[50px]"
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

                  {showGenres && (
                    <div className="absolute left-0 w-full md:w-[140%] mt-14 bg-[#1f2937] border border-white/10 rounded-xl p-4 max-h-60 overflow-y-auto shadow-2xl z-[100]">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
                        {genres.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 cursor-pointer font-semibold text-white p-1 rounded hover:bg-white/5 transition-colors w-full"
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

                {/* COUNTRY */}
                <div
                  className={`relative flex flex-col gap-1 ${showCountries ? "z-40" : "z-10"}`}
                  ref={countryRef}
                >
                  <label className="text-xs text-gray-400 font-medium ml-1 md:hidden">
                    Negara Asal
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCountries(!showCountries);
                      setShowGenres(false);
                    }}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-left outline-none transition-all duration-300 font-semibold text-white flex justify-between items-center cursor-pointer min-h-[50px]"
                    style={{
                      borderColor: showCountries ? "#a855f7" : "",
                      boxShadow: showCountries
                        ? "0 0 0 2px rgba(168, 85, 247, 0.4)"
                        : "",
                    }}
                  >
                    <span className="truncate">
                      {country.length > 0 ? country.join(", ") : "Pilih Negara"}
                    </span>
                    <span
                      className={`text-xs transition-transform duration-200 ${showCountries ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  {showCountries && (
                    <div className="absolute left-0 md:left-[-40%] w-full md:w-[140%] mt-14 bg-[#1f2937] border border-white/10 rounded-xl p-4 max-h-60 overflow-y-auto shadow-2xl z-[100]">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
                        {countries.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 cursor-pointer font-semibold text-white p-1 rounded hover:bg-white/5 transition-colors w-full"
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

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-6 relative z-10">
                <button
                  type="button"
                  onClick={() => setEditMovie(null)}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold text-white w-1/2 sm:w-auto"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition font-semibold text-white w-1/2 sm:w-auto"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
