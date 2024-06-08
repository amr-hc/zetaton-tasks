import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/counterSlice";


export default function Counter() {
  const { count } = useSelector((state) => state.x);
  const dispatch = useDispatch();
  const { increase, decrease } = counterActions;
  const increaseHnadler = () => {
    dispatch(increase());
  };
  const decreaseHnadler = () => {
    dispatch(decrease());
  };
  return (
    <div className="p-5 text-center">
      <h1>Counter Component</h1>
      <div className="container">
        <p>Count:{count}</p>
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
