import { env } from "@/utils/env.mjs";
import axios, { type AxiosPromise } from "axios";

export const axiosClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const addParam = (params: URLSearchParams, key: string, value?: string | number | boolean) => {
    if (value) {
        params.append(key, value.toString());
    }
};

/**
 * Extracts the data from an AxiosPromise
 */
export const axiosWrapper = async <U>(fn: () => AxiosPromise<U>) => {
    return (await fn()).data;
};
