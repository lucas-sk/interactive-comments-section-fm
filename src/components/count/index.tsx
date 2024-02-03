import { Minus } from "../icons/Minus";
import { Plus } from "../icons/Plus";
import { Button } from "../ui/button";

export function Count(){
  return (
    <div className="flex items-center bg-flash-500 rounded-md">
        <Button className="text-periwinkle hover:text-iris" size={"icon"} variant={"outline"}>
          <Plus />
        </Button>
        <span className="text-iris">12</span>
        <Button className="text-periwinkle hover:text-iris" size={"icon"} variant={"outline"}>
          <Minus />
        </Button>
    </div>
  )
}