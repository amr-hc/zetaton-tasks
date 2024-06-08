import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
  const { count } = useSelector((state) => state.counterSlice);
  const dispatch = useDispatch();
  const increaseHnadler = () => {
    dispatch({ type: "INCREASE" });
  };
  const decreaseHnadler = () => {
    dispatch({ type: "DECREASE" });
  };
  return (
    <div className="p-5 text-center">
      <h1>Counter Component</h1>
      <div className="container">
        <p>Count: {count}</p>
        <button className="btn btn-success mx-2  " onClick={increaseHnadler}>
          +
        </button>
        <button className="btn btn-danger mx-2" onClick={decreaseHnadler}>
          -
        </button>
      </div>
    </div>
  );
}
