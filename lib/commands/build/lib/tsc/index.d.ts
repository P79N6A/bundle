import { buildOptions } from '../../../../types';
export default function tsc(args: {
    options: buildOptions;
    tscOptions: any;
}): Promise<void>;
