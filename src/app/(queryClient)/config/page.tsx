"use client";
import { Typography } from "@material-tailwind/react";
import ServerConfig from "@/app/(queryClient)/config/ServerConfig";

/**
 * Page for configuring the server settings.
 */
export default function ConfigPage() {
    return (
        <div className={"flex flex-col items-center"}>
            <Typography as={"h1"} className={"mx-auto my-2 text-xl"}>
                Server config
            </Typography>
            <ServerConfig />
        </div>
    );
}
