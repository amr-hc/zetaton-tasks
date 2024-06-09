import React from "react";
import Carousel from 'react-bootstrap/Carousel';


export default function Home() {
  return (
    <Carousel className="my-2">
    <Carousel.Item>
      <img src='https://artgallery.yale.edu/sites/default/files/styles/hero_small/public/2023-01/ag-doc-2281-0036-pub.jpg?h=147a4df9&itok=uclO7OrF' alt="First slide" style={{width: '100%', height: '550px'}} />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src='https://www.hull.ac.uk/choose-hull/study-at-hull/library/section-elements/img/gallery/university-of-hull-gallery-2.jpg' alt="First slide" style={{width: '100%', height: '550px'}}/>
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src='https://www.ci.brea.ca.us/ImageRepository/Document?documentID=12501' alt="First slide" style={{width: '100%', height: '550px'}} />
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  );
}
