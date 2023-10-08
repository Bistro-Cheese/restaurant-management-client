import { FoodProps } from "@/components/food/food-list";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const FoodCard = ({
    name,
    price,
    quantity,
}: FoodProps) => {
    const isInStock = true;
    return (
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                    fill
                    className="object-cover"
                    alt={name}
                    sizes="100vw"
                    src="https://thucphamsieuthi.vn/wp-content/uploads/2021/08/banh-pizza-hai-san-dong-lanh.jpg"
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="flex mb-1 flex-row justify-between text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    <div >
                        {name}
                    </div>
                    <div className="text-red-500">
                        {price}VND
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                        Qty: {quantity}
                    </p>
                    <div className={cn("text-xs text-white font-bold p-[2px] rounded-sm", isInStock ? "bg-green-500" : "bg-red-500")}>
                        {isInStock ? "In Stock" : "Out Stock"}
                    </div>
                </div>

                <div className="flex mt-6 flex-row justify-between items-center">
                    <Button variant="destructive" size="sm" className="py-[1px] px-5 text-xs">Remove</Button>
                    <Button size="sm" className="py-[1px] px-5 text-xs">Edit</Button>
                </div>
            </div>
        </div>
    )
}