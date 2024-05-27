import {Button} from "@/components/ui/button";
import {PaperPlaneIcon, DotsHorizontalIcon} from "@radix-ui/react-icons";

export default function SubmitContactButton({isSending}: {isSending: boolean}) {
    return (
        <Button type="submit" disabled={isSending} className="text-primary-foreground">
            {isSending ? "Sending": "Send"}
            {isSending ? (
                <DotsHorizontalIcon className="ml-1.5 h-4 w-4" />
            ) : (
                <PaperPlaneIcon className="ml-1.5 h-4 w-4" />
            )}
        </Button>
    )
}