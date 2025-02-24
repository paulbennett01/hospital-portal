import React, { useState, useEffect } from "react";
import image1 from "../images/x-ray.webp" // Importing images from the src folder
import image2 from "../images/blood-test.webp"; // Importing images from the src folder
import image3 from "../images/day-surgery.webp"; // Importing images from the src folder
import image4 from "../images/neurology.webp"; // Importing images from the src folder





const Slideshow = () => {
  // Array of images and explanations
  const slides = [
    {
      heading: "X-ray",
      image: image1, 
      explanation: "An X-ray is a type of imaging technique that uses a form of high-energy light (called radiation) to create pictures of the inside of your body.",
    },
    {
       heading: "Blood Tests",
        image: image2, 
        explanation: "Taking blood, also known as a blood draw or venipuncture, is a simple procedure where a healthcare professional collects a small sample of your blood for testing.",
      },
      {
        heading: "Day Surgery",
        image: image3, 
        explanation: "Surgery is a medical procedure in which a doctor (surgeon) uses special tools to treat or repair something inside your body.",
      },
      {
        heading: "Neurology",
        image: image4,
        explanation: "Height is typically measured using a stadiometer, where the patient stands straight with heels together, and a sliding headpiece is placed gently on top of the head.",
      }
  ];

  // State to keep track of the current slide
  const [currentIndex, setCurrentIndex] = useState(0);

// Moves to the next slide automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Slide changes every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to go to the previous slide
  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container-explain">
    <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>
      {/* Dynamic Heading */}
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
        {slides[currentIndex].heading}
      </h2>
  
      {/* Slideshow Image */}
      <div className="slideshow-image">
      <div>
        <img
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          style={{ width: "100%", height: "50%", borderRadius: "8px" }}
        />
      </div>
      </div>
  
      {/* Slide Explanation */}
      <div style={{ marginTop: "10px", fontSize: "18px" }}>
        <p>{slides[currentIndex].explanation}</p>
      </div>
  
      {/* Navigation Buttons */}
      <div>
        <button onClick={previousSlide} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <button onClick={nextSlide}> Next </button>
      </div>
        </div>
    </div>
  );
};
export default Slideshow;
