import React, {useMemo} from "react";
import styles from "../assets/Menu.module.css";
import { useNavigate } from "react-router-dom";

export default function Menu({ onLogout, openWindow  }) {
    const navigate = useNavigate();

    const content = {'CV':['Address Book.png', ' View my CV and background'], 'Projects':['Briefcase.png', ' Explore my completed works'], 'Blog Posts':['Generic Text Document.png', 'Read my technical writings'], 'Diet Planning':['Graph View.png', 'Diet tracking'], 'Contact':['Email.png', 'My contact info'], 'Terminal':['Command Prompt.png', 'Run commands using terminal']};

    const right_content = {'Notepad':'Notepad.png', 'My Pictures':'My Pictures.png', 'Github':'github-mark-white.png', 'Medium':'Medium-Icon-Black.png'};



    const handleClick = (key) => {
        if (key === "Projects") {
        openWindow("projects");
        }
        else if(key === 'My Pictures') {
        openWindow("pictures");
        }
        else if(key === 'CV') {
        openWindow("CV");
        }
        else if(key === 'Diet Planning') {
        openWindow("Diet_Planning");
        }
        else if(key === 'Notepad') {
        openWindow("Notepad");
        }
        else if(key === 'Terminal') {
        openWindow("Terminal");
        }
        else if(key === 'Blog Posts'){
            openWindow("Blog_Posts");
        }
        else if(key === 'Contact'){
            openWindow("Contact");
        }
    };

    const menuItems = useMemo(() => {
        return Object.entries(content).map(([key, value]) => (
            <button key={key} className={styles.menusection} onClick={()=>{handleClick(key)}}>
                <img src={`/${value[0]}`} alt={key} className={styles.leftMenuIcons}/>
                <div>
                    <p className={styles.leftMenuEntry}>{key}</p>
                    <p className={styles.leftMenuDesc}>{value[1]}</p>
                </div>
            </button>
        ));
    }, []);

    const right_menuItems = useMemo(() => {
    return Object.entries(right_content).map(([key, value]) => (
        <button key={key} className={styles.rightMenusection} onClick={()=>{handleClick(key)}}>
            <div><img src={`/${value}`} alt={key} className={styles.leftMenuIcons}/></div>
            <div><p className={styles.rightMenuEntry}>{key}</p></div>
        </button>
    ));
    }, []);

  return (
    <div className={styles.startMenu}>
        <div className={styles.menuItem1}>
            <img src="/mohith.jpg" alt="Mohith" className={styles.profileImage} />
            <p className={styles.username}>Mohith</p>
        </div>
        <div className={styles.menuItem2}>

            <div className={styles.leftGrid}>
                {menuItems}
            </div>
            <div className={styles.rightGrid}>
                {right_menuItems}
            </div>
        </div>
        <div className={styles.menuItem3}>
            <div className={styles.logOffContainer} onClick={onLogout}>
                <img src="/logoff.png" alt="Log Off" className={styles.logOffIcon}/>
                <p className={styles.logOffText}>Log Off</p>
            </div>
            <div className={styles.shutdownContainer} 
                onClick={() => {
                    const shutdownSound = new Audio("/Windows XP Shutdown.wav");
                    shutdownSound.play();
                     setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 200); 
                    shutdownSound.onerror = () => navigate("/", { replace: true });
                }}>
                <img src="/shutdown.png" alt="Turn Off Computer" className={styles.shutdownIcon}/>
                <p className={styles.shutdownText}>Turn Off Computer</p>
            </div>
        </div>
    </div>
  );
}