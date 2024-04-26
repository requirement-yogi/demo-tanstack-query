import { axiosWrapper } from "@/api/utils";
import { type ConfigType } from "@/server/config";
import { axiosClient } from "@/api/index";
import { type AxiosResponse } from "axios";

const getConfig = async () => {
    return axiosWrapper<ConfigType>(() => axiosClient.get<ConfigType>("/config"));
};

const updateConfig = async (config: ConfigType) => {
    console.debug("config :>> ", config);
    return axiosWrapper(() => axiosClient.put<ConfigType, AxiosResponse<ConfigType>>("/config", config));
};

export const ConfigAPI = {
    getConfig,
    updateConfig,
};
