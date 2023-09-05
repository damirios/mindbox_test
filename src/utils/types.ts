export type TTask = {
    text: string;
    completed: boolean;
    cleared: boolean;
    id: string;
}

export type TFilter = "all" | "completed" | "active";