import Image from "next/image";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { EntityId } from "@reduxjs/toolkit";
import { AlertModal } from "../modal/alert-modal";
import { useState } from "react";
import { useDeleteFoodMutation } from "@/redux/services/food-api";

export type FoodCardProps = {
    id: EntityId
    name: string,
    price: string,
    category: string,
    status: number,
    image: string
}

export const FoodCard = ({
    id,
    name,
    price,
    category,
    status,
    image,
}: FoodCardProps) => {

    const [open, setOpen] = useState(false);


    const [deleteFood, {
        isLoading,
    }] = useDeleteFoodMutation()

    var colorStatus = "";
    var nameStatus = "";

    switch (status) {
        case 1:
            colorStatus = "bg-green-500";
            nameStatus = "Available";
            break;
        case 2:
            colorStatus = "bg-red-500";
            nameStatus = "Out Stock";
            break;
        default:
            // Thực hiện hành động mặc định hoặc hành động cho trạng thái khác
            colorStatus = "bg-slate-500";
            nameStatus = "Draft";
            break;
    }
    const router = useRouter()

    const handleClickEdit = (id: EntityId) => {
        console.log("FoodId:::", id)
        router.push(`/owner/foods/${id}`)
    }

    const handleClickDelete = () => {
        setOpen(true);
    }

    const onDelete = async (id: EntityId) => {
        console.log("FOODCARD ID DELETE:::", id)
        try {
            await deleteFood({ food_id: id })
        } catch (err) {
            console.log("err:::", err)
        }
        setOpen(false);
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => onDelete(id)}
                loading={isLoading} />
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-content"
                        alt={name}
                        sizes="100vw"
                        src={image}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="h-12 flex mb-1 flex-row justify-between text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        <p className="line-clamp-2 font-semibold w-32">
                            {name}
                        </p>
                        <div className="text-red-500 font-bold">
                            {price}VND
                        </div>
                    </div>

                    <div className="flex flex-row justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                            category: {category}
                        </p>
                        <div className={cn("text-xs text-white font-bold p-[5px] rounded-sm", colorStatus)}>
                            {nameStatus}
                        </div>
                    </div>

                    <div className="flex mt-6 flex-row justify-between items-center">
                        <Button onClick={() => handleClickDelete()} variant="destructive" size="sm" className="py-[1px] group/remove bg-white outline outline-gray-200 px-5  text-xs">
                            <Trash2
                                className="h-4 w-4 text-gray-400 group-hover/remove:text-sky-900"
                            />
                        </Button>
                        <Button onClick={() => handleClickEdit(id)} size="sm" className="py-[1px] px-5 text-xs font-semibold text-sky-800 bg-yellow-400 hover:bg-yellow-500 ">Edit</Button>
                    </div>
                </div>
            </div>
        </>

    )
}