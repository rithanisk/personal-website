/**
 * Research and project experience.
 */
export const projects = [
  {
    name: "Sepsis Mortality Prediction",
    description:
      "Mortality prediction and early detection of sepsis from time-series patient data using LSTM, based on MIMIC III.",
    startDate: null,
    endDate: null,
    tech: ["Google BigQuery", "MySQL", "Python", "R", "Keras", "Jupyter Notebook", "Pandas", "NumPy", "Matplotlib"],
    link: null,
    bullets: [
      "Analyzed over 40,000 rows of patient data from MIMIC III and identified a positive correlation between time to antibiotic after hospital admission and length of stay.",
      "Implemented a mortality prediction model by training an LSTM for early detection and prediction of sepsis based on time-series data of antibiotic administration.",
    ],
  },
  {
    name: "Bioinformatics Independent Research",
    description:
      "Machine learning approach to classify and select bio-inks based on chemical, physical, and biological properties for 3D-printed tissue quality.",
    startDate: null,
    endDate: null,
    tech: ["Python", "Jupyter Notebook", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    link: null,
    bullets: [
      "Used Random Forests, Logistic Regression, XGBoost, and SVM to classify data as high vs low quality 3D-printed tissues, achieving 85% AUC-ROC.",
    ],
  },
  {
    name: "Retrieval-Augmented Generation (RAG) System for Domain-Specific QA",
    description:
      "Modular RAG framework for question answering over unstructured multi-format academic documents (PDF, DOCX, Markdown).",
    startDate: null,
    endDate: null,
    tech: ["Python", "LlamaIndex", "Weaviate", "Ollama", "Mistral", "HuggingFace", "Streamlit"],
    link: null,
    bullets: [
      "Designed and implemented sentence-aware chunking and configurable overlap strategies; generated dense embeddings with LlamaIndex + HuggingFace and indexed in Dockerized Weaviate for Top-K semantic retrieval.",
      "Integrated a local LLM (Mistral via Ollama) for grounded response synthesis and analyzed retrieval relevance and source attribution.",
    ],
  },
  {
    name: "ML Pipeline (Student Dropout Prediction)",
    description:
      "End-to-end ML pipeline for student dropout prediction using engineered features and LightGBM.",
    startDate: null,
    endDate: null,
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "LightGBM", "MLflow", "Matplotlib", "Seaborn"],
    link: null,
    bullets: [
      "Processed 382 student records across 67 engineered features; merged datasets, created interaction variables, and applied standardization for improved interpretability.",
      "Built and trained a LightGBM binary classifier achieving 80% AUC-ROC with early stopping and hyperparameter optimization; tracked experiments with MLflow.",
    ],
  },
  {
    name: "AWS Image Label",
    description:
      "AWS-based image storage and labelling using S3 and Rekognition.",
    startDate: null,
    endDate: null,
    tech: ["AWS S3", "IAM", "Rekognition", "Python", "Jupyter Notebook", "GitHub"],
    link: null,
    bullets: [
      "Created an AWS IAM role and configured policy permissions for S3 and Rekognition.",
      "Leveraged Amazon Rekognition alongside S3 for efficient storage and labelling of image datasets.",
    ],
  },
];
