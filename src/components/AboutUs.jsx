import { motion } from "framer-motion";
import React, { useState } from 'react';
import ChargingProcess from './ChargingProcess';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  const [showChargingProcess, setShowChargingProcess] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white text-black py-16 px-6 space-y-20">
        {/* Hero Section */}
        <motion.div
          className="text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-[#32CD32] mb-4">About ShareCharge ⚡</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            The future of EV charging at your fingertips! ShareCharge integrates all charging stations into a single, seamless platform.
          </p>
        </motion.div>

        {/* Section 1 */}
        <motion.div
          className="flex flex-col-reverse md:flex-row items-center md:gap-3"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2 space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold">Our Vision 🌿</h2>
            <p className="text-gray-700 text-sm md:text-base leading-snug">
            At ShareCharge, we envision a world where electric vehicle charging is no longer a hassle, but a seamless part of your journey. We're committed to revolutionizing the EV charging experience by making it more accessible, user-friendly, and environmentally conscious. Through our smart platform, users can effortlessly locate charging stations, reserve time slots, and complete payments — all in just a few taps. Our goal is to empower EV owners with the convenience they deserve while contributing to a cleaner, greener planet.

</p>
          </div>
          <img
            src="/images/EV2.jpg"
            alt="Vision"
            className="w-full md:w-[40%] rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Section 2 */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:gap-3"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/EV.jpg"
            alt="Network"
            className="w-full md:w-[40%] rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold">Unified Charging Network 🔌</h2>
            <p className="text-gray-700 text-sm md:text-base leading-snug">
            Imagine a world where every EV charging station — be it Shell, HP, Tata, or any other provider — is part of one powerful network. That’s the reality with ShareCharge. We've unified multiple charging providers under one seamless platform, eliminating the need to juggle between different apps. No more switching, no more stress — just smooth, uninterrupted charging wherever your journey takes you.            </p>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6 border rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-[#32CD32]">🔋 Fast Charging</h3>
            <p className="mt-2 text-gray-700">Find the fastest stations around you instantly.</p>
          </div>
          <div className="p-6 border rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-[#32CD32]">💳 Easy Payments</h3>
            <p className="mt-2 text-gray-700">Pay via UPI, cards, or net banking with a tap.</p>
          </div>
          <div className="p-6 border rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-[#32CD32]">🌍 Sustainability</h3>
            <p className="mt-2 text-gray-700">Your choice supports a greener planet.</p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#32CD32] mb-6">Meet Our Team 👨‍💻👩‍💻</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-10">
            A passionate group of developers, designers, and environmentalists working together to electrify the world — one charge at a time!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {[
              {
                name: "Shrirup Inamdar",
                role: "Frontend Developer",
                desc: "Bringing smooth UI/UX experiences with modern React and Tailwind magic.",
                img: "/images/shriiiii.jpg",
              },
              {
                name: "Yash Ahirrao",
                role: "Backend Architect",
                desc: "Crafting robust APIs and scalable databases to keep your charge flowing.",
                img: "/images/yashhhhh.jpg",
              },
              {
                name: "Dhanashree Patil",
                role: "Product Designer",
                desc: "Designing elegant, intuitive experiences for a frictionless EV journey.",
                img: "/images/shreeeeee.jpg",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 text-left border hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-black">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-6">What Our Users Say 💬</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Aarav K.",
                comment: "Booking chargers has never been this easy. ShareCharge changed my EV experience!",
                img: "/images/user1.jpg",
              },
              {
                name: "Riya S.",
                comment: "Love the design and speed of the app. It's like the Swiggy of EV stations!",
                img: "/images/user2.jpg",
              },
              {
                name: "Dev P.",
                comment: "I use this every day for my Ola EV. Saved me time and hassle.",
                img: "/images/user3.jpg",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white border rounded-xl p-6 text-left shadow-md hover:shadow-lg transition"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h4 className="font-semibold">{testimonial.name}</h4>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demo Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Experience Our Charging Process
          </h3>
          <button
            onClick={() => setShowChargingProcess(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#32CD32] hover:bg-[#2db82d] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try Demo Charging
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Charging Process Popup */}
      {showChargingProcess && (
        <ChargingProcess onClose={() => setShowChargingProcess(false)} />
      )}
    </>
  );
};

export default AboutUs;
