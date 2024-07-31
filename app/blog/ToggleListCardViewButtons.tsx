"use client"
import { Button } from "@/components/ui/button";

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
            <Button onClick={showListView} variant={`${toggleCard ? 'outline' : 'default'}`}>
                List View
            </Button>
            <Button onClick={showCardView} variant={`${!toggleCard ? 'outline' : 'default'}`}>
                Card View
            </Button>
        </div>
    )
}