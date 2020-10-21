import React from "react";

interface cartProps {
  match: { params: { id: string } };
}

const CartPage: React.FC<cartProps> = ({ match }) => {
  return <section>Cart!</section>;
};

export default CartPage;
