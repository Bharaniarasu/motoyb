import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomModal from "../../layout/CustomModal";

const Process = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [pending, setPending] = useState(false);
  const assembleHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/bikes/status/update`,
        {
          bikeId: bike.id,
          model: bike.model,
          brand: bike.brand,
          assemblyTime: bike.assemblyTime,
          status: "Started",
        },
        { withCredentials: true }
      );
      setShowModal(true);
      setPending(true);
    } catch (error) {
      console.error("Assembling failed:", error);
    }
  };

  const validateStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/bikes/status/validate`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setPending(false);
      } else {
        setPending(true);
      }
    } catch (error) {
      console.error("Assembling failed:", error);
    }
  };

  const fetchbike = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/bikes/${id}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response) {
        setBike(response.data.bike[0]);
      }
    } catch (error) {
      console.error("Fetch data failed", error);
    }
  };

  useEffect(() => {
    fetchbike();
    validateStatus();
  }, []);
  return (
    <>
      {bike && (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className=" m-auto">
            <img src={bike.url} alt={bike.brand} />
          </div>
          <div className="">
            <div className="p-6 flex justify-end">
              <button
                onClick={assembleHandler}
                disabled={pending}
                className="disabled:opacity-20 disabled:hover:bg-blue-600 disabled:hover:text-white p-3 px-4 font-bold bg-[#2865ac] border-2 border-[#2865ac] text-white rounded-md hover:border-2 hover:border-[#2865ac] hover:text-[#2865ac] hover:bg-white"
              >
                Assemble
              </button>
              <CustomModal open={showModal} onClose={() => setShowModal(false)}>
                <div className="p-10 font-bold text-[#2865ac] text-center">
                  The Assemble has started.
                </div>
              </CustomModal>
            </div>
            <div className="p-10 overflow-auto  h-96">
              <table className="w-full   shadow-xl rounded-xl  ">
                <tbody>
                  <tr className="  shadow-xl ">
                    <td className="p-4 font-bold">Model</td>
                    <td className="text-center">{bike.model}</td>
                  </tr>
                  <tr className="  shadow-xl ">
                    <td className="p-4 font-bold">brand</td>
                    <td className="text-center">{bike.brand}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">color</td>
                    <td className="text-center">{bike.color}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">assemblyTime</td>
                    <td className="text-center">{bike.assemblyTime}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">wheelSize</td>
                    <td className="text-center">{bike.wheelSize}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">suspension</td>
                    <td className="text-center">{bike.suspension}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">gears</td>
                    <td className="text-center">{bike.gears}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">brakes</td>
                    <td className="text-center">{bike.brakes}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">price</td>
                    <td className="text-center">{bike.price}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">serviceCost</td>
                    <td className="text-center">{bike.serviceCost}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">mileage</td>
                    <td className="text-center">{bike.mileage}</td>
                  </tr>
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">fuelType</td>
                    <td className="text-center">{bike.fuelType}</td>
                  </tr>{" "}
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">fuelCapacity</td>
                    <td className="text-center">{bike.fuelCapacity}</td>
                  </tr>{" "}
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">maxSpeed</td>
                    <td className="text-center">{bike.maxSpeed}</td>
                  </tr>{" "}
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold">Owner name</td>
                    <td className="text-center">{bike.owner.name}</td>
                  </tr>{" "}
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold"></td>
                    <td className="text-center">{bike.owner.contact}</td>
                  </tr>{" "}
                  <tr className="border-b-2 border-slate-100 shadow-xl ">
                    <td className="p-4 font-bold"></td>
                    <td className="text-center">{bike.owner.address}</td>
                  </tr>{" "}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Process;
