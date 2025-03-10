import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import image1 from "../images/going-to-the-xray-department.webp"; 
import image2 from "../images/going-to-the-neurology-department.webp"; 
import image3 from "../images/going-to-the-day-surgery-department.webp"; 
import image4 from "../images/going-to-the-mri-department.webp";

const Departments = () => {
  const DepartmentsSlides = [
    {
      id: 1,
      name: "X-Ray",
      image: image1,
      details:
        "The X-Ray Department is a special place where doctors use amazing machines to take pictures of the inside of your body. These pictures help the doctors see your bones, muscles, and other important parts to figure out what’s making you feel unwell or if you’ve had an injury, like a broken bone. Don’t worry—it’s super quick and doesn’t hurt at all! You’ll stand still or lie down for a moment while the machine takes the picture, kind of like a big camera. It helps the doctors understand what’s happening so they can take the best care of you and help you feel better.",
      doctor: "Doctor Smith",
      nurse: "Nurse Pratchett",
    },
    {
      id: 2,
      name: "Neurology",
      image: image2,
      details:
        "The Neurology Department is a special place where doctors and nurses help kids who have problems with their brain, nerves, or muscles. Your brain is like a supercomputer that controls your body, helping you think, move, and feel. Sometimes, the brain or nerves don’t work the way they should, and that’s when we step in to help. The doctors here are experts in finding out what’s going on and how to make you feel better. They use special tools, ask lots of questions, and may even show you cool pictures of your brain! Our job is to help you stay healthy and strong so you can keep learning, playing, and having fun.",
      doctor: "Doctor Jones",
      nurse: "Nurse Stevenson",
    },
    {
      id: 3,
      name: "Day Surgery",
      image: image3,
      details:
        "The Day Surgery Department is a special place where kids come to have small medical procedures and then go home on the same day! Our friendly doctors and nurses make sure you feel comfortable and safe before, during, and after your surgery. They use special tools and gentle medicine to help you feel relaxed. You might get to wear a cool hospital gown, and after your procedure, you’ll have time to rest before going home. Our goal is to take great care of you so you can get back to playing and having fun as soon as possible!",
      doctor: "Doctor Andrews",
      nurse: "Nurse Williams",
    },
    {
      id: 4,
      name: "MRI Department",
      image: image4,
      details:
        "The MRI Department is a special place where doctors use a big camera called an MRI machine to take detailed pictures of the inside of your body! It helps them understand how your muscles, bones, and organs are doing. The MRI machine looks like a big tunnel, and you’ll lie on a comfy bed that slowly moves inside. Don’t worry—it doesn’t hurt at all! The machine makes some loud sounds, so you might wear special headphones or listen to music. Our friendly doctors and nurses will be there to explain everything and make sure you feel safe and comfortable. After the scan, you can go back to your day just like normal!",
      doctor: "Doctor Martinez",
      nurse: "Nurse Thompson",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === DepartmentsSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? DepartmentsSlides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === DepartmentsSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="departments-slideshow">
    <div className="department-name">
      <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
          {DepartmentsSlides[currentIndex].name}
        </h2>

        <div className="slideshow-image">
          <div>
            <img
              src={DepartmentsSlides[currentIndex].image}
              alt={`Slide ${currentIndex + 1}`}
              style={{ width: "100%", height: "50%", borderRadius: "8px" }}
            />
          </div>
        </div>

        <p className="dept-details">{DepartmentsSlides[currentIndex].details}</p>

        <div className="doctor">
          <h3><strong>Doctor:</strong> {DepartmentsSlides[currentIndex].doctor}</h3>
        </div>

        <div className="nurse">
          <h3><strong>Nurse:</strong> {DepartmentsSlides[currentIndex].nurse}</h3>
        </div>

        {/* Navigation Buttons */}
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
  </div>
  );
};

export default Departments;
