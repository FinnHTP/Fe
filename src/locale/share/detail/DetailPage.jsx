import React, { useEffect, useState } from "react";
import Game from "../components/detail/Game.component";
const DetailPage = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <div className="text-white cursor-pointer border-b-4   border-customCouponBg">
          Overview
        </div>
        <div className="text-white cursor-pointer">Rating</div>
      </div>
      <Game />
    </div>
  );
};

export default DetailPage;
