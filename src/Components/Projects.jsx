import React, {useRef, useState, useEffect}from "react";
import styles from "../assets/Projects.module.css";
import data from "../assets/projects.json";
import ProjectTemplate from "./ProjectTemplate";
import {useIsMobile} from "./useIsMobile";



export default function Projects({closeWindow, minimizeWindow}) {
    const isMobile = useIsMobile();

    const DEFAULT_POSITION = isMobile ? { top: 0, left: 0 } : { top: 32, left: 380 };
    const DEFAULT_SIZE = isMobile 
    ? { width: window.innerWidth, height: window.innerHeight } 
    : { width: 640, height: 480 };


    const containerRef = useRef(null);
    const movingRef = useRef({ active: false, offsetX: 0, offsetY: 0 });

    const [size, setSize] = useState(DEFAULT_SIZE);
    const resizingRef = useRef({ active: false, dir: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

    const [maximized, setMaximized] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(false);
    const [projectInfo, setProjectInfo] = useState(null);

    const [position, setPosition] = useState(DEFAULT_POSITION);

    const MIN_WIDTH = 400;
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
            // optional: smooth transition off after resize
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
  ? { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", borderRadius: 0 }
  : {
      position: "absolute",
      width: `${size.width}px`,
      height: `${size.height}px`,
      minWidth: `${MIN_WIDTH}px`,
      minHeight: `${MIN_HEIGHT}px`,
      left: `${position.left}px`,
      top: `${position.top}px`,
    };


    const addressBarStyle= maximized ? {
        width:'100%',
        height:'1.5rem',
        fontSize:'0.8rem'
    } : {width:'99%'}

    const smallerIconReplica = maximized ? {
        width: '1rem',
        height: '1rem'
    } : {}

    const handleProjectClick = (id) => {
        setSelectedProjectId(true);
        setProjectInfo(<ProjectTemplate projects={data.projects} id={id} />);
    };

    const gridItems = data.projects.map((item, index) => (
        <div key={index} className={styles.gridItem} onClick={() => handleProjectClick(item.id)}>
            <img src='/Folder Opened.png' alt={item.title} className={styles.gridItemImage} />
            <p className={styles.gridItemTitle}>{item.title}</p>
        </div>
    ));

    const screenWidthEdit = {width : maximized ? '100%' : '99%'}


  return (
      <div className={styles.projectsContainer}  ref={containerRef} style={containerStyle}>

            <div className={styles.projectsHeader}  onMouseDown={startMove}>
                <div className={styles.frameIdentity}>
                    <img src="/Briefcase.png" alt="projects" className={styles.frameIcon} />
                    <p className={styles.frameText}>Projects</p>
                </div>
                <div className={styles.frameOptions}>
                    <img src="/Minimize.png" alt="minimize" className={styles.option} onClick={minimizeWindow}/>
                    <img src={maximized ? "/Restore.png" : "/Maximize.png"} alt="maximize" className={styles.option} onClick={() => setMaximized(!maximized)} />
                    <img src="/Exit.png" alt="exit" className={styles.option} onClick={() => {
                                                                                            closeWindow(); 
                                                                                            setPosition({ top: 32, left: 280 });
                                                                                            setSize(DEFAULT_SIZE);
                                                                                            }}/>
                </div>
            </div>

            <div className={styles.filesBar} style={screenWidthEdit}>
                <div className={styles.fileItems}>
                    <div className={styles.fileItem}><p>File</p></div>
                    <div className={styles.fileItem}><p>Edit</p></div>
                    <div className={styles.fileItem}><p>View</p></div>
                    <div className={styles.fileItem}><p>Tools</p></div>
                </div>
                <div className={styles.iconContainer}>
                    <img src="/pngwing1.png" alt="icon" className={styles.icon} />
                </div>
            </div>

            <div className={styles.locationBar} style={screenWidthEdit}>
                <div className={styles.locationControls1}>
                    <div className={styles.locationfeature} > <img src={selectedProjectId ? "/Back.png" : "/Back Grey.png"} alt="go back" style={{cursor:"url('/harrow.cur'),auto}"}} className={styles.backIcon} onClick={() =>{selectedProjectId && setSelectedProjectId(false)}}/> <p>Back</p> <p className={styles.smallarrow}/></div>
                    <div className={styles.locationfeature}> <img src="/Forward.png" alt="go forward" className={styles.icon}/> <p className={styles.smallarrow}/></div>
                    <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}> <img src="/Up.png" alt="go up" className={styles.icon}/></div>
                </div>
                <div className={styles.locationControls2}>
                    <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}> <img src="/Search.png" alt="search" className={styles.icon} /><p>Search</p></div>
                    <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}> <img src="/Folder Opened.png" alt="folder opened" className={styles.icon}/><p>Files</p></div>
                </div>
                <div className={styles.locationControls3}>
                    <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}> <img src="/Detail View.png" alt="detail view" className={styles.icon} /> <p className={styles.smallarrow}/></div>
                </div>
            </div>

            <div className={styles.addressBar} style={addressBarStyle}>
                <div className={styles.barName}><p>Address</p></div>
                <div className={styles.typeArea}><div className={styles.typeAreaLeft}><img src="/Detail View.png" alt="detail view" className={styles.smallericon} style={smallerIconReplica}/><p>Projects</p></div><div className={styles.typeAreaRight}><img src='/down.png' alt="down" className={styles.smallericon}/></div></div>
                <div className={styles.goArea}><img src="/Go.png" alt="go" className={styles.smallericon} style={smallerIconReplica}/><p>Go</p></div>
            </div>

            <div className={styles.contentContainer} style={screenWidthEdit}>
                {!isMobile && 
                <div className={styles.leftContainer}>
                   
                    <div className={styles.box}>
                        <div className={styles.heading}><p>System Tasks</p></div>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><img src='/explorer properties.png' alt='explorer' className={styles.leftContainerIcon}/><p>View system information</p></li>
                            <li className={styles.listItem}><img src='/Programs.png' alt='programs' className={styles.leftContainerIcon}/><p>Add or remove programs</p></li>
                            <li className={styles.listItem}><img src='/Control Panel.png' alt='control panel' className={styles.leftContainerIcon}/><p>Change a settings</p></li>
                        </ul>
                    </div>

                    <div className={styles.box}>
                        <div className={styles.heading}><p>Other</p></div>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><img src='/My Network Places.png' alt='network' className={styles.leftContainerIcon}/><p>My network places</p></li>
                            <li className={styles.listItem}><img src='/My Documents.png' alt='documents' className={styles.leftContainerIcon}/><p>My documents</p></li>
                            <li className={styles.listItem}><img src='/Folder Closed.png' alt='folder' className={styles.leftContainerIcon}/><p>Shared documents</p></li>
                            <li className={styles.listItem}><img src='/Control Panel.png' alt='control panel' className={styles.leftContainerIcon}/><p>Control panel</p></li>
                        </ul>
                    </div>

                    <div className={styles.box}>
                        <div className={styles.heading}><p>Details</p></div>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><img src='/github-mark-white.png' alt='github' className={styles.leftContainerIcon}/><p>My Github</p></li>
                        </ul>
                    </div>

                </div>
                }
                <div className={styles.rightContainer}>
                   {selectedProjectId ? 
                    projectInfo
                   : 
                    <div className={styles.projectsGrid}>
                        {gridItems}
                    </div>
                    }
                </div>
            </div>

            <div className={styles.footer}/>

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