"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success";

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

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestDemoModal = ({ isOpen, onClose }: RequestDemoModalProps) => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    role: "",
    email: "",
    volume: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.role) newErrors.role = "Your Role is required";
    if (!formData.volume) newErrors.volume = "Please select a volume";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Work Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid work email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("loading");

    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

  const handleClose = () => {
    setFormState("idle");
    setFormData({
      fullName: "",
      companyName: "",
      role: "",
      email: "",
      volume: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="relative w-full max-w-5xl"
          >
            {/* Big white container card - single main card */}
            <div className="relative bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
              {/* X button at top-right corner */}
              <button
                onClick={handleClose}
                className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 text-[#6B7799] hover:text-[#0A1628] transition-colors z-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="flex items-stretch gap-3 sm:gap-4 md:gap-6 p-2 sm:p-3 md:p-4">
                {/* Blue card - inside the big white container */}
                <div className="w-[55%] min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[750px] bg-gradient-to-br from-[#8BB4FF] via-[#6BA3FF] to-white rounded-2xl shadow-md flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 text-center">
                  <h2 className="text-white/90 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold -mb-3 sm:-mb-4 md:-mb-6" style={{ fontFamily: "var(--font-garamond)" }}>
                    Get started with
                  </h2>
                  <img 
                    src="/logos/fc2cd7c8-3df2-4dff-9558-cecbf5a1abce_removalai_preview.svg" 
                    alt="DERA" 
                    className="w-24 sm:w-32 md:w-44 lg:w-56 h-auto -mt-3 sm:-mt-4 md:-mt-6"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>

                {/* Content directly on the big white container */}
                <div className="flex-1 p-2 md:p-4">
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0A1628] mb-2 md:mb-3" style={{ fontFamily: "var(--font-garamond)" }}>
                      Request a Demo
                    </h3>
                    <p className="text-sm md:text-base text-[#6B7799] max-w-lg leading-relaxed">
                      See how Dera can streamline your claims process. Our team will reach out within 2 business days to schedule your personalized demo.
                    </p>
                  </div>
                  <AnimatePresence mode="wait">
                    {formState !== "success" ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <label className="text-sm font-medium text-[#0A1628]">
                        Monthly Motor Claims Volume{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 text-base bg-white border rounded-[8px] transition-all duration-200 outline-none appearance-none",
                          "border-gray-200 hover:border-gray-300 focus:border-blue-700 focus:ring-2 focus:ring-blue-50",
                          errors.volume &&
                            "border-red-500 text-red-500 focus:border-red-500 focus:ring-red-50",
                        )}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7799'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1rem",
                        }}
                      >
                        <option value="">Select volume...</option>
                        <option value="Under 500">Under 500</option>
                        <option value="500 to 2,000">500 to 2,000</option>
                        <option value="2,000 to 10,000">2,000 to 10,000</option>
                        <option value="Above 10,000">Above 10,000</option>
                      </select>
                      {errors.volume && (
                        <p className="text-xs font-medium text-red-500">
                          {errors.volume}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full mt-2"
                      loading={formState === "loading"}
                    >
                      {formState === "loading" ? "Submitting..." : "Request Demo"}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="w-10 h-10"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#0A1628] mb-4">
                      We received your request.
                    </h3>
                    <p className="text-[#6B7799] leading-relaxed">
                      A member of the Dera team will reach out <br />
                      within two business days.
                    </p>
                  </motion.div>
                )}
                  </AnimatePresence>
                </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );
};
