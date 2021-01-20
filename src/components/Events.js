

import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import './carouselstyle.css';

function Events() {
    return(
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                
                />
                <div className='mycaption'>
                <h3>Upcoming Workshop</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="holder.js/800x400?text=Second slide&bg=282c34"
               
                />

         
                <div className='mycaption'>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
               
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                
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
