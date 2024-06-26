import bike_1 from "../assets/images/bike-1.png";
import bike_2 from "../assets/images/bike-2.png";
import bike_3 from "../assets/images/bike-3.png";

export const Bikes = [
  {
    id: 1,
    model: "Mountain Bike",
    brand: "Brand X",
    color: "Red",
    assemblyTime: "50 minutes",
    wheelSize: "26 inches",
    suspension: "Front suspension",
    gears: "21-speed",
    brakes: "Disc brakes",
    material: "Aluminum alloy",
    weight: "30 lbs",
    price: "$500",
    owner: {
      name: "John Doe",
      contact: "john@example.com",
      address: "123 Main Street, City, Country",
    },
    serviceCost: "$50",
    mileage: "20 km/l",
    fuelType: "Petrol",
    fuelCapacity: "10 liters",
    tyreType: "Off-road",
    wheelType: "Spoke",
    maxSpeed: "30 mph",
    url: bike_1,
  },
  {
    id: 2,
    model: "City Bike",
    brand: "Brand Y",
    color: "Blue",
    assemblyTime: "1 hour",
    wheelSize: "28 inches",
    gears: "7-speed",
    brakes: "Caliper brakes",
    material: "Steel",
    weight: "25 lbs",
    price: "$350",
    owner: {
      name: "Jane Smith",
      contact: "jane@example.com",
      address: "456 Elm Street, City, Country",
    },
    serviceCost: "$40",
    mileage: "25 km/l",
    fuelType: "Electric",
    fuelCapacity: "500 Wh",
    tyreType: "Road",
    wheelType: "Alloy",
    maxSpeed: "20 mph",
    url: bike_2,
  },
  {
    id: 3,
    model: "Road Bike",
    brand: "Brand Z",
    color: "Black",
    assemblyTime: "1 hour 20 minutes",
    wheelSize: "700c",
    frameMaterial: "Carbon fiber",
    gears: "18-speed",
    brakes: "Disc brakes",
    weight: "20 lbs",
    price: "$1000",
    owner: {
      name: "Alex Johnson",
      contact: "alex@example.com",
      address: "789 Oak Street, City, Country",
    },
    serviceCost: "$60",
    mileage: "30 km/l",
    fuelType: "Diesel",
    fuelCapacity: "15 liters",
    tyreType: "Touring",
    wheelType: "Carbon fiber",
    maxSpeed: "35 mph",
    url: bike_3,
  },
];
