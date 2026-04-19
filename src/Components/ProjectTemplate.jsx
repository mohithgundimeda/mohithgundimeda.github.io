import React from "react";
import styles from '../assets/ProjectTemplate.module.css';

export default function ProjectTemplate({projects, id}){
    const project = projects.find(proj => proj.id === id);
    
    if(!project){
        return(
        <div>
            <p>Project not found</p>
        </div>
        )
    }

    return(
        <div className={styles.templateContainer}>

            <div className={styles.titleContainer}>
                <p>{project.title}</p>
            </div>

            <div className={styles.stackContainer}>
                <p className={styles.stackTitle} >Stack :</p>
                <p className={styles.stackItems}>{project.Stack.split(",").map(item => item.trim()).join(" , ")}</p>
            </div>

            <div className={styles.contextContainer}>
                <p className={styles.contextTitle} >Discription :</p>
                <p className={styles.contextItems}>{project.Description}</p>
            </div>
            
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.pathway}>
                <button className={styles.buttonStyle}>View Project</button>
            </a>    

        </div>
    )
}