import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../Contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount, userCart } =
    useContext(CartContext);

  // destructure item
  const { productId, productName, image, price } = item;
  const [cart, setCart] = useState([]);

  const filterCart = (productId) => {
    setCart(
      userCart.filter((cart) => {
        if (cart.productId === productId) {
          return cart;
        }
      })
    );
  };

  useEffect(() => {
    filterCart(productId);
  }, []);
  const handleIncreaseQuantity = (productId) => {
    increaseAmount(productId);
  };

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[250px] flex items-center gap-x-4">
        {/* image */}
        <Link to={`/user/viewProduct/${productId}`}>
          <img
            className="max-w-[200px]"
            src={require("./../Assets/Images/" + image)}
            alt=""
          />
        </Link>
        <div className="w-full flex flex-col">
          {/* title and remove icon */}
          <div className="flex justify-between mb-2">
            {/* title */}
            <Link
              to={`/user/viewProduct/${productId}`}
              className="text-sm uppercase max-w-[240px] text-black  hover:underline"
            >
              {productName}
            </Link>
            {/* remove icon */}
            <div
              onClick={() => removeFromCart(productId)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* quantity */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border  text-black font-medium">
              <div
                onClick={() => decreaseAmount(productId)}
                className="h-full flex-1 flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {cart[0]?.quantity}
              </div>
              <div
                onClick={() => handleIncreaseQuantity(productId)}
                className="h-full flex flex-1 justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item price */}
            <div className="flex flex-1 justify-around items-center font-thin ">
              ₱{" "}
              {price
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            {/* final price */}
            <div className="flex flex-1 justify-end items-center  text-black">{`₱ ${parseFloat(
              price * cart[0]?.quantity
            )
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
