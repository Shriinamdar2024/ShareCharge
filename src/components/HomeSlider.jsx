import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion"; // For smoother animations

const slides = [
  {
    image: "/images/slider1.jpg",
    title: "Get ₹50 Cashback!",
    description: "Charge your EV today and get instant cashback on your first transaction.",
  },
  {
    image: "/images/slider2.jpg",
    title: "Fastest Charging Network",
    description: "Power up your ride in under 30 minutes at selected locations.",
  },
  {
    image: "/images/slider3.jpg",
    title: "Exclusive Membership",
    description: "Join ShareCharge+ and enjoy special discounts and priority access.",
  },
];

const HomeSlider = () => {
  return (
    <div className="w-full h-[600px] relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000 }}
        effect="fade"
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative group">
              
              {/* Image with Parallax Effect */}
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transition-all duration-1500 ease-out group-hover:scale-105 group-hover:rotate-6 filter blur-sm group-hover:blur-none"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2 }}
              />

              {/* Text with Sliding Animation */}
              <motion.div
                className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white p-6 max-w-lg"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.h2
                  className="text-5xl font-extrabold mb-4 tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                  whileHover={{ color: "#00c6ff" }}  // Hover effect on text
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  className="text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {slide.description}
                </motion.p>
              </motion.div>

              {/* Floating icon or micro-interaction on hover */}
              <div className="absolute top-10 right-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.svg
                  className="w-10 h-10 animate-bounce"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12l5 5L20 7"
                  />
                </motion.svg>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination with Hover Effects */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        <motion.div
          className="w-4 h-4 rounded-full bg-white opacity-70 hover:opacity-100 cursor-pointer"
          whileHover={{ scale: 1.5, rotate: 180, color: "#00c6ff" }}
          transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.div
          className="w-4 h-4 rounded-full bg-white opacity-70 hover:opacity-100 cursor-pointer"
          whileHover={{ scale: 1.5, rotate: 180, color: "#00c6ff" }}
          transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.div
          className="w-4 h-4 rounded-full bg-white opacity-70 hover:opacity-100 cursor-pointer"
          whileHover={{ scale: 1.5, rotate: 180, color: "#00c6ff" }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default HomeSlider;
  