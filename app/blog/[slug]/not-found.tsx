import {HeadingOne} from "@/components/ui/Typography/Headers";
import {Text} from "@/components/ui/Typography/Text";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowBigRight} from "lucide-react";

export default function BlogArticleNotFound() {
    return (
        <div className="container mx-auto space-y-3">
            <HeadingOne>Post Not Found</HeadingOne>
            <Text>
                The requested blog article is not found or no longer available.
            </Text>
            <Text>
                Please click on the button below to navigate to all my other available posts :)
            </Text>
            <Button asChild>
                <Link href="/blog">
                    Main Blog <ArrowBigRight />
                </Link>
            </Button>
        </div>
    );
}