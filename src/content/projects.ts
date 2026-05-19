import { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "sepsis",
    name: "Sepsis Mortality Prediction",
    blurb: "Mortality prediction and early detection of sepsis from time-series patient data using LSTM, based on MIMIC III.",
    description: "Built an end-to-end pipeline for early sepsis detection and mortality prediction using deep learning on electronic health records. Leveraged Google BigQuery to extract and transform over 40,000 patient records from the MIMIC III clinical database, then trained an LSTM network on time-series antibiotic administration data to predict patient outcomes.",
    stack: ["Google BigQuery", "MySQL", "Python", "R", "Keras", "Jupyter", "Pandas", "NumPy", "Matplotlib"],
    bullets: [
      "Analyzed over 40,000 rows of patient data from MIMIC III and identified a positive correlation between time to antibiotic after hospital admission and length of stay.",
      "Implemented a mortality prediction model by training an LSTM for early detection and prediction of sepsis based on time-series data of antibiotic administration.",
    ],
    images: ["/images/projects/sepsis-1.png"],
    videoSrc: "/NHouse Application Video.mp4",
    featured: true,
  },
  {
    id: "bioinks",
    name: "Bioinformatics Independent Research",
    blurb: "Machine learning approach to classify and select bio-inks based on chemical, physical, and biological properties for 3D-printed tissue quality.",
    description: "Conducted independent research applying machine learning to the field of bioprinting. Developed classification models to predict 3D-printed tissue quality based on bio-ink chemical, physical, and biological properties, enabling researchers to select optimal ink formulations before printing.",
    stack: ["Python", "Jupyter", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    bullets: [
      "Used Random Forests, Logistic Regression, XGBoost, and SVM to classify data as high vs low quality 3D-printed tissues, achieving 85% AUC-ROC.",
    ],
    images: ["/images/projects/bioinks-1.png"],
    videoSrc: "/PGPR Cluster Leader Application Video.mp4",
    featured: true,
  },
  {
    id: "mudra",
    name: "Bharatnatyam Mudra Recognition",
    blurb: "Real-time hand gesture recognition for 28 single-hand Bharatnatyam mudras using Google MediaPipe and a custom-trained model, achieving 88.7% accuracy.",
    description: "Developed a real-time Bharatnatyam mudra recognition system using Google MediaPipe to track 21 hand landmark points and trained a custom classification model on all 28 single-hand mudras. Built a Flask web application with a live camera frontend that captures hand motions and displays the recognized mudra in real time.",
    stack: ["Python", "Google MediaPipe", "Flask", "JavaScript", "HTML/CSS"],
    bullets: [
      "Trained a custom classification model on 28 single-hand Bharatnatyam mudras using Google MediaPipe's 21-point hand landmark tracking, achieving 88.7% accuracy.",
      "Built a Flask application with a live camera frontend that performs real-time hand gesture recognition, displaying the identified mudra as the user performs it.",
    ],
    images: [],
  },
  {
    id: "rag",
    name: "Retrieval-Augmented Generation for Domain-Specific QA",
    blurb: "Modular RAG framework for question answering over unstructured multi-format academic documents (PDF, DOCX, Markdown).",
    description: "Designed a modular Retrieval-Augmented Generation pipeline for domain-specific question answering over academic documents. The system ingests PDF, DOCX, and Markdown files, chunks them with sentence-aware strategies, generates dense embeddings, and retrieves relevant passages for LLM-grounded response synthesis.",
    stack: ["Python", "LlamaIndex", "Weaviate", "Ollama", "Mistral", "HuggingFace", "Streamlit"],
    bullets: [
      "Designed and implemented sentence-aware chunking and configurable overlap strategies; generated dense embeddings with LlamaIndex + HuggingFace and indexed in Dockerized Weaviate for Top-K semantic retrieval.",
      "Integrated a local LLM (Mistral via Ollama) for grounded response synthesis and analyzed retrieval relevance and source attribution.",
    ],
    images: ["/images/projects/rag-1.png"],
  },
  {
    id: "dropout",
    name: "ML Pipeline — Student Dropout Prediction",
    blurb: "End-to-end ML pipeline for student dropout prediction using engineered features and LightGBM.",
    description: "Built a complete ML pipeline from data ingestion through model evaluation for predicting student dropout risk. Engineered 67 features from raw academic records and trained a LightGBM classifier with MLflow experiment tracking for reproducibility.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "LightGBM", "MLflow", "Matplotlib", "Seaborn"],
    bullets: [
      "Processed 382 student records across 67 engineered features; merged datasets, created interaction variables, and applied standardization for improved interpretability.",
      "Built and trained a LightGBM binary classifier achieving 80% AUC-ROC with early stopping and hyperparameter optimization; tracked experiments with MLflow.",
    ],
    images: ["/images/projects/dropout-1.png"],
  },
  {
    id: "aws-rek",
    name: "AWS Image Label",
    blurb: "AWS-based image storage and labelling using S3 and Rekognition.",
    description: "Cloud-native image classification service built on AWS. Configured IAM roles and S3 buckets for secure image storage, then integrated Amazon Rekognition for automated label detection and classification of uploaded images.",
    stack: ["AWS S3", "IAM", "Rekognition", "Python", "Jupyter", "GitHub"],
    bullets: [
      "Created an AWS IAM role and configured policy permissions for S3 and Rekognition.",
      "Leveraged Amazon Rekognition alongside S3 for efficient storage and labelling of image datasets.",
    ],
    images: ["/images/projects/aws-rek-1.png"],
  },
];
