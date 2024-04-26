import type { ConfigType } from "@/server/config";
import { useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

/**
 * Form for configuring the server settings.
 */
export default function ServerConfigForm({
    handleSubmit,
    config,
}: {
    config: ConfigType;
    handleSubmit: (config: ConfigType) => void | Promise<void>;
}) {
    const [errorRate, setErrorRate] = useState(config.errorRate);
    const [delay, setDelay] = useState(config.delay);

    return (
        <Card color="transparent" shadow={false}>
            <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={(e) => {
                    e.preventDefault();
                    void handleSubmit({ errorRate, delay });
                }}
            >
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Error rate
                    </Typography>
                    <Input
                        size={"lg"}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        value={errorRate}
                        onChange={(e) => {
                            const errorRate = parseInt(e.target.value);
                            setErrorRate(errorRate);
                        }}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Delay
                    </Typography>
                    <Input
                        size={"lg"}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        value={delay}
                        onChange={(e) => {
                            const delay = parseInt(e.target.value);
                            setDelay(delay);
                        }}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
                <Button className="mt-6" fullWidth type={"submit"}>
                    Save
                </Button>
            </form>
        </Card>
    );
}
