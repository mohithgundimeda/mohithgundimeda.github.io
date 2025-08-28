import React, { useState, useEffect, useRef } from "react";
import styles from "./assets/Desktop.module.css";
import Menu from "./Components/Menu";
import Projects from "./Components/Projects";



const windowsConfig = {
  projects: {
    title: "Projects",
    component: Projects,
    image: '/Briefcase.png',
  },
};


export default function Desktop({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windows, setWindows] = useState({});
  const [time, setTime] = useState(new Date());
  const menuRef = useRef(null);

   useEffect(() => {
    const initialState = {};
    Object.keys(windowsConfig).forEach((key) => {
      initialState[key] = { open: false, minimized: false, active: false  };
    });
    setWindows(initialState);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.classList.contains(styles.startButton)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement &&    
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&   
        !document.msFullscreenElement) {   
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const openWindow = (key) => {
    setWindows((prev) => {
      const updated = {};
      for (const k in prev) {
        updated[k] = { ...prev[k], active: k === key };
      }
      updated[key] = { open: true, minimized: false, active: true };
      return updated;
    });
    setIsMenuOpen(false);
  };


    const minimizeWindow = (key) => {
    setWindows((prev) => ({
      ...prev,
      [key]: { ...prev[key], minimized: true, active: false }
    }));
  };



const restoreWindow = (key) => {
  setWindows((prev) => {
    const updated = {};
    for (const k in prev) {
      updated[k] = {
        ...prev[k],
        active: k === key,
      };
    }
    updated[key] = { ...prev[key], open: true, minimized: false, active: true };
    return updated;
  });
};


  const closeWindow = (key) => {
    setWindows((prev) => ({
      ...prev,
      [key]: { open: false, minimized: false, active: false}
    }));
  };

  return (
    <div className={styles.container}>
      <img src="/bliss200.jpg" alt="Bliss" className={styles.desktopImage} loading="preload"/>

       {Object.entries(windows).map(([key, state]) => {
        const Comp = windowsConfig[key]?.component;
        if (!Comp || !state.open) return null;
        return (
          <div 
            key={key}
            style={{ 
              width: "auto",
              height: "auto",
               display: state.minimized ? "none" : "block",
              zIndex: state.active ? 100 : 1
            }}
          >
            <Comp
              closeWindow={() => closeWindow(key)}
              minimizeWindow={() => minimizeWindow(key)}
            />
          </div>
        );
      })}


      {isMenuOpen && (
        <div ref={menuRef}>
          <Menu onLogout={onLogout} openWindow={openWindow}/>
        </div>
      )}

      <div className={styles.taskbar}>
        <img
          src="/startbutton.png"
          className={styles.startButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        
        <div className={styles.minimizationContainer}>
          {Object.entries(windows).map(([key, state]) =>
            state.open ?  (
             <div
              key={key}
              className={`${styles.miniTab} ${state.active ? styles.selected : ""}`}
              onClick={() => restoreWindow(key)}
            >
              <img src={`${windowsConfig[key].image}`} alt={key} className={styles.miniTabIcon}/>
              <p>{windowsConfig[key].title}</p>
            </div>
            ) : null
          )}
        </div>

        <div className={styles.rightBottom}>
        
          <p className={styles.timeText}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true})}
          </p>
          <img src='/Volume.png' className={styles.volumeIcon} alt="volume"/>
          <img
            src="/Full Screen.png"
            alt="full screen"
            className={styles.fullScreenIcon}
            onClick={handleFullscreen}
          />
        </div>
      </div>
    </div>
  );
}
