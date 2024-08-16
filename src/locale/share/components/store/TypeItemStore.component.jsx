import React from "react";

const TypeItemStore = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-16 mb-36">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full rounded-lg cursor-pointer hover:opacity-80"
          src={`image/top-bg-game/egs-sales-specials-breaker-1280x721-8d81919a48e5.jpg`}
          alt="Sales Banner"
        />
        <div className="pt-4">
          <div className="font-medium text-xl text-white mb-2">
            Sales & Specials
          </div>
        </div>
        <div className="pt-1 pb-2">
          <p className="text-customTextSales">
            Save big on hit titles and hidden gems. There's always something on
            sale at the Steam Games Store!
          </p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full rounded-lg cursor-pointer hover:opacity-80"
          src={`image/top-bg-game/egs-free-games-breaker-jan-2024-1920x1080-028e40df3111.jpg`}
          alt="FreeGame Banner"
        />
        <div className="pt-4">
          <div className="font-medium text-xl text-white mb-2">Free Games</div>
        </div>
        <div className="pt-1 pb-2">
          <p className="text-customTextSales">
            Explore free and free-to-play games from our collection. Come back
            every Thursday for a new free game!
          </p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full rounded-lg cursor-pointer hover:opacity-80"
          src={`image/top-bg-game/egs-non-game-apppromo-blog-1920x1080-59bd51d9d448.jpg`}
          alt="Sales Banner"
        />
        <div className="pt-4">
          <div className="font-medium text-xl text-white mb-2">
            Reputable Website
          </div>
        </div>
        <div className="pt-1 pb-2">
          <p className="text-customTextSales">
            Enjoy some of the best Websites for gaming, creating, and more!
          </p>
        </div>
      </div>
    </div>
  );
};
export default TypeItemStore;
