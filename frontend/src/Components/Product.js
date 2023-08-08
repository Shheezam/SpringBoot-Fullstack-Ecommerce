import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { CartContext } from "../Contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { productId, image, category, title, price } = product;

  return (
    <div className="group">
      <div className="border border-[#e4e4e4]  h-[300px] mb-4 relative overflow-hidden transition duration-300">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Link to={`/user/viewProduct/${p.productId}`}>
              <img
                className="max-h-[160px] transition duration-300  group-hover:scale-110 "
                src={require("./../Assets/Images/" + image)}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="absolute top-6 -right-11 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:right-5">
          <button
            onClick={() => {
              addToCart(product, product.productId);
            }}
          >
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
        </div>
      </div>
      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${productId}`}>
          <h2 className="font-semibold mb-1 hover:text-blue-500">{title}</h2>
        </Link>
        <h2 className="font-semibold">$ {price}</h2>
      </div>
    </div>
  );
};

export default Product;
