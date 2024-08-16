import React from "react";
import RecentTopImageComponent from "../components/store/RecentTopImage.component";
import CarouselGame from "../components/store/CarouselGame.component";
import TopNewReleases from "../components/store/TopNewReleases.component";
import SpecialOffer from "../components/store/SpecialOffer.component";
import DealsOfWeek from "../components/store/DealsOfWeek.component";
import FreeGame from "../components/store/FreeGame.component";
import GridGameType from "../components/store/GridGameType.component";
import TypeItemStore from "../components/store/TypeItemStore.component";

const StorePage = () => {
  return (
    <div>
      <div className="rounded-lg bg-customBgBtnCarousel mx-auto mt-5">
        <CarouselGame />
      </div>
      <div>
        <div>
          <TopNewReleases />
          <SpecialOffer />
          <DealsOfWeek />
          <FreeGame />
          <GridGameType />
          <TypeItemStore />
        </div>
      </div>
    </div>
  );
};

export default StorePage;
