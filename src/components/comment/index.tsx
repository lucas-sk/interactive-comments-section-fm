import { Count } from "../count";
import { Reply } from "../icons/Reply";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function Comment(){
    return (
      <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="./src/images/avatars/image-amyrobson.webp" alt="avatar"/>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h2 className="text-lg text-charcoal font-semibold">amyrobson</h2>
            <p className="text-sm text-payne">2 weeks ago</p>
          </CardHeader>
          <CardContent>
            <p className="text-payne">
              Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <Count stateInitial={12}/>
            <Button className="gap-2" size={"sm"} variant={"outline"}>
              <Reply />
              Reply
            </Button>
          </CardFooter>
      </Card>
  )
}