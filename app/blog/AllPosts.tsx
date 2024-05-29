import { allPosts } from "content-collections";
import {HeadingThree} from "@/components/ui/Typography/Headers";
import {Text} from "@/components/ui/Typography/Text";

export function AllPosts() {
    return (
        <ul className="space-y-4">
            {allPosts.map((post) => (
                <li key={post._meta.path}>
                    <a href={`/blog/${post._meta.path}`}>
                        <HeadingThree>{post.title}</HeadingThree>
                        <Text>{post.summary}</Text>
                    </a>
                </li>
            ))}
        </ul>
    );
}