import React, { useEffect, useState, useContext } from "react";
import { getProductById } from "../../API/AdminAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";

const ViewProduct = () => {
  const { id } = useParams(); // Access the id parameter from the route
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        console.log(productData); // Add this line
        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);
  const { addToCart } = useContext(CartContext);
  // for authentication
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    if (!authentication) {
      window.location.href = "/";
    }
  }, []);
  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator while fetching the product
  }

  return (
    <div>
      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto">
          {/* image and text wrapper */}
          <div className="flex flex-col lg:flex-row items-center">
            {/* image */}
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img
                className="max-w-[200px] lg:max-w-xs"
                src={require("../../Assets/Images/" + product.image)}
                alt={product.productName}
              />
            </div>
            {/* text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {product.productName}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                ₱ {product.price}
              </div>
              <p className="mb-8">{product.description}</p>
              <button
                onClick={() => {
                  addToCart(product, product.productId);
                }}
                className="bg-black  py-4 px-8 text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProduct;
