import { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("init"); // init -> show -> exit

  useEffect(() => {
    // start show after mount
    const t1 = setTimeout(() => setPhase("show"), 100);

    // progress bar
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onFinish, 600);
        }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 120);

    return () => { clearTimeout(t1); clearInterval(interval); };
  }, [onFinish]);

  return (
    <div className={`splash ${phase}`}>
      <div className="splash-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>

      <div className="splash-content">
        <div className="splash-logo">
          <div className="logo-ring" />
          <span className="logo-icon">🎵</span>
        </div>

        <div className="splash-text">
          <h1 className="splash-title"><span>Tunify</span></h1>
          <p className="splash-sub">Koleksi musik personalmu</p>
        </div>

        <div className="splash-loader">
          <div className="loader-track">
            <div className="loader-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="loader-pct">{Math.round(progress)}%</span>
        </div>

        <div className="splash-dots">
          <span className="dot d1" />
          <span className="dot d2" />
          <span className="dot d3" />
        </div>
      </div>

      <div className="splash-footer">
        <span>UAS Pemrograman Berbasis Web Front-End · Kelompok 4</span>
      </div>
    </div>
  );
}

export default SplashScreen;
