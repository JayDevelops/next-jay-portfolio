import { getBlogsForSearchModal } from "@/lib/strapiQueries";
import Navigation from "./Navigation";

export default async function NavigationWrapper() {
  const blogs = await getBlogsForSearchModal();
  return <Navigation blogs={blogs} />;
}
