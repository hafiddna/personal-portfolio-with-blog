import React from "react";
import { BiLogoDevTo } from "react-icons/bi";
import { FaMediumM } from "react-icons/fa";
import { FaGithub, FaXTwitter, FaInstagram, FaLinkedin, FaFacebook, FaHashnode, FaStackOverflow, FaCodepen, FaHackerrank, FaYoutube, FaTwitch, FaThreads, FaSquareBehance, FaDribbble } from "react-icons/fa6";
import { SiCodesandbox, SiLeetcode, SiCodewars, SiTopcoder } from "react-icons/si";

const socials = [
    {
        icon: <FaXTwitter size={20} />,
        label: "X",
    },
    {
        icon: <FaInstagram size={20} />,
        label: "Instagram",
    },
    {
        icon: <FaGithub size={20} />,
        label: "GitHub",
    },
    {
        icon: <FaLinkedin size={20} />,
        label: "LinkedIn",
    },
    {
        icon: <FaFacebook size={20} />,
        label: "Facebook",
    },
    {
        icon: <FaHashnode size={20} />,
        label: "Hashnode",
    },
    {
        icon: <FaStackOverflow size={20} />,
        label: "Stack Overflow",
    },
    {
        icon: <FaCodepen size={20} />,
        label: "CodePen",
    },
    {
        icon: <FaHackerrank size={20} />,
        label: "HackerRank",
    },
    {
        icon: <FaYoutube size={20} />,
        label: "YouTube",
    },
    {
        icon: <FaTwitch size={20} />,
        label: "Twitch",
    },
    {
        icon: <BiLogoDevTo size={20} />,
        label: "Dev.to",
    },
    {
        icon: <FaMediumM size={20} />,
        label: "Medium",
    },
    {
        icon: <SiCodesandbox size={20} />,
        label: "CodeSandbox",
    },
    {
        icon: <FaThreads size={20} />,
        label: "Threads",
    },
    {
        icon: <FaSquareBehance size={20} />,
        label: "Behance",
    },
    {
        icon: <FaDribbble size={20} />,
        label: "Dribbble",
    },
    {
        icon: <SiLeetcode size={20} />,
        label: "LeetCode",
    },
    {
        icon: <SiCodewars size={20} />,
        label: "CodeWars",
    },
    {
        icon: <SiTopcoder size={20} />,
        label: "TopCoder",
    },
];

export default function CMSContact() {
    return (
        <>
            <div className="max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                    Contact
                </h2>
                <p className="mt-4 text-zinc-400">
                    In this page you can modify the contact information of the portfolio website.
                </p>
            </div>
        </>
    )
}
