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

    const objList = project.objective.map((item, index)=>(
        <li key={index} className={styles.objectiveItem}>{item}</li>
    ))
    
    const takeAwayList = project.takeAway.map((item, index)=>(
        <li key={index} className={styles.takeAwayItem}>{item}</li>
))

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
                <p className={styles.contextTitle} >Context :</p>
                <p className={styles.contextItems}>{project.context}</p>
            </div>

            <div className={styles.objectiveContainer}>
                <p className={styles.objectiveTitle} >Objectives :</p>
                <div className={styles.objUl}>
                    {objList}
                </div>
            </div>

            <div className={styles.takeAwayContainer}>
                <p className={styles.takeAwayTitle}>Take Aways :</p>
                <div className={styles.takeAwadiv}>
                    {takeAwayList}
                </div>
            </div>
            
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.pathway}>
                <button className={styles.buttonStyle}>View Project</button>
            </a>    

        </div>
    )
}