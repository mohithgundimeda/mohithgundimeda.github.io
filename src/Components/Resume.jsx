import React from "react";

const Resume = () => {
  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        fontSize: '12px',
        color: '#000000',
        padding: '20px',
        backgroundColor: '#ffffff',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <h2 style={{ fontSize: '18px', color: '#000080', fontWeight: 'bold', margin: 0, display:'flex', alignSelf:'center'}}>
        Mohith Gundimeda
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ fontSize: '14px', color: '#000080', fontWeight: 'bold', margin: 0 }}>
          Education
        </h3>
        <p style={{ margin: 0 }}>
          Sri Venkateshwara College of Engineering<br />
          Andhra Pradesh, India<br />
          Course work: Artificial Intelligence And Machine Learning<br />
          Jan. 2021 – present
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ fontSize: '14px', color: '#000080', fontWeight: 'bold', margin: 0 }}>
          Skills & Interests
        </h3>
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Skills</span>: Data Structures and Algorithms, Natural Language Processing, Artificial Intelligence and Machine Learning, Deep Learning Frameworks (Tensorflow, PyTorch, Keras) and Model Building, Computer Vision (OpenCV), System Design, Probability Theory, Statistics, Linear Algebra, Python, Java, SQL, Web Development (React, Express, Flask), JavaScript, HTML, CSS<br /><br />
          <span style={{ fontWeight: 'bold' }}>Interests</span>: Entrepreneurial Innovations, Autonomous Decision-Making Systems, Human-AI Interactions
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ fontSize: '14px', color: '#000080', fontWeight: 'bold', margin: 0 }}>
          Experience
        </h3>
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Solar Secure Solutions</span><br />
          October 2023 - December 2023<br />
          Data Science Intern<br />
          Karnataka, India
        </p>
        <ul style={{ listStyleType: 'disc', margin: '0 0 10px 20px', padding: 0 }}>
          <li>Utilized various data modeling and optimization techniques to enhance the accuracy and relevance of data-driven insights.</li>
          <li>Conducted an analysis project on hotel bookings, focusing on cost maintenance by incorporating multiple factors.</li>
          <li>Facilitated data-driven decision-making through comprehensive visualizations, leveraging data plots for enhanced clarity.</li>
          <li>Developed a machine learning model using a Random Forest Classifier, achieving a predictive accuracy of 91 percent.</li>
        </ul>
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Slash Mark</span><br />
          January 2024 - April 2024<br />
          AI Intern<br />
          Telangana, India
        </p>
        <ul style={{ listStyleType: 'disc', margin: '0 0 10px 20px', padding: 0 }}>
          <li>Image Classification: Preprocessed and augmented image datasets; built and trained Convolutional Neural Networks (CNNs) using TensorFlow and Keras.</li>
          <li>Plagiarism Detection: Applied natural language processing (NLP) techniques and text analysis algorithms to identify text similarities and detect plagiarism.</li>
          <li>Credit Card Fraud Detection: Managed imbalanced datasets and performed feature engineering to support fraud detection. Employed machine learning techniques to uncover patterns indicative of fraudulent activity.</li>
          <li>Sentiment Analysis: Developed sentiment classification models for social media data using tools like NLTK and scikit-learn, strengthening my understanding of NLP and sentiment analysis.</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ fontSize: '14px', color: '#000080', fontWeight: 'bold', margin: 0 }}>
          Projects
        </h3>
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>CalorieVision</span><br />
          Designed and implemented a protein-tracking web application leveraging Flask for the backend and HTML, CSS, and JavaScript for an intuitive frontend. The application enables users to upload images or use their camera to obtain food item predictions. Flask manages these requests, interfacing with a TensorFlow-based deep learning model for accurate identification of food items. SQLAlchemy supports the backend with a structured database that stores nutritional information, empowering users to monitor their protein intake and make informed dietary choices. (Source code available on GitHub)
        </p>
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Telecom Churn Prediction</span><br />
          An end-to-end customer churn prediction tool with a Flask-based web interface. Users input customer data, which is processed, scaled, and fed to a Decision Tree classifier for prediction. This model, optimized through extensive training and validation, provides valuable insights for customer retention strategies. (Source code available on GitHub)
        </p>
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Hate Speech Detector</span><br />
          A hate speech classification model to categorize tweets into "Hate Speech," "Offensive Language," or "Normal" categories. Preprocessed data using NLTK for noise reduction, tokenization, and stemming, ensuring accurate model performance. This project contributes to safer online interactions by identifying and classifying harmful content effectively. (Source code available on GitHub)
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ fontSize: '14px', color: '#000080', fontWeight: 'bold', margin: 0 }}>
          Extracurricular Activities
        </h3>
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Custom Transformer Model Design</span><br />
          Developed a transformer-based language model that incorporates multiple self-attention heads and feedforward layers, along with layer normalization to enhance performance. Created functions for efficient data processing, including vocabulary encoding and splitting datasets into training and validation sets. Configured key training parameters, such as batch size, learning rate, and dropout rate, to improve model generalization. Implemented a loss estimation function to monitor training and validation losses throughout the training process. Enabled text generation capabilities, allowing the model to predict the next tokens based on user input. Optimized the implementation for GPU compatibility with CUDA, significantly accelerating computations. (Source code available on GitHub)
        </p>
        {/* <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Freelance Project: Travel Company Website</span><br />
          A visually appealing and trustworthy website for VLC Tours. Currently in the deployment process, focused on crafting an engaging design that promotes user confidence and encourages exploration of travel packages. Implemented features to enhance user experience, ensuring visitors can easily navigate the site and access essential information about services and offers.
        </p> */}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ fontSize: '14px', color: '#000080', fontWeight: 'bold', margin: 0 }}>
          Classes
        </h3>
        <p style={{ margin: 0 }}>
          Courses: Algorithm Design, Linear Algebra, Probability and Statistics, Advanced Machine Learning, Deep Learning, Natural Language Processing, DBMS, Cloud Computing, Reinforcement Learning (In Progress), Recommender Systems (In Progress)
        </p>
      </div>

      <p style={{ margin: 0 }}>
        +91 9121681169 | mohithgundemeda@gmail.com | github.com/mohithgundimeda
      </p>
    </div>
  );
};

export default Resume;