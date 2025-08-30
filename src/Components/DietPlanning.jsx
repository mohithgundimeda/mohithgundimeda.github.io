import React, { useRef, useState, useEffect } from "react";
import styles from "../assets/Projects.module.css";
import { useIsMobile } from "./useIsMobile";

export default function DietPlanning({ closeWindow, minimizeWindow, zIndex, onFocus, minimized }) {
  const isMobile = useIsMobile();

  const DEFAULT_POSITION = isMobile ? { top: 0, left: 0 } : { top: 50, left: 800 };
  const DEFAULT_SIZE = isMobile
    ? { width: window.innerWidth, height: window.innerHeight }
    : { width: 600, height: 450 };

  const containerRef = useRef(null);
  const movingRef = useRef({ active: false, offsetX: 0, offsetY: 0 });
  const resizingRef = useRef({ active: false, dir: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

  const [size, setSize] = useState(DEFAULT_SIZE);
  const [maximized, setMaximized] = useState(false);
  const [position, setPosition] = useState(DEFAULT_POSITION);

  const MIN_WIDTH = 400;
  const MIN_HEIGHT = 420;

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

    const graphsSize = maximized ? '50%' : '50%';

  return (
    <div
      className={styles.projectsContainer}
      ref={containerRef}
      style={{ ...containerStyle, display: minimized ? "none" : "block" }}
      onMouseDown={onFocus}
    >
      <div className={styles.projectsHeader} onMouseDown={startMove}>
        <div className={styles.frameIdentity}>
          <img src="/Graph View.png" alt="Diet Planning" className={styles.frameIcon} />
          <p className={styles.frameText}>Diet Planning</p>
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
          <div className={styles.locationfeature}>
            <img src="/Back Grey.png" alt="go back" className={styles.backIcon} />
            <p>Back</p>
            <p className={styles.smallarrow} />
          </div>
          <div className={styles.locationfeature}>
            <img src="/Forward.png" alt="go forward" className={styles.icon} />
            <p className={styles.smallarrow} />
          </div>
          <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}>
            <img src="/Up.png" alt="go up" className={styles.icon} />
          </div>
        </div>
        <div className={styles.locationControls2}>
          <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}>
            <img src="/Search.png" alt="search" className={styles.icon} />
            <p>Search</p>
          </div>
          <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}>
            <img src="/Folder Opened.png" alt="folder opened" className={styles.icon} />
            <p>Files</p>
          </div>
        </div>
        <div className={styles.locationControls3}>
          <div className={`${styles.locationfeature} ${styles.locationfeatureHover}`}>
            <img src="/Detail View.png" alt="detail view" className={styles.icon} />
            <p className={styles.smallarrow} />
          </div>
        </div>
      </div>

      <div className={styles.addressBar} style={screenWidthEdit}>
        <div className={styles.barName}><p>Address</p></div>
        <div className={styles.typeArea}>
          <div className={styles.typeAreaLeft}>
            <img src="/Detail View.png" alt="detail view" className={styles.smallericon} />
            <p>Diet Planning</p>
          </div>
          <div className={styles.typeAreaRight}>
            <img src="/down.png" alt="down" className={styles.smallericon} />
          </div>
        </div>
        <div className={styles.goArea}>
          <img src="/Go.png" alt="go" className={styles.smallericon} />
          <p>Go</p>
        </div>
      </div>

      <div className={styles.DietContentContainer} style={screenWidthEdit}>
        <p style={{fontWeight:'bold', fontSize:'1rem', display:'flex', justifyContent:'center'}}>Notes</p>
        <div style={{display:'flex', flexDirection:'column', paddingLeft:'0.5rem', gap:'1rem', textAlign:'left'}}>
            <li className={styles.point}>Calorie is a scale to measure the energy. I consume energy by eating food, which can be measured in calories.</li>
            <li className={styles.point}>I can use TDEE calculator for my calorie need for the day, keeping in mind that i workout 6 times a week.</li>
            <li className={styles.point}>Calories manily come from macros: Protien, Carbs, Fat</li>
            <li className={styles.point}>1 gram of protien packs 4 calories.</li>
            <li className={styles.point}>Every protein is a long chain of amino-acids linked together. When i consume food with protein the body uses the stomach acid called pepsin to break the bond, this pepsin will continue to break down the protein into short chains called peptides. These peptides are broken down to it's individual building blocks, that is <span style={{fontWeight:'bold'}}>amino acids</span>.</li>
            <li className={styles.point}>Amino acids are absorbed by small intestine and send it into blood stream, then to cells in the muscle tissue, these muscle cells take amino acids and use them to create new protein that will help grow and repair the muscle(priority).</li>
            <li className={styles.point}>In my rookie bodybuilding phase i used to think carbs are cheap and used for energy, which is not wrong. But later i realised the best way i can use carbs for my body is to maintain the insluine spike through out the entire day.</li>
            <li className={styles.point}>Insulin plays a very important role, driving nutrients into muscles for growth and recovery while preventing breakdown.</li>
            <li className={styles.point}>Carbs are divided into monosaccharides(single sugar unit), disaccharides(two linked sugar units), polysaccharides(long chain of multiple sugar units).</li>
            <li className={styles.point}>Monosaccharides are again divided into glucose, fructose, galactose</li>
            <li className={styles.point}>Disaccharides are maltose, lactose, sucrose. Combination of glucose and fructose gives sucrose, combination of glucose and galactose gives lactose, combination of glucose and glucose gives maltose.</li>
            <li className={styles.point}>Maltose usually found in plant starch products, bread, cereal, pasta, beer. Lactose found in mammal's milk and products that made out of it. Sucrose is sweeter, it's a natural sugar derived mainly from plants.</li>
            <li className={styles.point}>Polysaccharides serve as an energy storage, they are usually found in grains, vegetables, legumes.</li>
            <li className={styles.point}>Whatever the kind of carbs i eat, they end up being monosaccharides before small intestine absorption.</li>
            <li className={styles.point}>Anabolic is the process of converting amino acids to protien, glucose to glysogen for storage. I need this.</li>
            <li className={styles.point}>When insulin spikes, it drives glucose and amino acids into muscle cells, boosting protein synthesis and glycogen storage while blocking muscle breakdown.</li>
            <li className={styles.point}>So insulin spike creates an anabolic state.</li>
            <li className={styles.point}>Carbs give a good insulin spike because they’re quickly broken down into glucose, which triggers a rapid insulin release to shuttle nutrients into muscles.</li>
            <li className={styles.point}>Compared to proteins or fats, carbs(especially simple or high-glycemic ones) cause a faster, stronger insulin response, ideal for post-workout recovery and muscle growth.</li>
            <li className={styles.point}>Just like protien, for 1 gram of carbs 4 calories are packed. Eating carbs is so important that it won't let the body to break the muscle tissue for energy.</li>
            <li className={styles.point}>Note when my insulin’s constantly spiking high and my cells start ignoring it's signal to grab glucose from my blood, it can lead to insulin resistance and maybe even type 2 diabetes. I'm shit scared of diabetes, so i should watchout for what kind of carbs I'm consuming and the time of consumption.</li>
            <li className={styles.point}>When it comes to carbs i should design my diet so that the insulin is uniform throughout the day, not skewed(only after workout).</li>
            <li className={styles.point}>I need to eat more carbs that are slow digesting, they release glucose slowly into the blood stream, result in smoother insulin.</li>
            <li className={styles.point}>Slow carbs : oats, sweet potatoes, legumes, whole fruits, bread, pasta.</li>
            <li className={styles.point}>After workout where im all out of energy, the glucose from post-workout meal's carbs hits my blood, insulin kicks in, shoving it into muscles to rebuild glycogen. Liver stocks up too. Brain and nerves grab glucose constantly. Extra glucose might turn to fat. The carb item's I select for post-workout meal should be fast digesting, so all this can happen as soon as possible. Items like white rice, bananas, some breakfast cereals, glucose water if I'm eager</li>
            <li className={styles.point}>Fats are another macro, packing 9 calories per gram—more than double the 4 calories per gram from carbs or protein. They’re a dense energy source, and I need them for hormone production like testosterone, huge for muscle growth.</li>
            <li className={styles.point}>Fats don’t spike insulin like carbs, but they slow digestion, helping me feel full and keeping energy steady. I should aim for healthy fats like avocados, nuts, olive oil, and fatty fish, while keeping saturated fats from butter or red meat in check to avoid health risks.</li>
            <li className={styles.point}>Fats slow down the digestion of other nutrients. Pair high fat meals with high protien.</li>
            <li className={styles.point}>Design a meal so that the nutrient absorption spans your entire inter-meal interval</li>
            <li className={styles.point}>No fat at post-workout, since it slows down the digestion.</li>
            <li className={styles.point}>1/4 of daily protien should be taken per meal. If I'm doing 4 meals per day, each meal should have 25% of protien</li>
            <li className={styles.point}>Minimun of 1g/lb protien is recommended for bulk.</li>
            <li className={styles.point}>1.2g/lb protien to prevent muscle loss in cut.</li>
            <li className={styles.point}>High distance between meal timing without no increase in former meal's protein may result in muscle breakdown as protien will break and rebuild even while resting.</li>
            <li className={styles.point}>Body needs steady protien intake accross the window.</li>
            <li className={styles.point}>Minimum of 3-5g/lb of carbs is needed.</li>
            <li className={styles.point}>Atleast 2 hours gap between pre-workout meal and workout session is needed, else there is no meaning for consuming pre-workout</li>
            <li className={styles.point}>Prefer carb items with low glycemic index throught out the day and prefer high glycemic index items after workout</li>
            <li className={styles.point}>Prefer monounsaturated fats for diet.</li>
            <li className={styles.point}>10% of gain in weight is recommended for a single bluk phase</li>
            <li className={styles.point}>0.25% to 0.5% weight gain per week</li>
            <li className={styles.point}>To much gain than this will lead to more fat than wanted in the body.</li>
            <li className={styles.point}>I should do maintenance after an entire bulk session, going to cut is not a good idea.</li>
            <li className={styles.point}>Initial diet plan, will be tweaking every 2 weeks until desired results,</li>
            <img style={{width: graphsSize, height: graphsSize, objectFit:'contain'}} src="/daily_shedule.png" alt="day plan"/>
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