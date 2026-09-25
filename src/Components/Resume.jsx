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
        mohith.work@outlook.com |{" "}
        <a href="https://github.com/mohithgundimeda" target="_blank">GitHub</a>
        {" "}| <a href="https://mohith-g.medium.com" target="_blank">Blogs</a>
      </p>

      {/* EXPERIENCE */}
      <Section title="Experience">
        <Item
          title="LLM-based Draft Automation System"
          subtitle="Freelance ML Engineer | 2025 – Present"
          link="https://github.com/mohithgundimeda/Training-Draft-Public"
        >
          <li>Built a multilingual document automation system that converts Telugu instructions into structured XML documents and DOCX outputs using transformer-based LLM pipelines</li>
          <li>Fine-tuned Qwen 2.5 7B with LoRA for controlled structured generation, improving output reliability and reducing hallucinations</li>
          <li>Engineered a multi-stage NLP pipeline covering document classification, structured extraction, generation, and output validation</li>
          <li>Built and deployed an end-to-end application for automated document workflows, structured form filling, and downloadable document generation</li>
          <li>Developed prompt refinement and structured-generation strategies to improve task-specific output quality and consistency</li>
        </Item>

        <Item
          title="Shivira Travels"
          subtitle="Freelance Full Stack Engineer | 2025 – Present"
          link="https://shiviratravels.com"
        >
          <li>Built and deployed a production full-stack travel platform supporting bookings, enquiries, and package discovery</li>
          <li>Developed responsive React interfaces with dynamic routing, search, and interactive travel workflows</li>
          <li>Engineered Node.js and Express backend services for authentication, APIs, administration, and email workflows</li>
          <li>Managed production deployment, hosting, domain configuration, and ongoing maintenance for business operations</li>
        </Item>

        <Item
          title="Slash Mark"
          subtitle="AI Intern | Jan 2024 – Apr 2024"
          link="https://drive.google.com/file/d/1iFhbRomeA1CB8o9LztIca4fk52QtSEMZ/view?usp=sharing"
        >
          <li>Built and evaluated machine learning and NLP models for classification and text analysis across multiple datasets</li>
          <li>Implemented CNN architectures and NLP preprocessing pipelines for model training and evaluation</li>
        </Item>

        <Item
          title="Solar Secure Solutions"
          subtitle="Data Science Intern | Oct 2023 – Dec 2023"
          link="https://drive.google.com/file/d/1LPc0KCqmEeDBb0ePcXuWFcL4KJGxkcZ0/view?usp=sharing"
        >
          <li>Performed statistical analysis and developed predictive models using Python for cost-related analysis</li>
          <li>Built and evaluated regression models to identify patterns and generate cost predictions</li>
        </Item>
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        <Item
          title="Make Sense"
          subtitle="Research Paper Explainer Pipeline"
          link="https://github.com/mohithgundimeda/Make-Sense"
        >
          <li>Built an end-to-end pipeline that transforms research paper PDFs into structured, beginner-friendly explainer PDFs using LLM-based content restructuring</li>
          <li>Engineered a CPU-only document extraction pipeline using Marker and a local llama.cpp inference server, preserving formulas, tables, and figures without GPU infrastructure</li>
          <li>Implemented a multi-provider LLM fallback architecture across OpenRouter and Gemini to handle rate limits, provider failures, and malformed responses</li>
          <li>Designed a configuration-driven system using Pydantic settings and JSON/INI configuration to control model selection, retry policies, and processing parameters</li>
          <li>Automated PDF generation using Pandoc and Tectonic, producing LaTeX-based documents with preserved mathematical notation and consistent styling</li>
          <li>Built a Gradio interface for end-to-end pipeline execution with structured logging and error handling across processing stages</li>
        </Item>

        <Item
          title="Dynamodelx"
          subtitle="Dynamic ML Modeling Framework"
          link="https://github.com/mohithgundimeda/dynamodelx"
        >
          <li>Built a PyTorch-based framework for dynamically constructing and training machine learning models for regression, classification, and uncertainty estimation</li>
          <li>Engineered modular APIs for rapid experimentation across statistical and machine learning workflows</li>
          <li>Implemented Bayesian Neural Networks using variational inference and ELBO optimization for probabilistic and uncertainty-aware modeling</li>
          <li>Built reusable experimentation workflows for training, evaluation, and model comparison</li>
          <li>Automated model training and evaluation pipelines for repeatable experimentation and validation</li>
          <li>Implemented a unified framework supporting heteroscedastic regression and multi-class classification</li>
        </Item>

        <Item
          title="Baseline OS"
          subtitle="Minimal Linux Runtime for Production ML"
          link="https://drive.google.com/drive/folders/11EmJHU7dK4pbLoHP4-4pfwwWWW638C9d"
        >
          <li>Built a minimal Arch Linux runtime as an alternative to generic cloud-provider OS images, removing unnecessary system services and packages to minimize idle resource consumption</li>
          <li>Configured the operating system, networking, package management, and initialization stack to create a lean workload-specific production environment</li>
          <li>Optimized the runtime around a dedicated ML workload, allocating system resources primarily to model execution and inference</li>
          <li>Containerized ML dependencies with minimal Docker environments to maintain reproducible builds and consistent deployment across hosts</li>
        </Item>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <p>
          <b>Programming:</b> Python <br />
          <b>Machine Learning:</b> PyTorch, scikit-learn, CNNs, Bayesian Neural Networks, Statistical Modeling, Regression, Classification <br />
          <b>NLP and LLMs:</b> Transformers, LoRA, Fine-tuning, Tokenization, Structured Generation, Prompt Engineering, Text Classification <br />
          <b>ML Workflows:</b> Model Training, Evaluation Pipelines, Experimentation, Inference Pipelines, Docker, Linux <br />
          <b>Data Science Libraries:</b> NumPy, Pandas, Matplotlib <br />
          <b>Web Technologies:</b> React, Node.js, Express, Flask, Streamlit <br />
          <b>Tools and Platforms:</b> Git, LangChain, Docker, Hugging Face, Pydantic
        </p>
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        <p>
          Sri Venkateswara College of Engineering, Tirupati, Andhra Pradesh <br />
          B.Tech in Artificial Intelligence and Machine Learning <br />
          2021 – 2025
        </p>
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
        }}>
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