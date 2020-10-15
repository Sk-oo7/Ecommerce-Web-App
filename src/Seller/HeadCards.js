import React, { useEffect, useState } from 'react'
import { Card, Carousel } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format';

function HeadCards({totalSum,nProducts,nOrders,growth}) {
    const[total,setTotal]=useState(0);
    const[products,setProducts]=useState(0);
    const[orders,setOrders]=useState(0);
    const[Growth,setGrowth]=useState(0);

    useEffect(()=>{
       setOrders(nOrders);
       setProducts(nProducts);
       setTotal(totalSum);
       setGrowth(growth)
    },[totalSum,nProducts,nOrders,growth])

    const responsive = {
        desktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 4,
          slidesToSlide: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1,
        },
      };
    return (
        <div>
            <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        controls={false}
        indicators={false}
        containerClass="carousel-container"
        autoPlay={false}
        arrows={false}
      >
        
        <div className="div_product_carousel"><div className="div_product_carousel">
        <Card 
            className="mb-2 card"
            style={{width:"15vw"}}
        >
        <Card.Body>
    <center><h3><CurrencyFormat
                            renderText={(value) => (
                                <div>{value}</div>
                                
                            )}
                            decimalScale={2}
                            value={total}
                            displayType={"text"}
                            thousandSpacing={"2s"}
                            thousandSeparator={true}
                            prefix={"₹"}
                            /></h3></center>
        </Card.Body>
        <Card.Footer style={{backgroundColor:"#52BE80"}}><h5>Total Sale (till date)</h5></Card.Footer>
        </Card>
        </div>

        <div className="div_product_carousel">
        <Card 
            className="mb-2"
            style={{width:"15vw"}}
        >
        
        <Card.Body>
        <center><h3>{products}</h3></center>
        </Card.Body>
        <Card.Footer style={{backgroundColor:"#BB8FCE"}}><h5>Total Product(s)</h5></Card.Footer>
        </Card>
        </div>

        <div className="div_product_carousel">
        <Card 
            className="mb-2"
            style={{width:"15vw"}}
        >
        
        <Card.Body>
        <center><h3>{orders}</h3></center>
        </Card.Body>
        <Card.Footer style={{backgroundColor:"#F8C471"}}><h5>Total Order(s)</h5></Card.Footer>
        </Card>
        </div>
        
        <div className="div_product_carousel">
        <Card 
            className="mb-2"
            style={{width:"15vw"}}
        >
        
        <Card.Body>
        <center><h3>{Growth>0? `+${Growth}%`: Growth}</h3></center>
        </Card.Body>
        <Card.Footer style={{backgroundColor:"#EC7063"}}><h5>Yearly Growth</h5></Card.Footer>
        </Card>
        </div></div>
        
        
      </Carousel>
        </div>
    )
}

export default HeadCards
