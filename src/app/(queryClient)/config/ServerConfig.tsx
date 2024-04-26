import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ConfigType } from "@/server/config";
import { ConfigAPI } from "@/api";
import ServerConfigForm from "@/components/ServerConfigForm";

const ServerConfig = () => {
    const queryClient = useQueryClient();

    const {
        data: config,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["getConfig"],
        queryFn: ConfigAPI.getConfig,
    });

    const mutateConfig = useMutation({
        mutationFn: ConfigAPI.updateConfig,
        onSuccess: (data) => {
            console.debug("Updating cache");
            queryClient.setQueryData(["getConfig"], data);
        },
    });

    const handleSubmit = (config: ConfigType) => {
        mutateConfig.mutate(config);
    };

    return (
        <div className={"flex flex-col items-center"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? null : (
                <ServerConfigForm config={config} handleSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default ServerConfig;
