import React, { useRef, useState, useEffect } from "react";
import styles from "../assets/Projects.module.css";
import { useIsMobile } from "./useIsMobile";

export default function Terminal({ closeWindow, minimizeWindow, zIndex, onFocus, minimized, openWindow}) {
  const isMobile = useIsMobile();

  const DEFAULT_POSITION = isMobile ? { top: 0, left: 0 } : { top: 50, left: 800 };
  const DEFAULT_SIZE = isMobile
    ? { width: window.innerWidth, height: window.innerHeight }
    : { width: 500, height:400 };

  const containerRef = useRef(null);
  const movingRef = useRef({ active: false, offsetX: 0, offsetY: 0 });
  const resizingRef = useRef({ active: false, dir: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  const [size, setSize] = useState(DEFAULT_SIZE);
  const [maximized, setMaximized] = useState(false);
  const [position, setPosition] = useState(DEFAULT_POSITION);

  const MIN_WIDTH = 500;
  const MIN_HEIGHT = 400;

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSize((s) => ({
        ...s,
        width: Math.max(rect.width, MIN_WIDTH),
        height: Math.max(rect.height, MIN_HEIGHT),
      }));
    }
  }, []);

  useEffect(() => {
    function onMouseMove(e) {
      if (!resizingRef.current.active) return;
      const { dir, startX, startY, startWidth, startHeight } = resizingRef.current;

      if (dir === "right") {
        const dx = e.clientX - startX;
        const newW = Math.max(MIN_WIDTH, startWidth + dx);
        setSize((s) => ({ ...s, width: newW }));
      } else if (dir === "left") {
        const dx = startX - e.clientX;
        const newW = Math.max(MIN_WIDTH, startWidth + dx);
        setSize((s) => ({ ...s, width: newW }));
      } else if (dir === "bottom") {
        const dy = e.clientY - startY;
        const newH = Math.max(MIN_HEIGHT, startHeight + dy);
        setSize((s) => ({ ...s, height: newH }));
      }
    }

    function onMouseUp() {
      resizingRef.current.active = false;
      resizingRef.current.dir = null;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    if (resizingRef.current.active) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (isMobile) {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        setPosition({ top: 0, left: 0 });
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  function startResize(e, dir) {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    resizingRef.current = {
      active: true,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
    };

    const onMouseMove = (ev) => {
      if (!resizingRef.current.active) return;
      const { dir, startX, startY, startWidth, startHeight } = resizingRef.current;
      if (dir === "right") {
        const dx = ev.clientX - startX;
        setSize((s) => ({ ...s, width: Math.max(MIN_WIDTH, startWidth + dx) }));
      } else if (dir === "left") {
        const dx = startX - ev.clientX;
        setSize((s) => ({ ...s, width: Math.max(MIN_WIDTH, startWidth + dx) }));
      } else if (dir === "bottom") {
        const dy = ev.clientY - startY;
        setSize((s) => ({ ...s, height: Math.max(MIN_HEIGHT, startHeight + dy) }));
      }
    };

    const onMouseUp = () => {
      resizingRef.current.active = false;
      resizingRef.current.dir = null;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function clampPosition(newLeft, newTop, width, height) {
    const maxLeft = window.innerWidth - width;
    const maxTop = window.innerHeight - height;
    return {
      left: Math.max(0, Math.min(newLeft, maxLeft)),
      top: Math.max(0, Math.min(newTop, maxTop)),
    };
  }

  function startMove(e) {
    if (e.target.closest(`.${styles.frameOptions}`)) return;

    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    movingRef.current = {
      active: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    const onMouseMove = (ev) => {
      if (!movingRef.current.active) return;
      const newLeft = ev.clientX - movingRef.current.offsetX;
      const newTop = ev.clientY - movingRef.current.offsetY;
      const clamped = clampPosition(newLeft, newTop, size.width, size.height);
      setPosition(clamped);
      containerRef.current.style.left = `${newLeft}px`;
      containerRef.current.style.top = `${newTop}px`;
    };

    const onMouseUp = () => {
      movingRef.current.active = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  const containerStyle = isMobile
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0,
      }
    : maximized
    ? { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", borderRadius: 0, zIndex:200 }
    : {
        position: "absolute",
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: `${MIN_WIDTH}px`,
        minHeight: `${MIN_HEIGHT}px`,
        left: `${position.left}px`,
        top: `${position.top}px`,
        zIndex,
      };

    const screenWidthEdit = maximized ? { width: '100%' } : { width: '99%' };


    function generateDirOutput(folders) {

      const now = new Date();
      const date = now.toLocaleDateString("en-GB").replace(/\//g, "/");
      const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      const header = `
    Volume in drive C has no label.
    Volume Serial Number is XXXX-XXXX

    Directory of C:\\
    `;

      const entries = folders
        .map(
          (f) =>
            `${date}  ${time}    <DIR>          ${f}`
        )
        .join("\n");

      return header + "\n" + entries;
    }

    const folders = ["Projects", "CV", "My Pictures", "Blog Posts", "Diet Planing", "Contact", "Notepad", "Terminal"];
    const windowNames = {'Projects':'projects', 'My Pictures':'pictures', 'CV':'CV', 'Diet Planing':'Diet_Planning', 'Notepad':'Notepad', 'Terminal':'Terminal', 'Blog Posts':'Blog_Posts', 'Contact':'Contact'};

    const commands = {
      dir: generateDirOutput(folders),
      help: "help\nAvailable commands: dir, help, clear, about",
      cls: "",
      about: "about\nMohith Gundimeda, AI & Bodybuilding Enthusiast\nGitHub: github.com/mohithgundimeda",
    };

    const handleCommand = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedCommand = command.trim();
      if (trimmedCommand === "cls") {
        setHistory([]);
      }
      else if (trimmedCommand.startsWith("cd")) {
        const parts = trimmedCommand.split(" ");
        const folderName = parts.slice(1).join(" ");
        if (windowNames[folderName]) {
          const windowKey = windowNames[folderName];
          openWindow(windowKey);
          const output = `Opened ${folderName}`;
          setHistory([...history, { input: `c: /> ${command}`, output }]);
        } else {
          const output = `Command not found: ${trimmedCommand}`;
          setHistory([...history, { input: `c: /> ${command}`, output }]);
        }
      }
      else {
        const output = commands[trimmedCommand] || `Command not found: ${trimmedCommand}`;
        setHistory([...history, { input: `c: /> ${command}`, output }]);
      }
      setCommand("");
      inputRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={styles.projectsContainer}
      ref={containerRef}
      style={{ ...containerStyle, display: minimized ? "none" : "block" }}
      onMouseDown={onFocus}
    >
      <div className={styles.projectsHeader} onMouseDown={startMove}>
        <div className={styles.frameIdentity}>
          <img src="/Command Prompt.png" alt="Terminal" className={styles.frameIcon} />
          <p className={styles.frameText}>Terminal</p>
        </div>
        <div className={styles.frameOptions}>
          <img src="/Minimize.png" alt="minimize" className={styles.option} onClick={minimizeWindow} />
          <img
            src={maximized ? "/Restore.png" : "/Maximize.png"}
            alt="maximize"
            className={styles.option}
            onClick={() => setMaximized(!maximized)}
          />
          <img
            src="/Exit.png"
            alt="exit"
            className={styles.option}
            onClick={() => {
              closeWindow();
              setPosition(DEFAULT_POSITION);
              setSize(DEFAULT_SIZE);
            }}
          />
        </div>
      </div>

      <div className={styles.comandContainer} style={screenWidthEdit}>
        {history.map((entry, index) => (
          <div key={index}>
            <p style={{ margin: "0.5rem" }}>{entry.input}</p>
            {entry.output && (
              <p style={{ margin: "0.5rem", whiteSpace: "pre-line" }}>{entry.output}</p>
            )}
          </div>
        ))}
       <div
       style={{
        display:'flex',
        gap:'0.5rem',
        margin:'0.5rem'
       }}
       >
        <p style={{ color:'white' }}>c: /&gt;</p>
        <input type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleCommand}
        style={{
        background: "black",
        border: "none",
        outline: "none",
        color: "white",
        width: "calc(100% - 3rem)",
      }}
      autoFocus
        />
       </div>
      </div>

      <div
        className={styles.resizerLeft}
        onMouseDown={(e) => startResize(e, "left")}
        role="presentation"
      />
      <div
        className={styles.resizerRight}
        onMouseDown={(e) => startResize(e, "right")}
        role="presentation"
      />
      <div
        className={styles.resizerBottom}
        onMouseDown={(e) => startResize(e, "bottom")}
        role="presentation"
      />
    </div>
  );
}