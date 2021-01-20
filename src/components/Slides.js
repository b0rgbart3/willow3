import React, {useEffect, useState} from "react";
import "./slides.css";
import right from "../assets/images/right.svg";
import left from "../assets/images/left.svg";
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
  const SLIDE_DURATION = 7000;

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
          next();
        
    }, SLIDE_DURATION );
    return () => clearTimeout(slideTimer);
  }
  
}, [slideNumber, playing, slideCount]);

  function next() {
    setSlideNumber( (slideNumber + 1) % slideObjects.length );
    setSlideStyle( { backgroundImage: "url(" + slideImages[(slideNumber+1) % slideObjects.length] + ")"} );
    setPlaying(false);
  }
  function prev() {
    setSlideNumber( (slideNumber -1  + slideObjects.length) % slideObjects.length );
    setSlideStyle( { backgroundImage: "url(" + slideImages[(slideNumber-1 + slideObjects.length)% slideObjects.length] + ")"} );
        setPlaying(false);
  }

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
      <div className="arrow left" onClick={prev}><img src={left}/></div>
      <div className="arrow right" onClick={next}><img src={right}/> </div>
      <div className="jumpDots">
      { slideObjects.map((slide,index) => (
        <div className='jumpDot' key={index}></div>
      ))}
     
      </div>
  </div>
  </div>);
}

export default Slides;
