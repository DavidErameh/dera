"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { name: "How It Works", href: "#workflow" },
  { name: "The Network", href: "#network" },
  { name: "Features", href: "#features" },
  { name: "For Insurers", href: "#insurers" },
  { name: "For Investors", href: "#investors" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRequestDemo, setShowRequestDemo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setShowRequestDemo(window.scrollY > 600);
      setShowBackToTop(window.scrollY > window.innerHeight * 1.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = ["workflow", "network", "features", "insurers", "investors"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-border h-16 md:h-20 shadow-sm"
            : "bg-transparent h-20 md:h-24",
        )}
      >
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-blue-700 origin-left z-[60]"
          style={{ scaleX }}
        />

        <div className="max-w-[1440px] mx-auto h-full flex items-center px-6 md:px-20 gap-12">
          <Logo variant="dark" />

          {/* Desktop Nav - Left Aligned */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-900",
                  activeSection === link.href.replace("#", "")
                    ? "text-blue-700 font-semibold"
                    : "text-text-secondary",
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Conditional Request Demo - Far Right */}
          <div className="hidden md:flex ml-auto">
            <AnimatePresence>
              {showRequestDemo && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("openRequestDemo"))
                    }
                  >
                    Request Demo
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-blue-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[60]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
                className="absolute top-0 right-0 w-4/5 h-full bg-white shadow-xl flex flex-col p-8"
              >
                <div className="flex justify-between items-center mb-12">
                  <Logo variant="dark" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-blue-900"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-6 h-6"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-lg font-semibold text-text-secondary hover:text-blue-700"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-8"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent("openRequestDemo"));
                    }}
                  >
                    Request Demo
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-[40] bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="w-5 h-5"
            >
              <path
                d="M18 15l-6-6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
