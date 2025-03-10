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
      explanation: "A blood test is a quick and easy procedure. A nurse or doctor will gently take a tiny sample of your blood to check how healthy you are. They will use a tiny needle to collect the blood from your arm or finger, but don’t worry. it’s very quick and feels like a little pinch. You can sit still, take deep breaths, or even think about something fun while they do it. Afterwards, they might give you a small plaster or a fun sticker as a reward for being brave! If you're feeling a bit nervous, you can bring along your favorite toy or ask someone to hold your hand.",
    },
    {
      heading: "Taking Your Medicine In Hospital",
      image: image3,
      explanation: "Taking medicine in hospital helps you feel better quicker. The nurses and doctors will make sure you have the right medicine at the right time to ensure you feel better as soon as possible. The medicine may come as a drink, a tablet, or even through a small needle, but don’t worry—they will explain everything to you. If you have any questions, you can always ask!",
    },
    {
      heading: "Preparing For Surgery",
      image: image4,
      explanation: "Before an operation, the doctors and nurses will help you get ready to make sure everything goes smoothly. You’ll wear a comfy hospital gown just like the nurses! The doctors and nurses will explain everything to you so you know what to expect. They’ll make sure you feel safe and comfortable. If you have any questions or feel a bit nervous, Feel free to ask us!  Before your operation, you might not be able to eat or drink for a little while. This is called fasting. It helps keep your tummy empty so the doctors can do their job safely. Don’t worry, the nurses will tell you when you can have something to eat again afterwards! The doctors will give you some special medicine to help you relax or fall asleep so you don’t feel anything during the operation. When you wake up, the doctors and nurses will be there to take care of you.",
    },
    {
      heading: "Schooling from Hospital",
      image: image5,
      explanation: "Whilst staying in hospital, You can still school online with a laptop or tablet. You can join online classes, complete work, and stay connected with your teachers and classmates.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 100000000000); 

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
        <h2 className="heading-medical" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
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

        <div className="explaination" style={{ marginTop: "10px", fontSize: "18px" }}>
          <p>{slides[currentIndex].explanation}</p>
        </div>

        {/* ✅ Corrected Navigation Buttons */}
        <div>
          <button onClick={previousSlide} className="backwards" style={{ marginRight: "10px" }}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button onClick={nextSlide} className="forwards">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
