import { useState } from "react";
import minusIconSrc from "../../images/icon-minus.svg";
import plusIconSrc from "../../images/icon-plus.svg";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

export function Comment(){
    const [count, setCount] = useState(0)

    function handleMinusCount(){
      setCount((state) => state - 1)
    }

    function handlePlusCount(){
      setCount((state) => state + 1)
    }

    return (
        <Card >
          <div>

          </div>
          <div>
            <Button size={"icon"} onClick={handlePlusCount} >
              <img src={plusIconSrc} alt="plus" />
            </Button>
            <Input type="number" value={count}/>
            <Button size={"icon"} onClick={handleMinusCount}>
              <img src={minusIconSrc} alt="minus" />
            </Button>
            </div>
        </Card>
  )
}