"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const problemCards = [
  {
    title: "The Visibility Gap",
    label: "OPERATIONS",
    body: "The second a customer hits submit, they lose visibility. For the next 3 to 10 days, they sit with a frozen Pending status while the insurer and garage operate on separate islands of information. The data dies between handoffs. The customer calls support just to hear \"we're checking.\" It's a week of anxiety and silence - and it's entirely preventable.",
  },
  {
    title: "The 60-Day Clock",
    label: "COMPLIANCE",
    body: "NIIRA 2025 mandates settlement within 60 days. Every manual handoff is days you cannot get back. Non-compliance triggers NAICOM sanctions - not warnings.",
  },
  {
    title: "Paper-Based Fraud",
    label: "FRAUD",
    body: "Without metadata validation at the point of upload, anyone can submit a two-year-old photo. Industry fraud leakage runs at 10 to 20 percent of total claims paid.",
  },
  {
    title: "The Trust Deficit",
    label: "GROWTH",
    body: "9 in 10 Nigerians who own a vehicle do not trust the claims process enough to hold genuine insurance. The market does not have a product problem. It has a trust problem.",
  },
  {
    title: "The Scale Wall",
    label: "EFFICIENCY",
    body: "Every new claim is another human task. Hiring more adjusters scales cost, not speed. The only way to grow without growing headcount is to automate.",
  },
  {
    title: "The Uninsured Market",
    label: "MARKET",
    stat: "9M",
    statLabel: "ghost drivers",
    body: "12.2M registered vehicles. Only 3.4M have genuine policies. The gap is not a product problem - it is a claims problem.",
    source: "NBS · NIID",
  },
];

type CardProps = {
  title: string;
  label: string;
  body: string;
  stat?: string;
  statLabel?: string;
  source?: string;
  isExpanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const Card = React.memo(
  ({
    title,
    label,
    body,
    stat,
    statLabel,
    source,
    isExpanded,
    onMouseEnter,
    onMouseLeave,
  }: CardProps) => {
    return (
      <motion.div
        className="w-[260px] md:w-[320px] h-[280px] md:h-[320px] rounded-2xl p-5 md:p-8 flex flex-col bg-white cursor-pointer relative shrink-0 overflow-hidden"
        style={{
          boxShadow: isExpanded
            ? "0 20px 50px rgba(0, 0, 0, 0.2)"
            : "0 4px 16px rgba(0, 0, 0, 0.08)",
          zIndex: isExpanded ? 100 : 10,
          willChange: "width",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        initial={false}
        animate={{
          width: isExpanded ? 340 : 260,
        }}
        transition={{
          duration: 0.45,
          ease: "easeInOut",
        }}
      >
        {/* Gradient background for unexpanded cards */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.45 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 150% 100% at 50% 0%, #EBF5FF 0%, #C5DFFA 60%, #9DC4EE 100%)",
            }}
          />
        </motion.div>

        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-[#8B7EDB] relative z-[2]">
          {label}
        </span>

        <div className="mt-3 md:mt-4">
          {stat ? (
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="font-headline text-4xl md:text-6xl font-bold text-[#1A1A1A]">
                {stat}
              </span>
              <span className="text-lg md:text-2xl text-[#4F8EF7] font-medium">
                {statLabel}
              </span>
            </div>
          ) : (
            <h3 className="font-headline text-xl md:text-3xl font-bold leading-tight text-[#1A1A1A]">
              {title}
            </h3>
          )}
        </div>

        {/* Content overlay */}
        <motion.div
          className="absolute left-0 right-0 px-5 md:px-8 pb-5 md:pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.1,
            delay: isExpanded ? 0.45 : 0,
          }}
          style={{
            zIndex: 10,
            bottom: 0,
            maxHeight: "60%",
            willChange: "opacity, transform",
          }}
        >
          <div className="bg-white/98 rounded-lg p-3 md:p-4">
            <p className="text-sm md:text-base leading-5 md:leading-6 text-[#4a4a4a] line-clamp-3 md:line-clamp-4">
              {body}
            </p>
            {source && (
              <div className="pt-1 md:pt-2">
                <span className="text-[10px] md:text-xs text-[#6B6B6B]/60 uppercase tracking-wider">
                  {source}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  },
);

export const ProblemSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [expandedRow1, setExpandedRow1] = useState<number>(0);
  const [expandedRow2, setExpandedRow2] = useState<number>(2);

  const handleMouseEnterRow1 = (index: number) => {
    setExpandedRow1(index);
  };

  const handleMouseLeaveRow1 = () => {
    setExpandedRow1(0);
  };

  const handleMouseEnterRow2 = (index: number) => {
    setExpandedRow2(index);
  };

  const handleMouseLeaveRow2 = () => {
    setExpandedRow2(2);
  };

  return (
    <section
      id="problem"
      className="bg-gradient-to-b from-[#f1f5f9] to-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Heading Area */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h2 className="font-headline text-center md:text-left text-4xl sm:text-5xl md:text-7xl font-bold text-[#0A1628] leading-[1.05] mb-4">
            The System That is <span className="text-[#4F8EF7]">Failing</span>{" "}
            <span style={{ fontFamily: "var(--font-garamond)" }}>Everyone</span>
          </h2>
          <p className="text-center md:text-left text-lg sm:text-xl md:text-3xl font-medium text-[#3D4A6B]">
            Not one Problem,{" "}
            <span
              style={{
                fontFamily: "var(--font-garamond)",
                fontSize: "1.4em",
                fontWeight: 700,
              }}
            >
              Six.
            </span>
          </p>
        </motion.div>

        {/* Mobile Carousel - Deck of Cards */}
        <div className="md:hidden">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper pb-12"
          >
            {problemCards.map((card, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "85%", height: "500px" }}
              >
                <div
                  className="h-full rounded-2xl p-8 flex flex-col bg-white cursor-pointer overflow-hidden"
                  style={{
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8B7EDB]">
                    {card.label}
                  </span>
                  <div className="mt-4 relative z-[2]">
                    {card.stat ? (
                      <div className="flex items-baseline gap-3">
                        <span className="font-headline text-5xl md:text-6xl font-bold text-[#1A1A1A]">
                          {card.stat}
                        </span>
                        <span className="text-xl md:text-2xl text-[#4F8EF7] font-medium">
                          {card.statLabel}
                        </span>
                      </div>
                    ) : (
                      <h3 className="font-headline text-2xl md:text-3xl font-bold leading-tight text-[#1A1A1A]">
                        {card.title}
                      </h3>
                    )}
                  </div>
                  <div className="flex-1" />
                  <p className="text-base leading-7 text-[#4a4a4a]">
                    {card.body}
                  </p>
                  {card.source && (
                    <div className="pt-2">
                      <span className="text-xs text-[#6B6B6B]/60 uppercase tracking-wider">
                        {card.source}
                      </span>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop - Square Cards (2 rows, centered with tiny gaps) */}
        <div className="hidden md:flex flex-col gap-4 w-full max-w-6xl mx-auto">
          {/* Row 1: Visibility Gap expanded by default (index 0) */}
          <div className="flex justify-center gap-2">
            {problemCards.slice(0, 3).map((card, index) => (
              <Card
                key={index}
                {...card}
                isExpanded={expandedRow1 === index}
                onMouseEnter={() => handleMouseEnterRow1(index)}
                onMouseLeave={handleMouseLeaveRow1}
              />
            ))}
          </div>
          {/* Row 2: 9M card (last card) expanded by default (index 2 = card at position 2 in row 2 = global index 5) */}
          <div className="flex justify-center gap-2">
            {problemCards.slice(3, 6).map((card, index) => (
              <Card
                key={index + 3}
                {...card}
                isExpanded={expandedRow2 === index}
                onMouseEnter={() => handleMouseEnterRow2(index)}
                onMouseLeave={handleMouseLeaveRow2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
