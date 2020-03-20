declare type FLEX_ALIGN_ITEMS = "stretch" | "start" | "end" | "center" | "baseline"
declare type FLEX_JUSTIFY_CONTENT = "start" | "end" | "center" | "between" | "around" | "evenly"

const justifyContentMap = {
    "stretch": "stretch",
    "start": "flex-start",
    "end": "flex-end",
    "center": "center",
    "baseline": "baseline",
}

const alignItemsMap = {
    "start": "flex-start",
    "end": "flex-end",
    "center": "center",
    "between": "space-between",
    "around": "space-around",
    "evenly": "space-evenly",
}

function flex(justifyContent: FLEX_JUSTIFY_CONTENT = "center", alignItems: FLEX_ALIGN_ITEMS = "center") {
    return {
        justifyContent: justifyContentMap[justifyContent],
        alignItems: alignItemsMap[alignItems]
    }
}

export const Layouts = {
    flex
}