import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './assets/BootSettingScreen.module.css';
import gsap from "gsap";

export default function BootSettingScreen() {

  const navigate = useNavigate();

  const squares = Array.from({ length: 13 }, (_, index) => (
        <div key={index} className={styles.square}></div>
    ));

    useEffect(() => {
      const tl = gsap.timeline();

      tl.to("#boot-screen", {
        delay: 4,
        opacity: 0,
        duration: 0
      });

      const timer = setTimeout(() => {
      navigate("/welcome");
    }, 6000);

      return () => {
        tl.kill();
        clearTimeout(timer);
      };
    }, [navigate]);

  return (
    <div className={styles.container}>
      <div id='boot-screen'>
        <img src="/starter.png" alt="LOGO PNG" className={styles.bgImage}/>
        <div className={styles.loadingBar}>{squares}</div>
        <p className={styles.inspiration}>Inspired by Windows XP</p>
         <p className={styles.copyright}>Portfolio Build Beta</p>
      </div>
    </div>
  );
}

