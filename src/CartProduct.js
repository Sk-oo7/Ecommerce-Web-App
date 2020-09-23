import React from "react";
import "./CartProduct.css";
import Button from "react-bootstrap/Button";
import { useStateValue } from "./StateProvider";
import { BorderBottom } from "@material-ui/icons";

function CartProduct({ id, title, pic, price, rating }) {
  const [{ Cart }, dispach] = useStateValue();

  const removeFromCart = () => {
    dispach({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };
  return (
    <div
      className="cartProduct-card"
      style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        marginBottom: "20px",
      }}
    >
      <div style={{ margin: "20px 20px 20px 20px" }}>
        <img className="ProductItem_img" src={pic} width="200"></img>
      </div>
      <div
        className="product_details"
        style={{ margin: "20px 20px 20px 20px" }}
      >
        <div className="ProductItem_title">{title}</div>
        <div className="ProductItem_price">
          ₹<strong className="price">{price}</strong>
        </div>
        <div className="ProductItem_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <span role="img" aria-label="ratingStar">
                  ⭐
                </span>
              </p>
            ))}
        </div>
        <Button variant="danger" onClick={removeFromCart}>
          Remove from Cart
        </Button>
      </div>
    </div>

    // <Card
    //   className="cartProduct-card"
    //   style={{
    //     width: "200px",
    //     margin: "20px 20px 20px 20px",
    //   }}
    // >
    //   <Card.Img className="ProductItem_img" src={pic} />
    //   <Card.Body>
    //     <Card.Title className="ProductItem_title">{title}</Card.Title>
    //     <Card.Text>
    //       <div className="ProductItem_price">
    //         ₹<strong className="price">{price}</strong>
    //       </div>
    //       <div className="ProductItem_rating">
    //         {Array(rating)
    //           .fill()
    //           .map((_, i) => (
    //             <p>
    //               <span role="img" aria-label="ratingStar">
    //                 ⭐
    //               </span>
    //             </p>
    //           ))}
    //       </div>
    //     </Card.Text>

    //     <Button variant="danger" onClick={removeFromCart}>
    //       Remove from Cart
    //     </Button>
    //   </Card.Body>
    // </Card>
  );
}

export default CartProduct;
