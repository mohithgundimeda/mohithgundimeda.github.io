import React, { useState, useEffect, useRef } from "react";
import styles from "./assets/Desktop.module.css";
import Menu from "./Components/Menu";
import Projects from "./Components/Projects";
import MyPictures from "./Components/MyPictures";
import Cv from "./Components/Cv";
import DietPlanning from "./Components/DietPlanning";
import Notepad from "./Components/Notepad";
import Terminal from "./Components/Terminal";
import Blog from "./Components/Blog";
import Contact from "./Components/Contact";

const windowsConfig = {
  projects: {
    title: "Projects",
    component: Projects,
    image: '/Briefcase.png',
  },
  pictures:{
    title: "My Pictures",
    component: MyPictures,
    image:'/My Pictures.png'
  },
  CV:{
    title: "CV",
    component: Cv,
    image:'/Address Book.png'
  },
  Diet_Planning:{
    title:"Diet Planning",
    component: DietPlanning,
    image:'/Graph View.png'
  },
  Notepad:{
    title:'Notepad',
    component:Notepad,
    image:'/Notepad.png',
  },
  Terminal:{
    title:'Terminal',
    component:Terminal,
    image:'/Command Prompt.png'
  },
  Blog_Posts:{
    title:'Blog Posts',
    component: Blog,
    image: '/Generic Text Document.png',
  },
  Contact:{
    title:'Contact',
    component: Contact,
    image: '/Email.png',
  }
};


export default function Desktop({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windows, setWindows] = useState({});
  const [time, setTime] = useState(new Date());
  const menuRef = useRef(null);
  const [zIndexCounter, setZIndexCounter] = useState(1);

   useEffect(() => {
    const initialState = {};
    Object.keys(windowsConfig).forEach((key) => {
      initialState[key] = { open: false, minimized: false, active: false, showInTaskbar: false };
    });
    setWindows(initialState);
}, []);


  useEffect(() => {
    const imagesToPreload = [
      "/bliss200.jpg",
      "/Address Book.png",
      "/Briefcase.png",
      "/My Pictures.png",
      "/github-mark-white.png",
      "/Medium-Icon-Black.png",
      "/Notepad.png",
      "/startbutton.png",
      "/Volume.png",
      "/Full Screen.png",
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);


  useEffect(() => {

      
      if (sessionStorage.getItem("playStartupSound") === "true") {
        const startSound = new Audio("/Windows XP Startup.wav");
        startSound.play();
        sessionStorage.removeItem("playStartupSound");
      }
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
    updated[key] = {
      ...prev[key],
      open: true,
      minimized: false,
      active: true,
      showInTaskbar: prev[key]?.showInTaskbar || false,
      zIndex: zIndexCounter + 1,
    };
    return updated;
  });
  setZIndexCounter((c) => c + 1);
  setIsMenuOpen(false);
};



  const minimizeWindow = (key) => {
  setWindows((prev) => ({
    ...prev,
    [key]: { ...prev[key], minimized: true, active: false, showInTaskbar: true }
  }));
};



const restoreWindow = (key) => {
  setWindows((prev) => {
    const updated = {};
    for (const k in prev) {
      updated[k] = { ...prev[k], active: k === key };
    }
    updated[key] = {
      ...prev[key],
      open: true,
      minimized: false,
      active: true,
      showInTaskbar: true,
      zIndex: zIndexCounter + 1,
    };
    return updated;
  });
  setZIndexCounter((c) => c + 1);
};


  const closeWindow = (key) => {
  setWindows((prev) => ({
    ...prev,
    [key]: { ...prev[key], open: false, minimized: false, active: false, showInTaskbar: false }
  }));
};

const focusWindow = (key) => {
  setWindows((prev) => {
    const updated = {};
    for (const k in prev) {
      updated[k] = {
        ...prev[k],
        active: k === key,
      };
    }
    updated[key] = {
      ...updated[key],
      zIndex: zIndexCounter + 1,
    };
    return updated;
  });
  setZIndexCounter((c) => c + 1);
};

  return (
    <div className={styles.container}>
      <img src="/bliss200.jpg" alt="Bliss" className={styles.desktopImage} loading="preload"/>

      <div className={styles.shortcuts}>

      <div onDoubleClick={()=>openWindow('CV')}>
        <img src='/Address Book.png' alt="cv"/>
        <p>CV</p>
      </div>

      <div onDoubleClick={()=>openWindow('projects')}>
        <img src='/Briefcase.png' alt="projects"/>
        <p>Projects</p>
      </div>

      <div onDoubleClick={()=>openWindow('pictures')}>
        <img src='/My Pictures.png' alt="pictures"/>
        <p>My Pictures</p>
      </div>

      <div>
        <a href="https://github.com/mohithgundimeda?tab=repositories" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none', color:'white',  cursor: "url('/harrow.cur') 8 8, auto"}}>
          <img src="/github-mark-white.png" alt="github"/>
          <p>Github</p>
        </a>
      </div>

      <div>
        <a href="https://mohith-g.medium.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none', color:'white', cursor: "url('/harrow.cur') 8 8, auto"}}>
          <img src="/Medium-Icon-Black.png" alt="medium"/>
          <p>Medium</p>
        </a>
      </div>

      <div onDoubleClick={()=>{openWindow('Notepad')}}>
        <img src="Notepad.png" alt="notpad"/>
        <p>Notepad</p>
      </div>

      </div>

     {Object.entries(windows).map(([key, state]) => {
        const Comp = windowsConfig[key]?.component;
        if (!Comp || !state.open) return null;
        return (
          <Comp
            key={key}
            closeWindow={() => closeWindow(key)}
            minimizeWindow={() => minimizeWindow(key)}
            zIndex={state.zIndex || 1}
            onFocus={() => focusWindow(key)}
            minimized={state.minimized}
            openWindow={openWindow}
          />
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
            state.open && state.showInTaskbar ? (
              <div
                key={key}
                className={`${styles.miniTab} ${state.active ? styles.selected : ""}`}
                onClick={() => {
                    if (state.minimized) {
                      restoreWindow(key); 
                    } else {
                      focusWindow(key);
                    }
                  }}
                  onMouseDown={() => {
                    if (state.minimized) {
                      restoreWindow(key); 
                    } else {
                      focusWindow(key);
                    }
                  }}
              >
                <img src={windowsConfig[key].image} alt={key} className={styles.miniTabIcon}/>
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
