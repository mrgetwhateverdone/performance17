'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically authenticate the user
      console.log('Login submitted:', formData);
      
      // For demo purposes, we'll just navigate to workout setup
      router.push('/workout/setup');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-black">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-[#666666]">
              Or{' '}
              <Link href="/auth/register" className="font-medium text-[#007AFF] hover:text-[#0056b3]">
                create a new account
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-md" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border-2 border-[#007AFF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] bg-white text-black placeholder-[#007AFF]"
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border-2 border-[#007AFF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] bg-white text-black placeholder-[#007AFF]"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-5 w-5 border-2 border-[#007AFF] rounded focus:ring-[#007AFF] text-[#007AFF]"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm font-medium text-[#666666]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#007AFF] hover:text-[#0056b3]">
                  Forgot your password?
                </a>
              </div>
            </div>

            {errors.general && (
              <div className="mt-4">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <div className="pt-4">
              <Button type="submit" variant="primary" fullWidth>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 