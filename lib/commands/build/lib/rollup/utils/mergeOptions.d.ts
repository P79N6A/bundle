import { InputOptions, WarningHandler } from 'rollup';
export interface GenericConfigObject {
    [key: string]: unknown;
}
export interface CommandConfigObject {
    external: string[];
    globals: {
        [id: string]: string;
    } | undefined;
    [key: string]: unknown;
}
export declare const commandAliases: {
    [key: string]: string;
};
export default function mergeOptions({ config, command: rawCommandOptions, defaultOnWarnHandler }: {
    command?: GenericConfigObject;
    config: GenericConfigObject;
    defaultOnWarnHandler?: WarningHandler;
}): {
    inputOptions: InputOptions;
    optionError: string | null;
    outputOptions: any;
};
