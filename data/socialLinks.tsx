import { FiFacebook, FiGithub, FiLinkedin, FiYoutube } from "react-icons/fi";

export const socialLinks = [
    {
        name: "LinkedIn",
        url: process.env.NEXT_PUBLIC_LINKEDIN_URL,
        icon: <FiLinkedin className="h-5 w-5" />
    },
    {
        name: "GitHub",
        url: process.env.NEXT_PUBLIC_GITHUB_URL,
        icon: <FiGithub className="h-5 w-5" />
    },
    {
        name: "Facebook",
        url: process.env.NEXT_PUBLIC_FACEBOOK_URL,
        icon: <FiFacebook className="h-5 w-5" />
    },
    {
        name: "Youtube",
        url: process.env.NEXT_PUBLIC_YOUTUBE_URL,
        icon: <FiYoutube className="h-5 w-5" />
    }
];
