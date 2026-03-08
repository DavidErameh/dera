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
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EEFF]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #4F8EF7 0%, #1A3FD4 100%)",
                  }}
                >
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0A1628]">
                    Request a Demo
                  </h3>
                  <p className="text-xs text-[#6B7799]">
                    Get started with Dera
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-xl bg-[#F2F4F8] flex items-center justify-center hover:bg-[#E8EEFF] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0A1628"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 md:p-8">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
