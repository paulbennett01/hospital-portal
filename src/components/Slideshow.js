import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons"; // ✅ Import the correct icons
import image2 from "../images/blood-test.webp"; 
import image3 from "../images/child-medicine.webp"; 
import image4 from "../images/preparing-for-surgery.webp"; 
import image5 from "../images/hospital-schooling.webp";

const Slideshow = () => {
  const slides = [
    {
      heading: "Getting Blood Taken",
      image: image2,
      explanation: "Taking blood, also known as a blood draw or venipuncture, is a simple procedure where a healthcare professional collects a small sample of your blood for testing.",
    },
    {
      heading: "Taking Your Medicine In Hospital",
      image: image3,
      explanation: "Taking medicine in the hospital helps you feel better and recover faster. Nurses and doctors make sure you get the right medicine at the right time.",
    },
    {
      heading: "Preparing For Surgery",
      image: image4,
      explanation: "Before surgery, doctors and nurses help you get ready to make sure everything goes smoothly. You’ll wear a hospital gown and a special cap, and the medical team will explain each step to keep you comfortable.",
    },
    {
      heading: "Home Schooling from Hospital",
      image: image5,
      explanation: "Even while staying in the hospital, children can continue learning through homeschooling. With a laptop or tablet, they can join online classes, complete assignments, and stay connected with their teachers and classmates.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container-explain">
      <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
          {slides[currentIndex].heading}
        </h2>

        <div className="slideshow-image">
          <div>
            <img
              src={slides[currentIndex].image}
              alt={`Slide ${currentIndex + 1}`}
              style={{ width: "100%", height: "50%", borderRadius: "8px" }}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px", fontSize: "18px" }}>
          <p>{slides[currentIndex].explanation}</p>
        </div>

        {/* ✅ Corrected Navigation Buttons */}
        <div>
          <button onClick={previousSlide} style={{ marginRight: "10px" }}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button onClick={nextSlide}>
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
