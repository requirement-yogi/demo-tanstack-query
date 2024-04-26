/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    bracketSpacing: true,
    overrides: [
        {
            files: ["*.yml", "*.yaml"],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: "*.json",
            options: {
                tabWidth: 2,
            },
        },
    ],
};

export default config;
