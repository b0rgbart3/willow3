import React, {useEffect, useState} from "react";
import "../App.css";
import "./Slider.css";
import useProgress from "./useProgress";

// import right from "../assets/images/right.svg";
// import left from "../assets/images/left.svg";
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

let slideNumbers= slideObjects.map((slide, index) => {
  return index;
});

function Slider({direction}) {

  let SLIDEINTERVAL = 5000;



  let slideCount = slideObjects.length;
  const [width, setWidth] = useState(window.innerWidth);
  const [slideWidth, setSlideWidth] = useState(800);
  const [pos1, setPos1] = useState(window.innerWidth/2 - (slideWidth/2) - slideWidth);
  const [pos2, setPos2] = useState(window.innerWidth/2 - (slideWidth/2));
  const [pos3, setPos3] = useState(window.innerWidth/2 + (slideWidth/2));
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(true);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setPos2( width/2 -(slideWidth/2) );
    setPos1( width/2 - (slideWidth/2) - slideWidth);
    setPos3( width/2 + (slideWidth/2));
  };


  useEffect(
    () => {

      window.addEventListener('resize', handleResize);
      
      // Clean up our Event Listener
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
  );

  useEffect(
    () => {
      let timeout;
      if (playing) {
        timeout = setTimeout(() => {
        setSlide((slide + 1) % slideObjects.length);

        handleResize();
      }, SLIDEINTERVAL);
    }
      return() => clearTimeout(timeout);
     
    }, [ slide, playing ]
  )

  function toggle() {
    setPlaying(!playing);
  }
  function ProgressBar({animate, time}) {
    let progress = useProgress(animate, time);

    return (
      <div className="progressBar">
        <div style={{width: `${progress * 100}%`}} />
      </div>
    )

  }

  function Frames({animate, time}) {
    let progress = useProgress(animate, 1500);
    let distance, slidePos1, slidePos2, slidePos3;
    let opacity1, opacity2, opacity3;
    distance = pos3 - pos2;

    if (direction === "left") {

      slidePos3 = pos3 - (progress * distance);
      slidePos2 = pos2 - (progress * distance);
      slidePos1 = pos1 - (progress * distance);

      opacity3 = 1*progress;
      opacity2 = 1-progress;
      opacity1 = 0;

      if (slidePos3 <= pos2) {
        slidePos3 = pos3;
        slidePos2 = pos2;
        slidePos1 = pos1;
        opacity1 = 0;
        opacity2 = 1;
        opacity3 = 0;
        let x = slideNumbers.pop();
        slideNumbers.unshift(x);
      }
    } else {
      slidePos3 = pos3 + (progress * distance);
      slidePos2 = pos2 + (progress * distance);
      slidePos1 = pos1 + (progress * distance);
      opacity1 = progress;
      opacity2 = 1- (progress);
      opacity3 = 1- (progress);

      if (slidePos2 >= pos3) {
        slidePos3 = pos3;
        slidePos2 = pos2;
        slidePos1 = pos1;
        opacity1 = 0;
        opacity2 = 1;
        opacity3 = 0;
        let x = slideNumbers.shift();
        slideNumbers.push(x);
      }
    }

    return (<>

<div className='slide' style={{left: slidePos1, opacity: opacity1, width: slideWidth, backgroundImage:"url(assets/events/"+slideObjects[slideNumbers[0]].image+".jpg)"}} key="0">

</div>
<div className='slide' key="1" style={{left: slidePos2, opacity: opacity2, width: slideWidth, backgroundImage:"url(assets/events/"+slideObjects[slideNumbers[1]].image+".jpg)"}}>
<div className='slideInfo'>
  <div className='title'>{slideObjects[slide].title}</div>
  <div className='caption'>{slideObjects[slide].caption}</div>
  <div className='pill'>Learn More</div>
  </div>
</div>
<div className='slide' key="2" style={{left: slidePos3, opacity: opacity3, width: slideWidth, backgroundImage:"url(assets/events/"+slideObjects[slideNumbers[2]].image+".jpg)"}}>

</div>

       </>
    )

  }

  return (
    <>
  <div className="slideContainer group">
      {/* <ProgressBar key={slide + playing + 10} time={SLIDEINTERVAL} animate={playing} /> */}
  <div className="slides">{
    <Frames time={SLIDEINTERVAL} animate={playing} />
  }

  </div>
  <div className="jumpDots">
  </div>


  </div>
  <div className='playButton'>
  {playing? (
    <div onClick={toggle}>Pause</div>
  ) : (
    <div onClick={toggle}>Play</div>
  )}
  </div>
  </>
  );
}

export default Slider;
