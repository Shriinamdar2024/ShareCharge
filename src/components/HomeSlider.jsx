import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
    <div className="w-full h-[500px] relative m-0 p-0">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000 }}
        effect="fade"
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-black/60 text-white p-6 rounded-2xl max-w-md shadow-lg backdrop-blur">
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
