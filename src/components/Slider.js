import React, {useEffect, useState} from "react";
import "../App.css";
import "./Slider.css";
import useProgress from "./useProgress";

// import right from "../assets/images/right.svg";
// import left from "../assets/images/left.svg";

function Slider({direction}) {

  let SLIDEINTERVAL = 5000;

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
  // decrease the slide counter -- and cycle through
  // (currentIndex -1 + slides.length) % slides.length
  // increase:
  // (currentIndex + 1) % slides.length;

  //const [playing, setPlaying] = useState(true);
  const slideCount = slideObjects.length;
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

  // function useMedia(query) {
  //   let [matches, setMatches] = useState(
  //     window.matchMedia(query).matches
  //   )

  //   // like CDupdate and CDMount
  //   useEffect(()=> {
  //     let media = window.matchMedia(this.props.query);
  //     if (media.matches !== matches) {
  //       setMatches( media.matches );
  //     }
  //     let listener = () => setMatches(media.matches);
  //     media.addListener(listener);
  //     return () =>
  //       media.removeListener(listener);
  //   }, [ query ]) 

  //   return matches
  // }

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
        console.log(slide);
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

  function frames() {
    // let small = useMedia("(max-width: 400px)")
    // let large = useMedia("(min-width: 800px)")
    
    //console.log(slideObjects);
    // Output all the slides in a horizontal row
    return (<>

<div className='slide' style={{left: pos1, width: slideWidth, backgroundImage:"url(assets/events/"+slideObjects[0].image+".jpg)"}} key="0">

</div>
<div className='slide' key="1" style={{left: pos2, width: slideWidth, backgroundImage:"url(assets/events/"+slideObjects[1].image+".jpg)"}}>
<div className='slideInfo'>
  <div className='title'>{slideObjects[slide].title}</div>
  <div className='caption'>{slideObjects[slide].caption}</div>
  <div className='pill'>Learn More</div>
  </div>
</div>
<div className='slide' key="2" style={{left: pos3, width: slideWidth, backgroundImage:"url(assets/events/"+slideObjects[2].image+".jpg)"}}>

</div>

       </>
    )

  }

  return (
    <>
  <div className="slideContainer group">
      <ProgressBar key={slide + playing + 10} time={SLIDEINTERVAL} animate={playing} />
  <div className="slides">{frames()}

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
