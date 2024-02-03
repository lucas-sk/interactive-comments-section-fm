import { useState } from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Button } from "../ui/button";

export function Count(){
  const [count, setCount] = useState(0);

  function handleIncrement(){
    setCount((state) => {
      return state + 1;
    })
  }

  function handleDecrement(){
    setCount((state) => {
      return state - 1;
    })
  }

  return (
    <div className="flex items-center bg-flash-500 rounded-md">
        <Button onClick={handleIncrement} className="text-periwinkle hover:text-iris" size={"icon"} variant={"outline"}>
          <Plus />
        </Button>
        <span className="text-iris">{count}</span>
        <Button onClick={handleDecrement} className="text-periwinkle hover:text-iris" size={"icon"} variant={"outline"}>
          <Minus />
        </Button>
    </div>
  )
}