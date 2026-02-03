import React from 'react';
import { Download } from 'lucide-react';

const ImagePreview = ({ original, processed, onDownload }) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Original Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Original Image</h3>
                </div>
                <div className="relative flex-1 bg-gray-100 min-h-[300px] flex items-center justify-center p-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={original}
                            alt="Original"
                            className="max-w-full max-h-[400px] object-contain rounded-lg shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Processed Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Background Removed</h3>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        PNG • Transparent
                    </span>
                </div>
                <div className="relative flex-1 bg-gray-200 min-h-[300px] flex items-center justify-center p-4" style={{
                    backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={processed}
                            alt="Processed"
                            className="max-w-full max-h-[400px] object-contain rounded-lg drop-shadow-xl"
                        />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-white">
                    <button
                        onClick={(e) => {
                            const btn = e.currentTarget;
                            const originalText = btn.innerHTML;
                            onDownload();

                            // Simple temporary feedback
                            btn.innerHTML = '<span>Downloaded ✓</span>';
                            btn.classList.add('bg-green-600', 'hover:bg-green-700');
                            btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');

                            setTimeout(() => {
                                btn.innerHTML = originalText;
                                btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                                btn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                            }, 2000);
                        }}
                        className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                    >
                        <Download className="h-5 w-5 mr-2" />
                        Download High-Res PNG
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
