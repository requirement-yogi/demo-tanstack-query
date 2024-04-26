import { usePathname } from "next/navigation";

/**
 * Returns true if the current page is a vanilla page.
 * Used to determine the direction of the links
 */
const useVanilla = () => {
    const slug = usePathname();
    return slug.includes("/vanilla");
};

export default useVanilla;
