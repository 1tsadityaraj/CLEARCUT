import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { useCallback } from 'react';

const UploadZone = ({ onFileSelect, disabled }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png']
        },
        maxFiles: 1,
        disabled
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ease-in-out
                ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            <input {...getInputProps()} />
            <div className="space-y-4">
                <div className="flex justify-center">
                    {isDragActive ? (
                        <UploadCloud className="h-12 w-12 text-indigo-500" />
                    ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                    )}
                </div>
                <div className="text-gray-600">
                    {isDragActive ? (
                        <p className="font-medium text-indigo-600">Drop the image here...</p>
                    ) : (
                        <p>
                            <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                        </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                </div>
            </div>
        </div>
    );
};

export default UploadZone;
