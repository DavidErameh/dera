"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type FormState = 'idle' | 'loading' | 'success';

interface FormData {
  fullName: string;
  companyName: string;
  role: string;
  email: string;
  volume: string;
}

interface FormErrors {
  [key: string]: string;
}

export const CTASection = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    role: '',
    email: '',
    volume: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.companyName) newErrors.companyName = 'Company Name is required';
    if (!formData.role) newErrors.role = 'Your Role is required';
    if (!formData.volume) newErrors.volume = 'Please select a volume';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Work Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section id="investors" className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="max-w-[580px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <SectionLabel className="justify-center mb-6">EARLY ACCESS</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-blue-900 tracking-tight leading-tight mb-8">
              Ready to run your first claim <br />
              through Dera?
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              We are onboarding a small number of Nigerian insurance companies 
              for our pilot program. Integration requires a single API endpoint 
              and a 90-day Shadow Mode run.
            </p>
          </div>

          {/* Form / Success State */}
          <div className="bg-white rounded-2xl border border-blue-50 shadow-xl shadow-blue-900/5 p-8 md:p-10">
            <AnimatePresence mode="wait">
              {formState !== 'success' ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <Input
                    label="Full Name"
                    name="fullName"
                    placeholder="e.g. Tunde Balogun"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Company Name"
                      name="companyName"
                      placeholder="e.g. Leadway Assurance"
                      value={formData.companyName}
                      onChange={handleChange}
                      error={errors.companyName}
                      required
                    />
                    <Input
                      label="Your Role"
                      name="role"
                      placeholder="e.g. Head of Claims"
                      value={formData.role}
                      onChange={handleChange}
                      error={errors.role}
                      required
                    />
                  </div>
                  <Input
                    label="Work Email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-blue-900">
                      Monthly Motor Claims Volume <span className="text-error">*</span>
                    </label>
                    <select
                      name="volume"
                      value={formData.volume}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 text-base bg-white border rounded-[8px] transition-all duration-200 outline-none appearance-none',
                        'border-border hover:border-border-strong focus:border-blue-700 focus:ring-2 focus:ring-blue-50',
                        errors.volume && 'border-error text-error focus:border-error focus:ring-red-50'
                      )}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7799\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                    >
                      <option value="">Select volume...</option>
                      <option value="Under 500">Under 500</option>
                      <option value="500 to 2,000">500 to 2,000</option>
                      <option value="2,000 to 10,000">2,000 to 10,000</option>
                      <option value="Above 10,000">Above 10,000</option>
                    </select>
                    {errors.volume && (
                      <p className="text-xs font-medium text-error">{errors.volume}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full mt-4"
                    loading={formState === 'loading'}
                  >
                    {formState === 'loading' ? 'Submitting...' : 'Request Early Access'}
                  </Button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-blue-900 mb-4">We received your request.</h3>
                  <p className="text-text-secondary leading-relaxed">
                    A member of the Dera team will reach out <br />
                    within two business days.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-text-muted font-medium">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-green-500">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-green-500">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>90-day Shadow Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-green-500">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Single API integration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
