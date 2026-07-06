import { useState, useRef, useEffect } from "react";
import genres from "../data/genres";
import countries from "../data/countries";

export default function SearchFilter({
  search,
  setSearch,
  genreFilter,
  setGenreFilter,
  countryFilter,
  setCountryFilter,
}) {
  // =========================
  // CUSTOM DROPDOWN STATES
  // =========================
  const [isOpenGenre, setIsOpenGenre] = useState(false);
  const [isOpenCountry, setIsOpenCountry] = useState(false);

  const genreRef = useRef(null);
  const countryRef = useRef(null);

  // =========================
  // CLOSE DROPDOWN CLICK OUTSIDE
  // =========================
  useEffect(() => {
    function handleClickOutside(event) {
      // Tutup dropdown genre jika klik di luar
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setIsOpenGenre(false);
      }
      // Tutup dropdown negara jika klik di luar
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsOpenCountry(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="
      bg-white/[0.07]
      border border-white/10
      rounded-2xl
      p-6
      backdrop-blur-xl
      mt-10
      relative
      z-20
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-white">Search & Filter</h2>

        <button
          onClick={() => {
            setSearch("");
            setGenreFilter([]);
            setCountryFilter([]);
            setIsOpenGenre(false);
            setIsOpenCountry(false);
          }}
          className="
          bg-red-500/20
          hover:bg-red-500/30
          text-red-400
          px-4 py-2
          rounded-xl
          transition-all
          duration-300
          font-medium
          cursor-pointer
          hover:scale-[1.03] active:scale-[0.98]
          "
        >
          Reset
        </button>
      </div>

      {/* FILTER INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-30">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari Film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

        {/* GENRE MULTI FILTER */}
        <div className="relative z-50" ref={genreRef}>
          <div
            onClick={() => {
              setIsOpenGenre(!isOpenGenre);
              setIsOpenCountry(false);
            }}
            className="
            font-semibold
            bg-white/10
            border border-white/10
            rounded-xl
            px-4 py-3
            outline-none
            cursor-pointer
            flex
            justify-between
            items-center
            text-white
            min-h-[50px]
            transition-all
            duration-300
            "
            style={{
              borderColor: isOpenGenre ? "#a855f7" : "",
              boxShadow: isOpenGenre ? "0 0 0 2px rgba(168, 85, 247, 0.4)" : "",
            }}
          >
            <span className="truncate">
              {genreFilter.length > 0 ? genreFilter.join(", ") : "Semua Genre"}
            </span>

            <span
              className={`text-xs transition-transform duration-200 ${
                isOpenGenre ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {/* DROPDOWN GENRE */}
          {isOpenGenre && (
            <div className="absolute left-0 w-full md:w-[180%] mt-2 bg-[#1f2937] border border-white/10 rounded-xl p-4 max-h-60 overflow-y-auto shadow-2xl z-[100]">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className="flex items-center gap-2 cursor-pointer font-semibold text-white p-1 rounded hover:bg-white/[0.07] transition-colors w-full"
                  >
                    <input
                      type="checkbox"
                      checked={genreFilter.includes(genre)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGenreFilter([...genreFilter, genre]);
                        } else {
                          setGenreFilter(
                            genreFilter.filter((g) => g !== genre),
                          );
                        }
                      }}
                      className="accent-purple-500 w-4 h-4 cursor-pointer shrink-0"
                    />
                    <span className="select-none truncate">{genre}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* COUNTRY MULTI FILTER (SEKARANG KEMBAR IDENTIK 🚀) */}
        <div className="relative z-40" ref={countryRef}>
          <div
            onClick={() => {
              setIsOpenCountry(!isOpenCountry);
              setIsOpenGenre(false);
            }}
            className="
            font-semibold
            bg-white/10
            border border-white/10
            rounded-xl
            px-4 py-3
            outline-none
            cursor-pointer
            flex
            justify-between
            items-center
            text-white
            min-h-[50px]
            transition-all
            duration-300
            "
            style={{
              borderColor: isOpenCountry ? "#a855f7" : "",
              boxShadow: isOpenCountry
                ? "0 0 0 2px rgba(168, 85, 247, 0.4)"
                : "",
            }}
          >
            <span className="truncate">
              {countryFilter && countryFilter.length > 0
                ? countryFilter.join(", ")
                : "Semua Negara"}
            </span>

            <span
              className={`text-xs transition-transform duration-200 ${
                isOpenCountry ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {/* DROPDOWN NEGARA */}
          {isOpenCountry && (
            <div className="absolute right-0 w-full md:w-[180%] mt-2 bg-[#1f2937] border border-white/10 rounded-xl p-4 max-h-60 overflow-y-auto shadow-2xl z-[100]">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
                {countries.map((country) => (
                  <label
                    key={country}
                    className="flex items-center gap-2 cursor-pointer font-semibold text-white p-1 rounded hover:bg-white/[0.07] transition-colors w-full"
                  >
                    <input
                      type="checkbox"
                      checked={countryFilter && countryFilter.includes(country)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCountryFilter([...(countryFilter || []), country]);
                        } else {
                          setCountryFilter(
                            (countryFilter || []).filter((c) => c !== country),
                          );
                        }
                      }}
                      className="accent-purple-500 w-4 h-4 cursor-pointer shrink-0"
                    />
                    <span className="select-none truncate">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
