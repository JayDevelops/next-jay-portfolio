"use client"
import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils";

type ToggleListCardViewButtonsProps = {
    toggleCard: boolean,
    setToggleCard: (value: (((prevState: boolean) => boolean) | boolean)) => void,
}

export default function ToggleListCardViewButtons({toggleCard, setToggleCard}: ToggleListCardViewButtonsProps) {
    const showCardView = () => {
        setToggleCard(true)
    }

    const showListView = () => {
        setToggleCard(false)
    }

    return (
        <div className="space-x-4">
            <Button
                onClick={showListView}
                variant={`${toggleCard ? 'outline' : 'default'}`}
                className={cn(
                    "hover:bg-primary/80 hover:text-primary-foreground hover:scale-[1.06] transition-all ease-in duration-100"
                )}
            >
                List View
            </Button>
            <Button
                onClick={showCardView}
                variant={`${!toggleCard ? 'outline' : 'default'}`}
                className={cn(
                    "hover:bg-primary/80 hover:text-primary-foreground hover:scale-[1.06] transition-all ease-in duration-100"
                )}
            >
                Card View
            </Button>
        </div>
    )
}