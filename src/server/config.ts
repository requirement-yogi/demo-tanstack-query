import { z } from "zod";
import { env } from "@/utils/env.mjs";
import { waitFor } from "@/server/utils";
import { RandomError } from "@/server/utils/exceptions";

/**
 * Represents the configuration of the API
 * @param delay The delay to add to each API call (in ms)
 * @param errorRate The rate at which to throw errors (0-100)
 */
export class Config implements ConfigType {
    #delay: number = 0;
    #errorRate: number = 0;

    private constructor(delay: number, errorRate: number) {
        this.#delay = delay;
        this.#errorRate = errorRate;
    }

    public static init(delay: number, errorRate: number): Config {
        return new Config(delay, errorRate);
    }

    set delay(value: number) {
        this.#delay = value;
    }

    set errorRate(value: number) {
        this.#errorRate = value;
    }

    /**
     * Wraps an API function with a delay and error rate
     */
    public async apiWrapper<Resp>(fn: () => Resp) {
        console.debug("this.#delay, this.#errorRate :>> ", this.#delay, this.#errorRate);

        await waitFor(this.#delay);
        if (Math.random() * 100 < this.#errorRate) {
            throw new RandomError();
        }
        return fn();
    }

    /**
     * Used to serialize the object to JSON
     */
    toJSON() {
        return {
            delay: this.#delay,
            errorRate: this.#errorRate,
        };
    }
}

export const ConfigSchema = z.object({
    delay: z.coerce.number().min(0).max(1000),
    errorRate: z.coerce.number().min(0).max(100),
});

const config = Config.init(env.POST_API_DELAY, env.POST_API_ERROR_RATE);

export type ConfigType = z.infer<typeof ConfigSchema>;

export default config;
