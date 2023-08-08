import React from "react";

const Partners= () => {

    return (
      <div className="bg-white py-5 sm:py-32 mb-0 " >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h3 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s best brands for athletes
          </h3>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={require("./../Assets/Images/Home/Spalding_logo.png")}
              alt="Spalding Logo"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 scale-150"
              src={require("./../Assets/Images/Home/adidas-logo.png")}
              alt="Reform"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 scale-150"
              src={require("./../Assets/Images/Home/nike-logo.png")}
              alt="Tuple"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 scale-125"
              src={require("./../Assets/Images/Home/jordan-logo.png")}
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 scale-110"
              src={require("./../Assets/Images/Home/underarmor-logo.png")}
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>
    )
  }
  export default Partners;
  