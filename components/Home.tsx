"use client";

import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import About from "./About";
import Achievements from "./Achievements";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import PersonalProjects from "./PersonalProjects";
import ProjectCarousel from "./ProjectCarousel";
import Projects from "./Projects";
import Skills from "./Skills";

const Testimonials = dynamic(() => import("./Testimonials"));
const HireMe = dynamic(() => import("./HireMe"));
const BuyMeCoffee = dynamic(() => import("./BuyMeCoffee"));

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      sectionRefs.current.forEach((ref, index) => {
        if (
          ref &&
          ref.offsetTop <= scrollPosition &&
          ref.offsetTop + ref.offsetHeight > scrollPosition
        ) {
          setActiveSection(ref.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white"
    >
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="absolute inset-0 top-52 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-20"
        >
          <source src="/rand.mp4" type="video/mp4" />
        </video>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="relative z-10"
        >
          <Hero ref={(el) => (sectionRefs.current[0] = el)} />
          <About ref={(el) => (sectionRefs.current[1] = el)} />
          <Experience ref={(el) => (sectionRefs.current[2] = el)} />
          <Skills ref={(el) => (sectionRefs.current[3] = el)} />
          <ProjectCarousel ref={(el) => (sectionRefs.current[4] = el)} />
          <Projects ref={(el) => (sectionRefs.current[5] = el)} />
          <PersonalProjects ref={(el) => (sectionRefs.current[6] = el)} />
          <Education ref={(el) => (sectionRefs.current[7] = el)} />
          <Achievements ref={(el) => (sectionRefs.current[8] = el)} />
          <Testimonials ref={(el) => (sectionRefs.current[9] = el)} />
          <HireMe ref={(el) => (sectionRefs.current[10] = el)} />
          <Contact ref={(el) => (sectionRefs.current[11] = el)} />
          <Footer />
        </motion.div>
      </AnimatePresence>
      <BuyMeCoffee />
    </motion.main>
  );
}
