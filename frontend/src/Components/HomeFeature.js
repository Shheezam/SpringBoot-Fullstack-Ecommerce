import React from "react";
import { Link } from "react-router-dom";



const HomeFeature= () => {
    return (
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Where Hoops Meet Style:
              </h1>
              <br></br>
              <h1 className="text-1xl font-bold tracking-tight text-gray-900 sm:text-2xl"  >
                Elevate Your Game and Wardrobe!
              </h1>
              <p className="mt-4 text-xl text-gray-500">
              Experience the passion and excitement of basketball with our store. 
              Step up your game, express your love for the sport, and gear up in style. 
              Visit us today and embark on an extraordinary basketball journey with us.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src={require("./../Assets/Images/Home/jordan-shoes.jpg")}
                            alt="Jordan Shoes"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={require("./../Assets/Images/Home/shoes.jpg")}
                            alt="Jordan Shoes"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={require("./../Assets/Images/Home/basketball-ball.jpg")}
                            alt="Basketball Ball"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={require("./../Assets/Images/Home/board-ring.jpg")}
                            alt="Ring and Board"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={require("./../Assets/Images/Home/kobe-jersey.jpg")}
                            alt="Kobe Jersey"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={require("./../Assets/Images/Home/more-balls.jpg")}
                            alt="Sample Balls"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={require("./../Assets/Images/Home/nba-socks.jpg")}
                            alt="NBA Sample Socks"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <Link to={"/user/products"}
                  className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-gray-800 mb-10"
                >
                  Our Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default HomeFeature;
  