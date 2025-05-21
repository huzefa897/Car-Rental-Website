import { cars } from "../data/cars";

export const getNextId = (): string => {
  if (cars.length === 0) return "1";
  
  const maxId = Math.max(...cars.map(car => parseInt(car.id, 10)));
  return (maxId + 1).toString();
};