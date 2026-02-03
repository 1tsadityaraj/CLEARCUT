import { Link } from 'react-router-dom';
import { UploadCloud, Zap, Shield, Wand2 } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">ClearCut</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">Remove Backgrounds Instantly</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Upload your image and watch the background vanish automatically.
                                    High-quality, transparent images ready for e-commerce, marketing, or personal use.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            to="/signup"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg"
                                        >
                                            Get Started Free
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link
                                            to="/login"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg"
                                        >
                                            Log In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Professional Quality, Zero Effort
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <Wand2 className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI-Powered Precision</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Our advanced AI model detects subjects with pixel-perfect accuracy, handling hair and complex edges effortlessly.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <UploadCloud className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Drag & Drop Upload</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Simply drag your image into the dashboard and let us handle the rest. Supports JPG and PNG.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Lightning Fast</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Get your results in under 5 seconds. Download high-resolution transparent PNGs immediately.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <Shield className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure & Private</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Your images are private. Logic for auto-deletion after 24 hours ensures your data safety.
                                </p>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
