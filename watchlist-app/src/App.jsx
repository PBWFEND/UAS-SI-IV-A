import { useEffect, useState } from "react";

import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";
import SearchFilter from "./components/SearchFilter";
import StatsCard from "./components/StatsCard";
import EditMovieModal from "./components/EditMovieModal";

export default function App() {
  // =========================
  // STATE
  // =========================
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);
  const [editMovie, setEditMovie] = useState(null);

  // State Baru untuk Modal Konfirmasi Hapus Kustom (Tengah Layar)
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    movieId: null,
    movieTitle: "",
  });

  // State Baru untuk Toast Sukses Hapus Kustom (Atas Tengah)
  const [deleteToast, setDeleteToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("all");

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
    } else {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // =========================
  // HANDLERS
  // =========================
  const addMovie = (movie) => {
    setMovies((prevMovies) => [movie, ...prevMovies]);
  };

  const toggleWatched = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie,
      ),
    );
  };

  const handleEditMovie = (movie) => {
    setEditMovie(movie);
  };

  const updateMovie = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie,
      ),
    );
    setEditMovie(null);
  };

  // Pemicu awal Modal Konfirmasi Kustom (menggantikan window.confirm)
  const triggerDeleteConfirm = (movie) => {
    setDeleteConfirm({
      isOpen: true,
      movieId: movie.id,
      movieTitle: movie.title,
    });
  };

  // Eksekusi hapus setelah user klik "Ya, Hapus" di Modal Kustom
  const executeDeleteMovie = () => {
    const id = deleteConfirm.movieId;
    const title = deleteConfirm.movieTitle;

    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    setDeleteConfirm({ isOpen: false, movieId: null, movieTitle: "" });

    setToastMessage(`🗑️ Film "${title}" Dihapus!`);
    setDeleteToast(true);

    setTimeout(() => {
      setDeleteToast(false);
    }, 2500);
  };

  // =========================
  // DERIVED DATA
  // =========================
  const watchedMovies = movies.filter((movie) => movie.watched);
  const unwatchedMovies = movies.filter((movie) => !movie.watched);

  const filteredMovies = movies.filter((movie) => {
    const matchSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchGenre =
      genreFilter.length === 0 ||
      genreFilter.some((genre) => movie.genre.includes(genre));

    const matchCountry =
      countryFilter.length === 0 ||
      countryFilter.some((country) => {
        if (Array.isArray(movie.country)) {
          return movie.country.includes(country);
        }
        if (typeof movie.country === "string") {
          return movie.country === country;
        }
        return false;
      });

    return matchSearch && matchGenre && matchCountry;
  });

  const filteredUnwatched = filteredMovies.filter((movie) => !movie.watched);
  const filteredWatched = filteredMovies.filter((movie) => movie.watched);

  return (
    <div className="min-h-screen md:h-screen bg-gradient-to-br from-[#060816] via-[#0b1023] to-[#060816] text-white flex relative overflow-hidden md:overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] left-[-150px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-200px] right-[-150px] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl"></div>

      {/* 1. TOAST SUKSES HAPUS */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999] p-4 transition-all duration-300 ease-out ${
          deleteToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-[#1f2937]/95 border-2 border-red-500/80 rounded-2xl px-6 py-3 shadow-2xl shadow-red-500/10 backdrop-blur-md flex items-center gap-3">
          <p className="text-white font-medium text-sm md:text-base whitespace-nowrap">
            {toastMessage}
          </p>
          <button
            onClick={() => setDeleteToast(false)}
            className="text-gray-400 hover:text-white ml-2 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 2. MODAL KONFIRMASI HAPUS KUSTOM */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[998] px-4">
          <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-center">
            <span className="text-4xl block mb-3">⚠️</span>
            <h3 className="text-xl font-bold text-white mb-2">
              Konfirmasi Hapus
            </h3>
            <p className="font-semibold text-gray-300 text-sm mb-6 leading-relaxed">
              Apakah kamu yakin ingin menghapus film{" "}
              <span className="text-purple-400 font-semibold">
                "{deleteConfirm.movieTitle}"
              </span>{" "}
              dari watchlist? Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() =>
                  setDeleteConfirm({
                    isOpen: false,
                    movieId: null,
                    movieTitle: "",
                  })
                }
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-medium text-white cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={executeDeleteMovie}
                className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 transition-all font-medium text-red-400 cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-300
                  ${
                    isSidebarOpen
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }
                  `}
      >
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        ></div>

        <div
          className="absolute top-0 left-0 h-screen w-64 border-r border-white/10 p-5 flex flex-col justify-between overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 mb-1">
            <div className="flex items-center justify-between mb-0">
              <div className="flex items-center justify-start py-0">
                <img
                  src="/logo.png"
                  alt="CineTrack Logo"
                  className="w-18 h-18 object-contain filter drop-shadow-[0_0_10px_rgba(168,85,247,0.65)]"
                />
                <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-gray-200 to-purple-400 bg-clip-text text-transparent">
                  MovieFlux
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white text-xl cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  setTimeout(() => {
                    const mainContent = document.querySelector("main");
                    if (mainContent) {
                      mainContent.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
                <span>Spotlight</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView("all");
                  setIsSidebarOpen(false);
                  setTimeout(() => {
                    const mainContent = document.querySelector("main");
                    const target = document.getElementById("all-movies");
                    if (mainContent && target) {
                      const topPos = target.offsetTop - 24;
                      mainContent.scrollTo({ top: topPos, behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M20.2 6 3 11l-.9-2.4 17.2-5.1Z" />
                  <path d="M22 8v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z" />
                  <path d="M2 12h20" />
                  <path d="m7 8-2 4" />
                  <path d="m12 8-2 4" />
                  <path d="m17 8-2 4" />
                </svg>
                <span>Semua Film</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView("unwatched");
                  setIsSidebarOpen(false);
                  setTimeout(() => {
                    const mainContent = document.querySelector("main");
                    const target = document.getElementById("unwatched-section");
                    if (mainContent && target) {
                      const topPos = target.offsetTop - 24;
                      mainContent.scrollTo({ top: topPos, behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Belum Ditonton</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView("watched");
                  setIsSidebarOpen(false);
                  setTimeout(() => {
                    const mainContent = document.querySelector("main");
                    const target = document.getElementById("watched-section");
                    if (mainContent && target) {
                      const topPos = target.offsetTop - 24;
                      mainContent.scrollTo({ top: topPos, behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
                <span>Sudah Ditonton</span>
              </button>
            </nav>

            {/* Statistik Section Mobile */}
            <div className="mt-2 pt-2 border-t border-white/5">
              <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase px-3 mb-1">
                STATISTIK
              </p>
              <div className="space-y-0">
                <div className="flex items-center justify-between px-3 py-1 text-gray-400 text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>Total Film</span>
                  </div>
                  <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                    {movies.length}
                  </span>
                </div>

                <div className="flex items-center justify-between px-3 py-1 text-gray-400 text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Belum Ditonton</span>
                  </div>
                  <span className="text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                    {unwatchedMovies.length}
                  </span>
                </div>

                <div className="flex items-center justify-between px-3 py-1 text-gray-400 text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17L4 12" />
                    </svg>
                    <span>Sudah Ditonton</span>
                  </div>
                  <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                    {watchedMovies.length}
                  </span>
                </div>

                <div className="flex items-center justify-between px-3 py-1 text-gray-400 text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    >
                      <path d="m12 3-1.912 5.886H3.894l5.016 3.644L6.998 18.4 12 14.756 17.002 18.4l-1.912-5.87 5.016-3.644h-6.194Z" />
                    </svg>
                    <span>Total Genre</span>
                  </div>
                  <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                    {
                      new Set(
                        movies.flatMap((m) => {
                          if (!m.genre) return [];
                          if (Array.isArray(m.genre))
                            return m.genre.map((g) => g.trim());
                          return m.genre.split(",").map((g) => g.trim());
                        }),
                      ).size
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between px-3 py-1 text-gray-400 text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                    <span>Total Negara</span>
                  </div>
                  <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                    {
                      new Set(
                        movies.flatMap((m) => {
                          if (!m.country) return [];
                          if (Array.isArray(m.country))
                            return m.country.map((c) => c.trim());
                          return m.country.split(",").map((c) => c.trim());
                        }),
                      ).size
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 mt-35 pt-2 border-t border-white/5">
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2 mb-2">
                <p className="text-[11px] italic font-bold leading-tight animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-300 to-purple-600">
                  "Film adalah gerbang ke dunia yang tak terbatas."
                </p>
              </div>
              <p className="text-[10px] text-gray-500 font-medium text-center tracking-wide pb-2">
                © {new Date().getFullYear()}{" "}
                <span className="text-purple-400/80 font-medium">
                  Devaldy Dzikri
                </span>
                . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white/[0.02] backdrop-blur-md border-r border-white/10 p-5 flex-col justify-between h-screen overflow-y-auto custom-scrollbar flex-shrink-0">
        <div>
          <div className="flex items-center justify-start py-0 gap-2">
            <img
              src="/logo-icon..png"
              alt="CineTrack Logo"
              className="w-18 h-18 object-contain filter drop-shadow-[0_0_10px_rgba(168,85,247,0.65)]"
            />
            <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-gray-200 to-purple-400 bg-clip-text text-transparent">
              MovieFlux
            </span>
          </div>
          <nav className="mt-1 space-y-1">
            <button
              onClick={() => {
                const mainContent = document.querySelector("main");
                if (mainContent) {
                  mainContent.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
              <span>Spotlight</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("all");
                const mainContent = document.querySelector("main");
                const target = document.getElementById("all-movies");
                if (mainContent && target) {
                  const topPos = target.offsetTop - 24;
                  mainContent.scrollTo({ top: topPos, behavior: "smooth" });
                }
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M20.2 6 3 11l-.9-2.4 17.2-5.1Z" />
                <path d="M22 8v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z" />
                <path d="M2 12h20" />
                <path d="m7 8-2 4" />
                <path d="m12 8-2 4" />
                <path d="m17 8-2 4" />
              </svg>
              <span>Semua Film</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("unwatched");
                const mainContent = document.querySelector("main");
                const target = document.getElementById("unwatched-section");
                if (mainContent && target) {
                  const topPos = target.offsetTop - 24;
                  mainContent.scrollTo({ top: topPos, behavior: "smooth" });
                }
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Belum Ditonton</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("watched");
                const mainContent = document.querySelector("main");
                const target = document.getElementById("watched-section");
                if (mainContent && target) {
                  const topPos = target.offsetTop - 24;
                  mainContent.scrollTo({ top: topPos, behavior: "smooth" });
                }
              }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-3 text-white text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M20 6L9 17L4 12" />
              </svg>
              <span>Sudah Ditonton</span>
            </button>
          </nav>

          {/* Statistik Section Desktop */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase px-3 mb-2">
              STATISTIK
            </p>
            <div className="space-y-0.5">
              <div className="flex items-center justify-between px-3 py-1.5 text-gray-400 text-xs font-medium">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span>Total Film</span>
                </div>
                <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                  {movies.length}
                </span>
              </div>

              <div className="flex items-center justify-between px-3 py-1.5 text-gray-400 text-xs font-medium">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Belum Ditonton</span>
                </div>
                <span className="text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                  {unwatchedMovies.length}
                </span>
              </div>

              <div className="flex items-center justify-between px-3 py-1.5 text-gray-400 text-xs font-medium">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                  <span>Sudah Ditonton</span>
                </div>
                <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                  {watchedMovies.length}
                </span>
              </div>

              <div className="flex items-center justify-between px-3 py-1.5 text-gray-400 text-xs font-medium">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  >
                    <path d="m12 3-1.912 5.886H3.894l5.016 3.644L6.998 18.4 12 14.756 17.002 18.4l-1.912-5.87 5.016-3.644h-6.194Z" />
                  </svg>
                  <span>Total Genre</span>
                </div>
                <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                  {
                    new Set(
                      movies.flatMap((m) => {
                        if (!m.genre) return [];
                        if (Array.isArray(m.genre))
                          return m.genre.map((g) => g.trim());
                        return m.genre.split(",").map((g) => g.trim());
                      }),
                    ).size
                  }
                </span>
              </div>

              <div className="flex items-center justify-between px-3 py-1.5 text-gray-400 text-xs font-medium">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <span>Total Negara</span>
                </div>
                <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                  {
                    new Set(
                      movies.flatMap((m) => {
                        if (!m.country) return [];
                        if (Array.isArray(m.country))
                          return m.country.map((c) => c.trim());
                        return m.country.split(",").map((c) => c.trim());
                      }),
                    ).size
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 mt-30 pt-4 border-t border-white/5">
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
              <p className="text-[13px] italic font-bold leading-relaxed animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-300 to-purple-600 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                "Film adalah gerbang ke dunia yang tak terbatas."
              </p>
            </div>
            <p className="text-[10px] text-gray-500 font-medium text-center mt-3 tracking-wide select-none">
              © {new Date().getFullYear()}{" "}
              <span className="text-purple-400/80 font-medium">
                Devaldy Dzikri
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        id="top-dashboard"
        className="flex-1 p-6 md:p-10 h-[100dvh] overflow-y-auto scroll-smooth"
      >
        <div className="md:hidden flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-purple-400"></h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-6 right-6 z-50 bg-gray-900/80 backdrop-blur-md border border-white/10 hover:border-purple-500/50 px-4 py-2 rounded-xl cursor-pointer hover:bg-purple-400/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"
        >
          ☰
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-4 md:mt-0 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-2xl font-bold flex items-center gap-4 text-white">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.35)] flex-shrink-0 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-purple-300 animate-pulse shadow-[0_0_10px_rgba(216,180,254,0.8)]"></div>
              </div>
              <span>Spotlight</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-semibold text-gray-400 text-sm">
                Catat film yang ingin kamu tonton
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 drop-shadow-[0_0_6px_rgba(249,115,22,0.7)]"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.13a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
                <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
                <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <MovieForm addMovie={addMovie} />

          <SearchFilter
            search={search}
            setSearch={setSearch}
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            countryFilter={countryFilter}
            setCountryFilter={setCountryFilter}
          />

          <div className="relative z-0 grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatsCard
              title="Total Film"
              total={movies.length}
              textColor="text-white"
              icon={
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.2 6 3 11l-.9-2.4 17.2-5.1Z" />
                    <path d="M22 8v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z" />
                    <path d="M2 12h20" />
                    <path d="m7 8-2 4" />
                    <path d="m12 8-2 4" />
                    <path d="m17 8-2 4" />
                  </svg>
                </div>
              }
            />

            <StatsCard
              title="Belum Ditonton"
              total={unwatchedMovies.length}
              textColor="text-pink-400"
              icon={
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-pink-400/10 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.3)] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d946ef"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              }
            />

            <StatsCard
              title="Sudah Ditonton"
              total={watchedMovies.length}
              textColor="text-emerald-400"
              icon={
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11" />
                  </svg>
                </div>
              }
            />
          </div>

          <div id="all-movies" className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">List Tontonan Film </h2>
            <p className="font-semibold text-gray-400 text-sm">
              {filteredMovies.length} Film
            </p>
          </div>

          <div id="unwatched-section" className="space-y-5">
            <h2 className="text-2xl font-bold text-pink-400 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Belum Ditonton</span>
            </h2>

            {filteredUnwatched.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="font-semibold text-gray-400">
                  Tidak ada film yang belum ditonton.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredUnwatched.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleWatched={toggleWatched}
                    onEdit={handleEditMovie}
                    deleteMovie={() => triggerDeleteConfirm(movie)}
                  />
                ))}
              </div>
            )}
          </div>

          <div id="watched-section" className="space-y-5 mt-10">
            <h2 className="text-2xl font-bold text-green-400 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M20 6L9 17L4 12" />
              </svg>
              <span>Sudah Ditonton</span>
            </h2>

            {filteredWatched.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="font-semibold text-gray-400">
                  Belum ada film yang sudah ditonton.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredWatched.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleWatched={toggleWatched}
                    onEdit={handleEditMovie}
                    deleteMovie={() => triggerDeleteConfirm(movie)}
                  />
                ))}
              </div>
            )}
          </div>

          <EditMovieModal
            editMovie={editMovie}
            setEditMovie={setEditMovie}
            updateMovie={updateMovie}
          />
        </div>
      </main>
    </div>
  );
}
