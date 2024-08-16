import React, { useState } from "react";
import Game from "../components/category/Game.component";
import Filter from "../components/category/Filter.component";

const CategoryPage = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  return (
    <div>
      <div>
        <div className="flex flex-wrap ms-20">
          <div className="w-8/12 p-2">
            <Game priceRange={priceRange} />
          </div>
          <div className="w-3/12 p-2 mx-8">
            <Filter onPriceChange={setPriceRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
