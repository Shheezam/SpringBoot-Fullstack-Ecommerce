import React from "react";

const FeatureProduct= () => {
    const featureproduct = [
        { name: 'Origin', description: 'Michael Jordan and Nike first collaborated on the 1985 release of the Air Jordan 1, a kind of basketball shoes. ' },
        { name: 'Material', description: 'Constructed with a combination of premium materials such as leather and suede.' },
        { name: 'Dimensions', description: 'Standard sneaker size range, available in various sizes for both men and women."' },
        { name: 'Finish', description: 'It features clean lines, precise stitching, and well-executed overlays, resulting in a polished and visually appealing shoe design.' },
        { name: 'Includes', description: 'Additional items such as extra shoelaces, special packaging, or collaboration-specific accessories.' },
        { name: 'Considerations', description: 'To maximize the versatility of its design, take into account your intended usage and personal preferences.' },
      ]
    return (
        <>
         <div className="bg-white px-4 text-black">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 py-5">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Specifications</h2>
          <p className="mt-4 text-black-900">
          The <b>Air Jordan 1</b> is a popular basketball shoe model developed by Nike in collaboration with basketball legend <i>Michael Jordan</i>. 
          The shoe combines style, performance, and innovation to deliver a high-quality athletic footwear experience.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {featureproduct.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-xl text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-medium text-gray-900">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={require("./../Assets/Images/Home/product-specs-4.jpg")}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
           src={require("./../Assets/Images/Home/product-specs-3.jpg")}
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={require("./../Assets/Images/Home/product-specs-2.jpg")}
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={require("./../Assets/Images/Home/product-specs-1.jpg")}
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
    </>
  );
};
export default FeatureProduct;
    