# RAG-Powered AI Chatbot System

A modern, web-based Retrieval-Augmented Generation (RAG) system that allows users to interact with documents through an intelligent chatbot interface. Built with Flask, LlamaIndex, and modern web technologies.

## 🚀 Features

- **Intelligent Document Processing**: Automatically processes PDF documents using advanced embedding models
- **Modern Web Interface**: Beautiful, responsive chat interface with dark/light mode support
- **Real-time Chat**: Interactive conversation with AI assistant powered by RAG
- **Chat History**: Persistent chat history with local storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Toggle**: Switch between light and dark modes
- **Typing Indicators**: Visual feedback during AI response generation

## 🏗️ Architecture

### Backend Components
- **Flask Web Server**: Handles HTTP requests and serves the web interface
- **LlamaIndex**: Core RAG framework for document indexing and retrieval
- **HuggingFace Embeddings**: BAAI/bge-base-en-v1.5 model for document vectorization
- **Groq LLM**: Llama-3.1-8b-instant model for response generation

### Frontend Components
- **HTML5**: Semantic markup with Bootstrap 5 framework
- **CSS3**: Modern styling with CSS variables and animations
- **JavaScript**: ES6+ with class-based architecture
- **Local Storage**: Persistent chat history and theme preferences

## 📁 Project Structure

```
RAG system/
├── app.py                 # Flask web application
├── script.py             # Standalone RAG implementation
├── data/                 # Document storage directory
│   └── 1706.03762v7.pdf # Sample PDF document
├── templates/            # HTML templates
│   └── index.html       # Main chat interface
├── static/              # Static assets
│   ├── style.css        # CSS styles with theme support
│   └── script.js        # JavaScript functionality
└── README.md            # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd "RAG system"
```

### Step 2: Install Dependencies
Create a virtual environment and install required packages:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install required packages
pip install flask
pip install llama-index
pip install llama-index-llms-groq
pip install llama-index-embeddings-huggingface
```

### Step 3: Configure API Keys
Update the API key in `app.py` (line 13):
```python
Settings.llm = Groq(model="llama-3.1-8b-instant", api_key="YOUR_GROQ_API_KEY")
```

### Step 4: Add Documents
Place your PDF documents in the `data/` directory. The system will automatically process all documents in this folder.

### Step 5: Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## 🎯 Usage

### Web Interface
1. Open your browser and navigate to `http://localhost:5000`
2. The AI assistant will greet you with a welcome message
3. Type your questions in the input field and press Enter or click Send
4. The system will retrieve relevant information from your documents and generate responses
5. Use the "New Chat" button to start a fresh conversation
6. Toggle between light and dark modes using the theme button

### Standalone Script
For testing the RAG system without the web interface:
```bash
python script.py
```

## 🔧 Configuration

### Embedding Model
The system uses `BAAI/bge-base-en-v1.5` for document embeddings. This can be changed in the Settings configuration:

```python
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
```

### Language Model
Currently configured to use Groq's Llama-3.1-8b-instant model. You can modify this in the Settings:

```python
Settings.llm = Groq(model="llama-3.1-8b-instant", api_key="YOUR_API_KEY")
```

### Document Processing
Documents are automatically loaded from the `data/` directory using LlamaIndex's SimpleDirectoryReader.

## 🎨 Customization

### Styling
The interface uses CSS variables for easy theming. Modify `static/style.css` to customize:
- Color schemes
- Typography
- Layout spacing
- Animation effects

### Functionality
Extend the chatbot functionality by modifying `static/script.js`:
- Add new chat features
- Implement additional UI interactions
- Customize message formatting

## 📊 Performance Considerations

- **Document Size**: Large PDFs may take longer to process initially
- **Memory Usage**: Embedding models require significant RAM
- **Response Time**: First query may be slower due to model initialization
- **Storage**: Vector indices are stored in memory for fast retrieval

## 🔒 Security Notes

- **API Keys**: Never commit API keys to version control
- **Environment Variables**: Consider using environment variables for sensitive data
- **Input Validation**: The system includes basic input validation for user messages

## 🐛 Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all dependencies are installed correctly
2. **API Key Issues**: Verify your Groq API key is valid and has sufficient credits
3. **Document Processing**: Check that PDFs are not corrupted and are readable
4. **Memory Issues**: For large documents, consider using smaller embedding models

### Debug Mode
Enable Flask debug mode for detailed error messages:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

## 🚀 Future Enhancements

- [ ] Support for multiple document formats (DOCX, TXT, etc.)
- [ ] User authentication and session management
- [ ] Advanced search and filtering options
- [ ] Export chat history functionality
- [ ] Multi-language support
- [ ] API endpoint for external integrations
- [ ] Document upload interface
- [ ] Advanced RAG configurations (chunk size, overlap, etc.)

## 📝 License

This project is created with ❤️ by **Hasnain Muavia**.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this RAG system.

## 📞 Support

For questions or support, please open an issue in the repository or contact the maintainer.

---

**Note**: This is a demonstration RAG system. For production use, consider implementing additional security measures, error handling, and performance optimizations.
