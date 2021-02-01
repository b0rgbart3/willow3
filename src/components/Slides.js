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
      title: "Upcoming Workshop",
      caption: "Lorem ipsum datum filum. This is a short description of the workshop including some details like where and when it will take place - but not the full details.",
      image: "butterflies",
    },
    {
      title: "Exciting New WAF Class",
      caption: "Lorem ipsum datum filum. This is a short description of the workshop including some details like where and when it will take place - but not the full details.",
      image: "butterflies",
    },
    {
      title: "Extra Special Event",
      caption: "Lorem ipsum datum filum. This is a short description of the workshop including some details like where and when it will take place - but not the full details.",
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
    setPlaying(false);
    setSlideStyle( { opacity: 0, backgroundImage: "url(" + slideImages[(slideNumber) % slideObjects.length] + ")" });
    let nextTimer = setTimeout(() => {
      setSlideNumber( (slideNumber + 1) % slideObjects.length );
      setSlideStyle( {  opacity:.5, backgroundImage: "url(" + slideImages[(slideNumber+1) % slideObjects.length] + ")"} );
      clearTimeout(nextTimer);

      setSlideStyle( {  opacity:.0, backgroundImage: "url(" + slideImages[(slideNumber+1) % slideObjects.length] + ")"} );
      let nextTimer2 = setTimeout(() => {
        setSlideStyle( { opacity:1, backgroundImage: "url(" + slideImages[(slideNumber+1) % slideObjects.length] + ")"} );
        clearTimeout(nextTimer2);
      },10);

    }, 600);


  }
  function prev() {
    setSlideNumber( (slideNumber -1  + slideObjects.length) % slideObjects.length );
    setSlideStyle( { opacity: 1, backgroundImage: "url(" + slideImages[(slideNumber-1 + slideObjects.length)% slideObjects.length] + ")"} );
        setPlaying(false);
  }

  function jumpTo(index) {
    setSlideNumber( index );
    setSlideStyle({ opacity: 1, backgroundImage:"url("+slideImages[index]+")"});
    setPlaying(false);
  }

  function frames() {

    return (
          <div key={slideNumber} style={slideStyle} className='slide'>
          <div className='caption'>
          <h1>{slideObjects[slideNumber].title}</h1>
          <p>{slideObjects[slideNumber].caption}</p>
          <div className='join'> Learn more</div>
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
        index === slideNumber ? 
        <div className='jumpDot current' key={index} ></div> :
        <div className='jumpDot' key={index} onClick={()=>jumpTo(index)}></div>       ))}
     
      </div>
  </div>
  </div>);
}

export default Slides;
