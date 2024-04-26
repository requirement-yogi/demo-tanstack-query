import React, { type ComponentProps } from "react";
import { Button } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type DefaultPaginationProps = {
    pageCount: number;
    onPageChange: (page: number) => void;
};

/**
 * Pagination component that displays a list of pages and allows the user to navigate between them.
 * @param pageCount The total number of pages.
 * @param onPageChange Callback when the user selects a page.
 */
export function DefaultPagination({ pageCount, onPageChange }: DefaultPaginationProps) {
    const [active, setActive] = React.useState(1);

    const getItemProps = (index: number | string) => {
        return {
            variant: active === index ? "outlined" : "text",
            size: "sm",
            onClick: () => {
                if (typeof index === "string") {
                    return;
                }
                setActive(index);
                onPageChange(index);
            },
            className: `disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sky-600 hover:bg-sky-600/10 active:bg-sky-600/80`,
            disabled: typeof index === "string" || active === index,
        } as Omit<ComponentProps<typeof Button>, "children">;
    };

    const next = () => {
        if (active === pageCount) return;

        setActive(active + 1);
        onPageChange(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
        onPageChange(active - 1);
    };

    return (
        <div>
            <div className="flex items-center gap-4">
                <Button
                    variant="text"
                    className="flex items-center gap-2 disabled:opacity-50"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    {ellipsis(active, pageCount).map((value, index) => (
                        <Button {...getItemProps(value)} key={`${value}:${index}`}>
                            {value}
                        </Button>
                    ))}
                </div>
                <Button
                    variant="text"
                    className="flex items-center gap-2 disabled:opacity-50"
                    onClick={next}
                    disabled={active === pageCount}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

/**
 * Generate a list of page numbers with ellipsis.
 */
export const ellipsis = (current: number, total: number, max = 7): (number | string)[] => {
    const needEllipsis = total > max;
    const hasStartEllipsis = needEllipsis && max - 4 < current;
    const hasEndEllipsis = needEllipsis && current < total - max + 3;

    const getPageComponents = (startIndex: number = 0, lastIndex: number = total) => {
        return Array.from({ length: lastIndex - startIndex }, (_, i) => i + startIndex + 1);
    };

    if (!needEllipsis) return getPageComponents(0, total);
    if (hasStartEllipsis && !hasEndEllipsis) {
        const pageCount = max - 2;
        return [...getPageComponents(0, 1), "...", ...getPageComponents(total - pageCount)];
    }
    if (!hasStartEllipsis && hasEndEllipsis) {
        const pageCount = max - 2;
        return [...getPageComponents(0, pageCount), "...", ...getPageComponents(total - 1, total)];
    }

    const pageCount = max - 4;

    return [
        ...getPageComponents(0, 1),
        "...",
        ...getPageComponents(current - Math.floor(pageCount / 2) - 1, current + pageCount - 1),
        "...",
        ...getPageComponents(total - 1, total),
    ];
};

export default DefaultPagination;
