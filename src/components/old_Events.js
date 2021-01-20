

import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import './carouselstyle.css';
import butterflies from "../assets/events/butterflies.jpg";

function Events() {
    return(
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100 slideImage"
                src={butterflies}
                
                />
                <div className='mycaption'>
                <h3>Upcoming Workshop</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100 slideImage"
                src={butterflies}
               
                />

         
                <div className='mycaption'>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
               
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100 slideImage"
                src={butterflies}
                
                />

                <div className='mycaption'>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default Events;
