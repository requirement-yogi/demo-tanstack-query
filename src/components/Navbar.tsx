"use client";
import React from "react";
import { Collapse, IconButton, Navbar, Typography } from "@material-tailwind/react";
import { BoltIcon, BugAntIcon, type Icon, SettingsIcon } from "@/components/icons";
import Link from "next/link";

const NavLink = ({ children, href, icon }: { icon?: Icon; href: string; children: React.ReactNode }) => {
    return (
        <Typography as="li" variant="small" className="flex items-center gap-x-2 p-1 font-medium">
            {icon}
            <Link href={href} className="flex items-center">
                {children}
            </Link>
        </Typography>
    );
};

export function SiteNav() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <NavLink href={"/vanilla"} icon={<BugAntIcon />}>
                Vanilla
            </NavLink>
            <NavLink href={"/tanstack"} icon={<BoltIcon />}>
                Tanstack
            </NavLink>
            <NavLink href={"/config"} icon={<SettingsIcon />}>
                Server Config
            </NavLink>
        </ul>
    );

    return (
        <Navbar className="lg:min-w-[1000px] max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-primary border-0">
            <div className="container mx-auto flex items-center justify-between">
                <Typography as="p" className="mr-auto cursor-pointer py-1.5 font-medium">
                    <Link href={"/"}>Y (formally Rwitter)</Link>
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </IconButton>
            </div>
            <div className={"lg:hidden"}>
                <Collapse open={openNav}>
                    <div className={"container mx-auto overflow-hidden"}>{navList}</div>
                </Collapse>
            </div>
        </Navbar>
    );
}
