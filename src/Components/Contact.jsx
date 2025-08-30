import React, {useRef, useState, useEffect}from "react";
import styles from "../assets/Projects.module.css";
import {useIsMobile} from "./useIsMobile";



export default function Contact({closeWindow, minimizeWindow,zIndex, onFocus, minimized}) {
    const isMobile = useIsMobile();

    const DEFAULT_POSITION = isMobile ? { top: 0, left: 0 } : { top: 60, left: 500 };
    const DEFAULT_SIZE = isMobile 
    ? { width: window.innerWidth, height: window.innerHeight } 
    : { width: 740, height: 580 };


    const containerRef = useRef(null);
    const movingRef = useRef({ active: false, offsetX: 0, offsetY: 0 });

    const [size, setSize] = useState(DEFAULT_SIZE);
    const resizingRef = useRef({ active: false, dir: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

    const [maximized, setMaximized] = useState(false);

    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [from, setFrom] = useState('');
    const [subject, setSubject] = useState('');

    const MIN_WIDTH = 660;
    const MIN_HEIGHT = 420;

    useEffect(() => {
        if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize(s => ({ ...s, width: Math.max(rect.width, MIN_WIDTH), height: Math.max(rect.height, MIN_HEIGHT) }));
        }
    }, []);

    useEffect(() => {
        function onMouseMove(e) {
        if (!resizingRef.current.active) return;
        const { dir, startX, startY, startWidth, startHeight } = resizingRef.current;

        if (dir === "right") {
            const dx = e.clientX - startX;
            const newW = Math.max(MIN_WIDTH, startWidth + dx);
            setSize(s => ({ ...s, width: newW }));
        } else if (dir === "left") {
            const dx = startX - e.clientX;
            const newW = Math.max(MIN_WIDTH, startWidth + dx);
            setSize(s => ({ ...s, width: newW }));
        } else if (dir === "bottom") {
            const dy = e.clientY - startY;
            const newH = Math.max(MIN_HEIGHT, startHeight + dy);
            setSize(s => ({ ...s, height: newH }));
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
        startHeight: rect.height
        };
        const onMouseMove = (ev) => {
        if (!resizingRef.current.active) return;
        const { dir, startX, startY, startWidth, startHeight } = resizingRef.current;
        if (dir === "right") {
            const dx = ev.clientX - startX;
            setSize(s => ({ ...s, width: Math.max(MIN_WIDTH, startWidth + dx) }));
        } else if (dir === "left") {
            const dx = startX - ev.clientX;
            setSize(s => ({ ...s, width: Math.max(MIN_WIDTH, startWidth + dx) }));
        } else if (dir === "bottom") {
            const dy = ev.clientY - startY;
            setSize(s => ({ ...s, height: Math.max(MIN_HEIGHT, startHeight + dy) }));
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
            offsetY: e.clientY - rect.top
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
  ? { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", borderRadius: 0, zIndex:200}
  : {
      position: "absolute",
      width: `${size.width}px`,
      height: `${size.height}px`,
      minWidth: `${MIN_WIDTH}px`,
      minHeight: `${MIN_HEIGHT}px`,
      left: `${position.left}px`,
      top: `${position.top}px`,
      zIndex
    };



    const screenWidthEdit = {width : maximized ? '100%' : '99%'}


  return (
      <div className={styles.projectsContainer}  ref={containerRef} style={{...containerStyle, display: minimized ? "none" : "block" }} onMouseDown={onFocus}>

            <div className={styles.projectsHeader}  onMouseDown={startMove}>
                <div className={styles.frameIdentity}>
                    <img src="/Email.png" alt="contat" className={styles.frameIcon} />
                    <p className={styles.frameText}>Contact</p>
                </div>
                <div className={styles.frameOptions}>
                    <img src="/Minimize.png" alt="minimize" className={styles.option} onClick={minimizeWindow}/>
                    <img src={maximized ? "/Restore.png" : "/Maximize.png"} alt="maximize" className={styles.option} onClick={() => setMaximized(!maximized)} />
                    <img src="/Exit.png" alt="exit" className={styles.option} onClick={() => {
                                                                                            closeWindow(); 
                                                                                            setPosition(DEFAULT_POSITION);
                                                                                            setSize(DEFAULT_SIZE);
                                                                                            }}/>
                </div>
            </div>

            <div className={styles.filesBar} style={screenWidthEdit}>
                <div className={styles.fileItems}>
                    <div className={styles.fileItem}><p>File</p></div>
                    <div className={styles.fileItem}><p>Edit</p></div>
                    <div className={styles.fileItem}><p>View</p></div>
                    <div className={styles.fileItem}><p>Insert</p></div>
                    <div className={styles.fileItem}><p>Format</p></div>
                    <div className={styles.fileItem}><p>Tools</p></div>
                    <div className={styles.fileItem}><p>Message</p></div>
                    <div className={styles.fileItem}><p>Help</p></div>
                </div>
                <div className={styles.iconContainer}>
                    <img src="/pngwing1.png" alt="icon" className={styles.icon} />
                </div>
            </div>

            <div className={styles.contactLocationBar} style={screenWidthEdit}>
                <div className={styles.contactLocationControls1}>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/OE Send.png" alt="send" className={styles.contactIcon}/> <p>Send</p></div>
                </div>
                <div className={styles.contactLocationControls2}>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/Cut.png" alt="cut" className={styles.contactIcon}/><p>Cut</p></div>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/Copy.png" alt="copy" className={styles.contactIcon}/><p>Copy</p></div>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/Paste.png" alt="paste" className={styles.contactIcon} /><p>Paste</p></div>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/Undo.png" alt="undo" className={styles.contactIcon}/><p>Undo</p></div>
                </div>
                <div className={styles.contactLocationControls3}>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/check-icon.webp" alt="check" className={styles.contactIcon}/><p>Check</p></div>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/spelling-icon.webp" alt="spelling" className={styles.contactIcon} /><p>Spelling</p></div>
                </div>
                <div className={styles.contactLocationControls3}>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/OE Attatch.png" alt="attach" className={styles.contactIcon}/><p>Attach</p></div>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/priority-icon.webp" alt="spelling" className={styles.contactIcon} /><p>Priority</p></div>
                </div>
                <div className={styles.contactLocationControls3}>
                    <div className={`${styles.contactLocationfeature} ${styles.locationfeatureHover}`}> <img src="/OE Sign.png" alt="sign" className={styles.contactIcon}/><p>Sign</p></div>
                </div>
            </div>

          <div className={styles.contactAddressBar} style={screenWidthEdit}>
                
                <div className={styles.labelCell}>
                    <img src="/mailto-icon.webp" alt="book" className={styles.bookIcon}/>
                    <p>To:</p>
                </div>
                <div className={styles.inputCell}>
                    <input 
                    type="text"
                    value="mohithgundemeda@gmail.com"
                    style={{pointerEvents:'none'}}
                    />
                </div>

                
                <div className={styles.labelCell}>
                    <img src="/mailto-icon.webp" alt="book" className={styles.bookIcon}/>
                    <p>From:</p>
                </div>
                <div className={styles.inputCell}>
                    <input 
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    />
                </div>

                
                <div className={styles.labelCell}>
                    <p>Subject:</p>
                </div>
                <div className={styles.inputCell}>
                    <input 
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
            </div>


            <div className={styles.contactContentContainer} style={screenWidthEdit}>
                 <textarea 
                        className={styles.messageBox}
                        placeholder="Message here..."
                    />
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