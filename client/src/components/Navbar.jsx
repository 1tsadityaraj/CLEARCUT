import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Image, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout, config } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <Image className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">ClearCut</span>
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link to="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                                {config?.enablePayments ? (
                                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        {user.credits} Credits
                                    </span>
                                ) : (
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        Free Tier
                                    </span>
                                )}
                                <button
                                    onClick={logout}
                                    className="flex items-center text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    <LogOut className="h-4 w-4 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium">
                                    Sign Up Free
                                </Link>
                            </>
                        )}
                    </div>
                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Dashboard</Link>
                                <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</Link>
                                <Link to="/signup" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
