import React from "react";
import Carousel from 'react-bootstrap/Carousel';


export default function Home() {
  return (
    <Carousel className="my-2">
    <Carousel.Item>
      <img src='https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2021_07/3451045/210218-product-of-the-year-2x1-cs.jpg' alt="First slide" style={{width: '100%', height: '550px'}} />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src='https://assets.bonappetit.com/photos/63e6c29840953eab0f1ffca3/16:9/w_3488,h_1962,c_limit/Best_cleaning_products.jpg' alt="First slide" style={{width: '100%', height: '550px'}}/>
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src='https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj' alt="First slide" style={{width: '100%', height: '550px'}} />
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
