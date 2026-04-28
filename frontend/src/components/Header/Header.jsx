import { useState, useEffect } from "react";
import "./Header.css";

// Slide data
const slides = [
  {
    title: "Fresh from Farm to Doorstep",
    text: "Experience nature's freshness delivered to your home — directly from trusted local farmers.",
    btnText: "Explore Now",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920&h=800&fit=crop&q=80",
    badge: "100% Organic",
    color: "#10b981",
  },
  {
    title: "Organic & Healthy Choices",
    text: "Choose the best organic produce for your family's health.",
    btnText: "Shop Now",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=800&fit=crop&q=80",
    badge: "Fresh Daily",
    color: "#f59e0b",
  },
  {
    title: "Daily Fresh Deliveries",
    text: "Get fresh fruits, vegetables, and groceries delivered every day.",
    btnText: "Start Shopping",
    img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1920&h=800&fit=crop&q=80",
    badge: "Fast Delivery",
    color: "#ef4444",
  },
];

export default function HeaderSlider() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === active) return;
    setIsAnimating(true);
    setActive(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-slider">
      <div className="header-slide-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`header-slide ${index === active ? "active" : ""}`}
          >
            <img src={slide.img} alt={slide.title} />
            <div className="header-slide-content">
              <div
                className="header-slide-badge"
                style={{
                  background: slide.color + "40",
                  borderColor: slide.color + "60",
                }}
              >
                {slide.badge}
              </div>
              <h1 className="header-slide-title">{slide.title}</h1>
              <p className="header-slide-text">{slide.text}</p>
              <button
                className="header-slide-button"
                style={{
                  background: `linear-gradient(135deg, ${slide.color} 0%, ${slide.color}dd 100%)`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="header-nav-button prev"
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        className="header-nav-button next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="header-dots-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`header-dot ${index === active ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
