"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useReducer } from "react"
import { Play, Pause } from "lucide-react"
import Typist from "react-typist-component"
import {cn} from "@/lib/utils"
import GraphemeSplitter from "grapheme-splitter"
import Balancer from "react-wrap-balancer";
import {Text} from "@/components/ui/Typography/Text";
import {Button} from "@/components/ui/button";
import {HeadingTwo} from "@/components/ui/Typography/Headers";


//  Types of the tracking state of the HeroSection
type TypingState = {
    titleDone: boolean,
    subTitleDone: boolean,
    isPaused: boolean
}

type TypingAction =
    | { type: 'togglePause' }
    | { type: 'setDone'; payload: 'title' | 'subtitle' }

//  Reducer checks on if the togglePause was set and the main title is done animating to stop
const reducer = (state: TypingState, action: TypingAction) => {
    switch (action.type) {
        case "togglePause":
            return {
                ...state,
                isPaused: !state.isPaused
            }
        case "setDone":
            return {
                ...state,
                [`${action.payload}Done`]: true
            }
    }
}

//  Create our new splitter instance to be able to split characters to pass to our Typist Component
const splitter = (str: string) => new GraphemeSplitter().splitGraphemes(str);

export default function HeroSection(
    {mainTitle, startSubtitle, subTitles}:
    {mainTitle: string, startSubtitle: string, subTitles: string[]}
) {
    //  Use our reducer function to initialize all the states to track, with their types in mind
    const [{titleDone, subTitleDone, isPaused}, dispatch] = useReducer(
        reducer,
        {
            titleDone: false,
            subTitleDone: false,
            isPaused: false
        }
    )

    return (
        <Card className="relative justify-center w-full max-w-screen-lg">
            {/* CARD HEADER HAS INITIAL TITLE ANIMATION, WILL STOP ANIMATION ONLY ONCE */}
            <CardHeader className="mt-4">
                <CardContent className="flex flex-col items-center justify-center">
                    <Typist
                        typingDelay={100}
                        splitter={splitter}
                        pause={isPaused}
                        onTypingDone={() => dispatch({ type: "setDone", payload: "title"})}
                    >
                        <Balancer>
                            <HeadingTwo>
                                {mainTitle}
                            </HeadingTwo>
                        </Balancer>
                    </Typist>

                    <Text className="text-lg">
                        {/* LEFT SIDE OF SUBTITLE START */}
                        {titleDone && (
                            <Typist
                                typingDelay={100}
                                startDelay={1000}
                                pause={isPaused}
                                onTypingDone={() => {
                                    dispatch({ type: "setDone", payload: "subtitle"})
                                }}
                            >
                                {startSubtitle}{' '}
                            </Typist>
                        )}

                        {/* RIGHT SIDE ANIMATED SUBTITLE END */}
                        {titleDone && (
                            <Typist
                                typingDelay={100}
                                backspaceDelay={75}
                                pause={isPaused}
                                loop
                            >
                                {subTitles.map((subtitle) => (
                                    <span key={subtitle} className="font-semibold">
                                        {subtitle}
                                        <Typist.Delay ms={1000} />
                                        <Typist.Backspace count={subtitle.length} />
                                    </span>
                                ))}
                            </Typist>
                        )}
                    </Text>

                    {/* PausePlayButton responsible to pause and play, respect to our reducer state handler */}
                    <Button
                        variant="ghost"
                        onClick={() => dispatch({ type: "togglePause" })}
                        className="absolute top-4 right-4"
                    >
                        {isPaused ? (
                            <Play
                                className="w-6 h-6 fill-gray-900 dark:fill-gray-50"
                                aria-label="Play animation"
                            />
                        ) : (
                            <Pause
                                className="w-6 h-6 ill-gray-900 dark:fill-gray-50"
                                aria-label="Pause animation"
                            />
                        )}
                    </Button>
                </CardContent>
            </CardHeader>

        </Card>
    )
}