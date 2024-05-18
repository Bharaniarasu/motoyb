import React from "react";
import { Bikes } from "../../data/Bikes";
import { useNavigate } from "react-router-dom";

const SelectBike = () => {
  const navigate = useNavigate();
  const clickHandler = (bike) => {
    navigate(`bikes/${bike.id}`);
  };
  return (
    <div className="relative p-10">
      <div className="bikes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 hover:scale-1.2 gap-5">
        {Bikes.length &&
          Bikes.map((bike, index) => (
            <div
              className="p-5 bike shadow-xl "
              onClick={() => clickHandler(bike)}
            >
              <div className="min-h-[17.2rem] bike-img">
                <img src={bike.url} alt={bike.model} className="p-4 pb-10" />
              </div>
              <table className="p-6  border-t-2 w-full text-center">
                <tr>
                  <td className="p-2 font-bold">Brand</td>
                  <td>{bike.brand}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Model</td>
                  <td>{bike.model}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Assembly Time</td>
                  <td>{bike.assemblyTime}</td>
                </tr>{" "}
                <tr>
                  <td className="p-2 font-bold">Service Cost</td>
                  <td>{bike.serviceCost}</td>
                </tr>{" "}
                <tr>
                  <td className="p-2 font-bold"> price</td>
                  <td>{bike.price}</td>
                </tr>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectBike;
