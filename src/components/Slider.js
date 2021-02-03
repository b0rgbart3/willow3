import React, {useEffect, useState} from "react";
import "./Slider.css";
import right from "../assets/images/right.svg";
import left from "../assets/images/left.svg";

function Slider() {

  let slideObjects = [
    {
      title: "Upcoming Workshop",
      caption: "Lorem ipsum datum filum. This is a short description of the workshop including some details like where and when it will take place - but not the full details.",
      image: "moths",
    },
    {
      title: "Exciting New WAF Class",
      caption: "Lorem ipsum datum filum. This is a short description of the workshop including some details like where and when it will take place - but not the full details.",
      image: "butterflies",
    },
    {
      title: "Extra Special Event",
      caption: "Lorem ipsum datum filum. This is a short description of the workshop including some details like where and when it will take place - but not the full details.",
      image: "stones",
    },
    
  ];

  const [playing, setPlaying] = useState(true);
  const slideCount = slideObjects.length;
  const [slideNumber, setSlideNumber] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [prevSlide, setPrevSlide] = useState(2);

  const [slideRotation, setSlideRotation] = useState(0);
  const [slideAPos, setSlideAPos] = useState("pos2");
  const [slideCPos, setSlideCPos] = useState("pos1");
  const [slideBPos, setSlideBPos] = useState("pos2");
  const SLIDE_DURATION = 2000;


  useEffect(
    () => {
    if (playing) {
      let slideTimer = setTimeout(() => {
        if (playing) {
          next();
        }
    }, SLIDE_DURATION );
    return () => clearTimeout(slideTimer);
  }
  
}, [slideNumber, nextSlide, slideCPos, slideAPos, slideRotation]);


function slide() {
  setSlideNumber( (slideNumber + 1) % slideCount );
  setNextSlide( (nextSlide + 1) % slideCount );
  setPrevSlide( (prevSlide + 1) % slideCount );
}

function smoothSlide() {
    // toggle SlideAPos
    if (slideAPos == "pos2") {
      setSlideAPos("pos3 slider faint");
    } else {
      setSlideAPos("pos2");
    }

    // toggle SlideCPos
    if (slideCPos == "pos1") {
      setSlideCPos("pos2 slider");
    } else {
      setSlideCPos("pos1");
    }

}

  function next() {
    let newRotation = slideRotation + 1;
    if (newRotation > 1) {
      newRotation = 0;
    }
    setSlideRotation(newRotation);

    if (slideRotation == 1) {
      slide();
    }

    smoothSlide();
       

  }
  function goLeft() {
      setPlaying( false );
      slide();
  }
  function goRight() {
    setPlaying( false );
}

  function jumpTo(index) {

  }

  function frames() {
    
    // style={{backgroundImage:"url(assets/events/"+slideObjects[prevNumber].image+".jpg)"}}

    return (<><div key={0} className={'slide slideA ' + slideAPos} 
         style={{backgroundImage:"url(assets/events/"+slideObjects[slideNumber].image+".jpg)"}}
         >L</div>
         <div key={2} className={'slide slideC ' + slideCPos}
          style={{backgroundImage:"url(assets/events/"+slideObjects[nextSlide].image+".jpg)"}}
           >R</div>
       </>
    )

  }

  return (
  <div className="slideContainer group">
  <div className="slides">{frames()}<div className="arrow left" onClick={goRight}><img src={left}/></div>
      <div className="arrow right" onClick={goLeft}><img src={right}/> </div>
      <div className="jumpDots">
      { slideObjects.map((slide,index) => (
        index === slideNumber ? 
        <div className='jumpDot current' key={index} ></div> :
        <div className='jumpDot' key={index} onClick={()=>jumpTo(index)}></div>       ))}
     
      </div>

  </div>
  </div>
  );
}

export default Slider;
