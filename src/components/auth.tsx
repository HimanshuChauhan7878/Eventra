import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmds5hrUXcgYtk2kQTK-aKdh3iO3Ux1-k",
  authDomain: "eventra-a04e2.firebaseapp.com",
  projectId: "eventra-a04e2",
  storageBucket: "eventra-a04e2.firebasestorage.app",
  messagingSenderId: "181933418021",
  appId: "1:181933418021:web:fc0bbbbeabf682e76401cc",
  measurementId: "G-ZVMMNW6SST"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
}

interface UserProfile {
  name: string;
  xpPoints: number;
  eventsAttended: number;
}

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: '',
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    xpPoints: 0,
    eventsAttended: 0,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate fetching user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Replace with actual API call
      const userData = {
        name: 'John Doe',
        xpPoints: 1200,
        eventsAttended: 15,
      };
      setUserProfile(userData);
    };
    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {
      name: '',
      email: '',
      password: '',
    };
    let isValid = true;

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setIsAuthenticated(true);
        setSuccessMessage('Registration successful! You are now logged in.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors(prev => ({
        ...prev,
        email: error instanceof Error ? error.message : 'Authentication failed'
      }));
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    setErrors({
      name: '',
      email: '',
      password: '',
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrors(prev => ({
        ...prev,
        email: error instanceof Error ? error.message : 'Google sign-in failed'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient decorative elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-96 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-48 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl w-full mx-auto flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Brand section with gradient background */}
        <div className="w-full lg:w-1/2 relative bg-gradient-to-b from-teal-900 via-blue-900 to-slate-900 p-12 text-white">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative h-full flex flex-col justify-between">
            {/* Logo */}
            <div>
              <h1 className="text-4xl font-bold">Eventra</h1>
              <div className="h-1 w-16 bg-teal-400 mt-3"></div>
            </div>

            {/* Content */}
            <div className="mt-12">
              <h2 className="text-3xl font-semibold mb-6">
                {isLogin ? 'Welcome Back!' : 'Join Our Community'}
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                {isLogin 
                  ? 'Log in to access your dashboard and continue your digital transformation journey with us.'
                  : 'Create an account to start your digital transformation journey and unlock your business potential.'}
              </p>

              {/* Testimonial quote */}
              <div className="mt-12">
                <svg className="h-10 w-10 text-teal-400 mb-6 opacity-75" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-slate-300 italic text-lg mb-6">
                  "Eventra helped us increase our digital presence by 200% in just three months. Their team's expertise is unmatched in the industry."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-600 rounded-full mr-4"></div>
                  <div>
                    <p className="text-base font-medium">Alex Thompson</p>
                    <p className="text-sm text-slate-400">CTO, TechVision Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            {/* Auth toggle */}
            <div className="flex justify-end mb-8">
              <div className="inline-flex rounded-full p-1 bg-slate-100">
                <button 
                  onClick={() => setIsLogin(true)} 
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${isLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                >
                  Log In
                </button>
                <button 
                  onClick={() => setIsLogin(false)} 
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${!isLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              {isLogin 
                ? 'Enter your credentials below to access your account' 
                : 'Fill in the information below to get started'
              }
            </p>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field (only for signup) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`pl-10 w-full px-4 py-3 bg-slate-50 border ${
                        errors.name ? 'border-red-500' : 'border-slate-300'
                      } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-base`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 w-full px-4 py-3 bg-slate-50 border ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-base`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 w-full px-4 py-3 bg-slate-50 border ${
                      errors.password ? 'border-red-500' : 'border-slate-300'
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-base`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember me & forgot password (login only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link to="/forgot-password" className="text-sm font-medium text-teal-600 hover:text-teal-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              )}

              {/* Terms agreement (signup only) */}
              {!isLogin && (
                <div>
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 mt-1 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                      I agree to the <a href="#" className="text-teal-600 hover:text-teal-500 font-medium">Terms of Service</a> and <a href="#" className="text-teal-600 hover:text-teal-500 font-medium">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg shadow-teal-500/20 transition-all duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2" size={18} />
              </button>
            </form>

            {/* Social login options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.12 18.63 6.69 16.69 5.81 14.09H2.12V16.95C3.94 20.55 7.67 23 12 23Z" fill="#34A853"/>
                    <path d="M5.81 14.09C5.58 13.43 5.45 12.73 5.45 12C5.45 11.27 5.58 10.57 5.81 9.91V7.05H2.12C1.42 8.56 1 10.23 1 12C1 13.77 1.42 15.44 2.12 16.95L5.81 14.09Z" fill="#FBBC05"/>
                    <path d="M12 5.37C13.63 5.37 15.1 5.94 16.27 7.06L19.4 3.93C17.46 2.1 14.97 1 12 1C7.67 1 3.94 3.45 2.12 7.05L5.81 9.91C6.69 7.31 9.12 5.37 12 5.37Z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </div>
            </div>

            {/* Toggle between login and signup */}
            <p className="mt-8 text-center text-sm text-slate-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;