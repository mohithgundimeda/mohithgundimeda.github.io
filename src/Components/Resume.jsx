import React from "react";

const Resume = () => {
  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        fontSize: "12px",
        color: "#000",
        padding: "20px",
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* HEADER */}
      <h2 style={{ textAlign: "center", margin: 0, color: "#000080" }}>
        Mohith Gundimeda
      </h2>
      <p style={{ textAlign: "center", margin: 0 }}>
        9121681169 | mohithgundemeda@gmail.com |{" "}
        <a href="https://github.com/mohithgundimeda" target="_blank">GitHub</a>
      </p>

      {/* EXPERIENCE */}
      <Section title="Experience">
        <Item
          title="LLM-based Draft Automation System"
          subtitle="Freelance Engineer | 2025 – present"
          link="https://github.com/mohithgundimeda/Training-Draft-Public"
        >
          <li>Built a system for a real-world government workflow to convert Telugu input into structured documents (XML → DOCX)</li>
          <li>Fine-tuned Qwen 2.5 (7B) using LoRA to handle strict formatting and reduce hallucinations (≈0.03 error rate)</li>
          <li>Designed a multi-step pipeline (classification → form → generation)</li>
          <li>Worked under constraints like reliability and data sensitivity</li>
        </Item>

        <Item
          title="Shivira Travels"
          subtitle="Freelance Engineer | 2025 – present"
          link="https://shiviratravels.com"
        >
          <li>Built a website that helped a travel business move their operations online</li>
          <li>Set up domain, hosting, and business email</li>
          <li>Ensured the system is usable and reliable for daily operations</li>
          <li>Ongoing maintenance and updates</li>
        </Item>

        <Item
          title="Slash Mark"
          subtitle="AI Intern | Jan 2024 – Apr 2024"
          link="https://drive.google.com/file/d/1iFhbRomeA1CB8o9LztIca4fk52QtSEMZ/view?usp=sharing"
        >
          <li>Worked on ML/NLP tasks including classification and text analysis</li>
          <li>Explored CNNs and basic NLP techniques</li>
        </Item>

        <Item
          title="Solar Secure Solutions"
          subtitle="Data Science Intern | Oct 2023 – Dec 2023"
          link="https://drive.google.com/file/d/1LPc0KCqmEeDBb0ePcXuWFcL4KJGxkcZ0/view?usp=sharing"
        >
          <li>Worked on data analysis and modeling using Python</li>
          <li>Built a predictive model for cost-related analysis</li>
        </Item>
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        <Item
          title="Dynamodelx"
          subtitle="Dynamic ML Modeling Framework"
          link="https://github.com/mohithgundimeda/dynamodelx"
        >
          <li>Built a PyTorch-based framework to dynamically construct and train models</li>
          <li>Unified interface for regression, classification, and uncertainty modeling</li>
          <li>Implemented Bayesian Neural Networks for uncertainty estimation</li>
          <li>Reduced setup to 4–5 API calls</li>
        </Item>

        <Item
          title="Baseline OS"
          subtitle="Minimal Linux Environment for ML"
          link="https://drive.google.com/drive/folders/11EmJHU7dK4pbLoHP4-4pfwwWWW638C9d"
        >
          <li>Built a minimal Arch-based system with only what’s needed for ML workflows</li>
          <li>Removed unnecessary services and packages</li>
          <li>Used as a base for Docker-based ML setups</li>
          <li>Working on reproducibility and reducing system size</li>
        </Item>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <p>
          <b>Languages:</b> Python <br />
          <b>ML/DL:</b> PyTorch, CNNs, scikit-learn <br />
          <b>LLM/NLP:</b> Transformers, Fine-tuning <br />
          <b>Libraries:</b> Pandas, NumPy <br />
          <b>Tools:</b> Git, Docker, Linux <br />
          <b>Web:</b> React, Flask, Streamlit
        </p>
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        <p>
          Sri Venkateswara College Of Engineering <br />
          B.Tech in Artificial Intelligence and Machine Learning <br />
          Feb 2021 – May 2025
        </p>
      </Section>

      {/* WRITING */}
      <Section title="Writing & Activities">
        <ul>
          <li>
            Medium:{" "}
            <a href="https://mohith-g.medium.com" target="_blank">
              mohith-g.medium.com
            </a>
          </li>
          <li>Write about ML and statistics, focusing on how models work</li>
          <li>Built a VGG19-based waste classification system as a usable application</li>
        </ul>
      </Section>

      <div style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}>
      <a
        href="/resume.pdf"
        download
        style={{
          display: "block",
          width: "100%",
          maxWidth: "150px",
          textAlign: "center",
          padding: "5px",
          border: "2px solid #000080",
          color: "#000080",
          textDecoration: "none",
          borderRadius: "2px",
          fontWeight: 'normal',
        }}
      >
        Download Resume
      </a>
    </div>

    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h3 style={{ color: "#000080", marginBottom: "5px" }}>{title}</h3>
    {children}
  </div>
);

const Item = ({ title, subtitle, link, children }) => (
  <div style={{ marginBottom: "10px" }}>
    <b>{title}</b>{" "}
    {link && (
      <a href={link} target="_blank" style={{ fontSize: "11px" }}>
        [link]
      </a>
    )}
    <br />
    <span style={{ fontSize: "11px" }}>{subtitle}</span>
    <ul style={{ margin: "5px 0 0 15px" }}>{children}</ul>
  </div>
);

export default Resume;