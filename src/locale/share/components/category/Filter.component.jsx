import React from "react";
import Accordion from "./Accordion.component";
import Slider from "@mui/material/Slider";

const Filter = ({ onPriceChange }) => {
  const [localPriceRange, setLocalPriceRange] = React.useState([0, 1000000]);

  const handlePriceChange = (event, newValue) => {
    setLocalPriceRange(newValue);
    onPriceChange(newValue);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex flex-wrap items-center justify-between mx-10">
        <p className="text-white">Filter</p>
        <p
          className="text-cyan-600 cursor-pointer"
          onClick={() => onPriceChange([0, 1000000])}
        >
          Reset
        </p>
      </div>
      <div>
        <Accordion />
      </div>
      <div className="relative w-full max-w-md mx-auto mb-4">
        <div className="flex justify-between mt-4">
          <label
            htmlFor="priceRange"
            className="block mb-2 text-sm font-medium text-white"
          >
            {localPriceRange[0]}đ
          </label>
          <label
            htmlFor="priceRange"
            className="block mb-2 text-sm font-medium text-white"
          >
            {localPriceRange[1]}đ
          </label>
        </div>
        <Slider
          value={localPriceRange}
          onChange={handlePriceChange}
          min={0}
          max={1000000}
          step={1000}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          sx={{
            color: "grey",
            "& .MuiSlider-thumb": {
              backgroundColor: "white",
            },
            "& .MuiSlider-track": {
              backgroundColor: "grey",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "lightgrey",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
