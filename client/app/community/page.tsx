import { Metadata } from "next";

import CommunityGeneratedIdeaList from "./community";

export const metadata: Metadata = {
  title: "MakeMeDIYspire Community Generated Ideas",
  description:
    "Join MakeMeDIYspire and discover an ever-growing list of DIY projects and ideas, all generated by our vibrant community of crafting enthusiasts. Dive into innovative DIY adventures and ignite your creativity with unique, user-driven project concepts.",
  keywords: [
    "Community-Generated DIY Ideas",
    "MakeMeDIYspire Projects",
    "User-Created Crafting Ideas",
    "DIY Community Inspiration",
    "Innovative DIY Concepts",
    "Crafting Community",
    "DIY Idea List",
    "Creative Project Inspiration",
  ],
  metadataBase: new URL("https://www.diyspire/community"),
  applicationName: "MakeMeDIYspire",
};

export default function Page() {
  return <CommunityGeneratedIdeaList />;
}