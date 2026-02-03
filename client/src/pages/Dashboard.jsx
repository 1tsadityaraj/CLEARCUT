import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UploadZone from '../components/UploadZone';
import ImagePreview from '../components/ImagePreview';
import LoadingOverlay from '../components/LoadingOverlay';
import { Loader2 } from 'lucide-react'; // Keeping for other uses if needed, or remove if unused
import axios from 'axios';

const Dashboard = () => {
    const { user, api, updateCredits, config } = useAuth();
    const [file, setFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState(null); // { original, processed }
    const [error, setError] = useState(null);
    const [progressMessage, setProgressMessage] = useState('Starting upload...');

    const handleFileSelect = async (selectedFile) => {
        setFile(selectedFile);
        setError(null);
        setResult(null);

        if (!selectedFile) return;

        // Check credits (only if payments enabled)
        if (config?.enablePayments && user.credits < 1) {
            setError('Insufficient credits. Please upgrade your plan.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        setProcessing(true);
        // Start Progress Simulation
        setProgressMessage('Uploading image...');
        const t1 = setTimeout(() => setProgressMessage('Analyzing subject...'), 1500);
        const t2 = setTimeout(() => setProgressMessage('Removing background...'), 3000);
        const t3 = setTimeout(() => setProgressMessage('Finalizing high-quality PNG...'), 5000);

        try {
            const { data } = await api.post('/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Ensure simulation runs for at least some time so user sees messages
            // (Only useful if API is extremely fast)
            await new Promise(resolve => setTimeout(resolve, 1000));

            setResult({
                original: data.originalImageUrl,
                processed: data.processedImageUrl,
            });
            updateCredits(user.credits - 1);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to process image');
        } finally {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            setProcessing(false);
        }
    };

    const handleDownload = async () => {
        if (!result?.processed) return;

        try {
            const response = await fetch(result.processed);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `removed-bg-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            console.error('Download failed:', e);
            window.open(result.processed, '_blank');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">ClearCut Dashboard</h1>
                <p className="mt-2 text-gray-600">Upload your images to remove background instantly.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 relative overflow-hidden transition-all duration-300">

                {/* Loading Overlay */}
                {processing && <LoadingOverlay />}

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start animate-fade-in">
                        <div className="flex-shrink-0 text-red-500 mt-0.5">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Processing Failed</h3>
                            <div className="mt-1 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                {!result && !processing && (
                    <div className="max-w-2xl mx-auto">
                        <UploadZone onFileSelect={handleFileSelect} disabled={processing} />
                        <p className="text-center text-sm text-gray-400 mt-6">
                            Supported formats: PNG, JPG, JPEG • Max file size: 10MB
                        </p>
                    </div>
                )}

                {/* Pre-loader logic handled by overlay, just showing preview when result exists */}
                {result && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Your Result</h2>
                            <button
                                onClick={() => { setResult(null); setFile(null); }}
                                className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload New Image
                            </button>
                        </div>
                        <ImagePreview
                            original={result.original}
                            processed={result.processed}
                            onDownload={handleDownload}
                        />
                    </div>
                )}
            </div>

            {/* Recent Uploads Section (Could technically fetch these) */}
            {/* <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     Placeholder for recent images 
                </div> 
            </div> */}
        </div>
    );
};

export default Dashboard;
