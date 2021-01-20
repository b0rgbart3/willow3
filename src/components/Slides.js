import React, {useEffect, useState} from "react";
import "./slides.css";
import butterflies from "../assets/events/butterflies.jpg";
import moths from "../assets/events/moths.jpg";
import dragons from "../assets/events/dragons.jpg";

function Slides() {
  let slideImages = [butterflies,moths,dragons];

  let slideObjects = [
    {
      title: "Upcoming Workshop 1",
      caption: "Lorem ipsum datum filum",
      image: "butterflies",
    },
    {
      title: "Upcoming Workshop 2",
      caption: "Lorem ipsum datum filum",
      image: "butterflies",
    },
    {
      title: "Upcoming Workshop 3",
      caption: "Lorem ipsum datum filum",
      image: "butterflies",
    },
  ];

  const [playing, setPlaying] = useState(true);
  const slideCount = slideObjects.length;
  const [slideNumber, setSlideNumber] = useState(0);
  const [slideStyle, setSlideStyle] = 
    useState({ backgroundImage: "url(" + slideImages[0] + ")"});
  const SLIDE_DURATION = 3000;

  useEffect(
    () => {
    if (playing) {
       // console.log(slideCount);
      let slideTimer = setTimeout(() => {
        console.log("slide Number: ", slideNumber);

          // Computer science trick from Ryan Florence
          // that automatically starts over at zero if
          // we get to the end of our list (using math 
          // instead of a condition.... yay!)
          let newSlide = (slideNumber + 1) % slideCount
        setSlideNumber( newSlide );
        setSlideStyle( {
          backgroundImage: "url(" + slideImages[newSlide] + ")",
        });
        
    }, SLIDE_DURATION );
    return () => clearTimeout(slideTimer);
  }
  
}, [slideNumber, playing, slideCount]);

  function frames() {

    // return slideObjects.map((slide, index) => (
    //   <div key={index} style={slideStyle} className='slide'>
    //       <div className='caption'>
    //           <h1>{slideObjects}</h1>
    //           <p>Caption text here, lorem ipusm data filum.</p>
    //       </div>
    //   </div>
    // ));
    return (
          <div key={slideNumber} style={slideStyle} className='slide'>
          <div className='caption'>
          <h1>{slideObjects[slideNumber].title}</h1>
          <p>{slideObjects[slideNumber].caption}</p>
          </div>
          </div>
    )
  }

  return (<div className="slides">{frames()}
  <div className="slideNav">
      <div className="leftArrow"> x </div>
      <div className="rightArrow"> x </div>
      <div className="jumpDots">
          <div className="jumpDot">x</div>
          <div className="jumpDot">x</div>
          <div className="jumpDot">x</div>
      </div>
  </div>
  </div>);
}

export default Slides;
