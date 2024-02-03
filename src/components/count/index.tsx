import { useState } from "react";
import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Button } from "../ui/button";

interface CountProps {
  stateInitial?: number;
}

export function Count({ stateInitial = 0 }: CountProps){
  const [count, setCount] = useState(stateInitial);

  function handleIncrement(){
    setCount((state) => {
      if (state  === stateInitial + 1) return state;
      return state + 1;
    })
  }

  function handleDecrement(){
    setCount((state) => {
      if (state === 0) return 0;
      if (state - 1 === stateInitial - 1) return stateInitial;
      return state - 1;
    })
  }

  return (
    <div className="flex items-center bg-flash-500 rounded-md w-20">
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