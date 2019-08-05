export declare function nodeConfig(): {
    input: string;
    external: string[];
    output: {
        file: string;
        format: string;
        sourcemap: boolean;
    };
    preserveSymlinks: boolean;
    plugins: any[];
};
export declare function browserConfig(production?: boolean): {
    input: string;
    output: {
        file: string;
        format: string;
        name: string;
        sourcemap: boolean;
    };
    preserveSymlinks: boolean;
    plugins: any[];
};
