import React, { useEffect } from "react";
import styles from './assets/WelcomePage.module.css';
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {

  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to("#starterBlackId", {
      autoAlpha: 0,
      duration: 0.5,
      delay: 2,
    }).fromTo(["#colsId", "#infoTextId"],
      {autoAlpha: 0, duration: 0.5},
      {autoAlpha: 1, duration: 0.5});

    return () => {
        tl.kill();
      };

  }, []);

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeBox}>
        <img
          id="starterBlackId"
          src="/starter_black.png"
          alt="Windows XP Logo"
          className={styles.starterImage}
        />

        <div className={styles.cols} id="colsId">
        <div className={styles.col1}>
          <img
            src="/starter.png"
            alt="Windows XP Logo"
            className={styles.starterWhiteImage}
          />
          <p className={styles.starterText}>To begin, click on the profile</p>
        </div>
        <div className={styles.col2}>
          <div className={styles.box} onClick={() => { localStorage.setItem('loggedIn', 'true');  navigate('/desktop'); }}>
            <img
              src="/mohith.jpg"
              alt="user"
              className={styles.mohith}
            />
            <p className={styles.mohithText}>Mohith</p>
          </div>
        </div>
      </div>

      </div>
      <p className={styles.infoText} id="infoTextId">
        All portfolio resources are available on the desktop.
      </p>
    </div>
  );
}
