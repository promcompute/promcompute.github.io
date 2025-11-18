// Global state management
const appState = {
    selectedModel: null,
    uploadedDataset: null,
    trainingStatus: 'idle'
};

// Utility functions
function updateSelectedModel(model) {
    appState.selectedModel = model;
    localStorage.setItem('selectedModel', JSON.stringify(model));
}

function getSelectedModel() {
    const stored = localStorage.getItem('selectedModel');
    return stored ? JSON.parse(stored) : null;
}

function updateUploadedDataset(dataset) {
    appState.uploadedDataset = dataset;
    localStorage.setItem('uploadedDataset', JSON.stringify(dataset));
}

function getUploadedDataset() {
    const stored = localStorage.getItem('uploadedDataset');
    return stored ? JSON.parse(stored) : null;
}

function clearTrainingState() {
    localStorage.removeItem('selectedModel');
    localStorage.removeItem('uploadedDataset');
    localStorage.removeItem('trainingStatus');
    appState.selectedModel = null;
    appState.uploadedDataset = null;
    appState.trainingStatus = 'idle';
}

// Model data
const availableModels = [
    {
        id: 'llama-3.1-8b',
        name: 'Llama 3.1 8B',
        parameters: '8B',
        description: 'Latest Llama model with excellent reasoning capabilities',
        contextLength: '128K'
    },
    {
        id: 'llama-3.1-70b',
        name: 'Llama 3.1 70B',
        parameters: '70B',
        description: 'High-performance model for complex tasks',
        contextLength: '128K'
    },
    {
        id: 'mistral-7b',
        name: 'Mistral 7B',
        parameters: '7B',
        description: 'Efficient and powerful open-source model',
        contextLength: '32K'
    },
    {
        id: 'mixtral-8x7b',
        name: 'Mixtral 8x7B',
        parameters: '46.7B',
        description: 'Mixture of Experts architecture for superior performance',
        contextLength: '32K'
    },
    {
        id: 'phi-3-mini',
        name: 'Phi-3 Mini',
        parameters: '3.8B',
        description: 'Microsoft\'s compact yet capable model',
        contextLength: '128K'
    },
    {
        id: 'gemma-2-9b',
        name: 'Gemma 2 9B',
        parameters: '9B',
        description: 'Google\'s lightweight open model',
        contextLength: '8K'
    },
    {
        id: 'qwen-2-7b',
        name: 'Qwen 2 7B',
        parameters: '7B',
        description: 'Alibaba\'s multilingual powerhouse',
        contextLength: '128K'
    }
];

// Training status messages
const trainingStages = [
    { duration: 3000, message: 'Preparing environment...' },
    { duration: 4000, message: 'Downloading base model...' },
    { duration: 8000, message: 'Fine-tuning model with your data...' },
    { duration: 3000, message: 'Optimizing model weights...' },
    { duration: 2000, message: 'Generating modelfile...' },
    { duration: 2000, message: 'Finalizing training...' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Restore state from localStorage
    const model = getSelectedModel();
    const dataset = getUploadedDataset();
    
    if (model) {
        appState.selectedModel = model;
    }
    if (dataset) {
        appState.uploadedDataset = dataset;
    }
});

// Progress indicator component
function createProgressIndicator(currentStep) {
    const steps = ['Home', 'Model', 'Data', 'Training', 'Download'];
    const stepNumbers = ['1', '2', '3', '4', '5'];
    
    let html = '<div class="flex items-center justify-center space-x-2 md:space-x-4 mb-12">';
    
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        
        // Step dot
        let dotClass = 'progress-dot';
        if (isActive) dotClass += ' active';
        else if (isCompleted) dotClass += ' completed';
        
        html += `<div class="${dotClass}">${isCompleted ? '✓' : stepNumbers[index]}</div>`;
        
        // Progress line
        if (index < steps.length - 1) {
            let lineClass = 'progress-line';
            if (isCompleted) lineClass += ' completed';
            html += `<div class="${lineClass}"></div>`;
        }
    });
    
    html += '</div>';
    return html;
}

// File upload utilities
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function validateFile(file) {
    const validTypes = ['.jsonl', '.json', '.txt', '.csv'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    return validTypes.includes(fileExtension);
}