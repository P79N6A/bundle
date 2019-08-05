import { buildOptions } from "../../../../types";
import * as rollup from 'rollup';
export default function runRollup({ options, rollupConfigs }: {
    options: buildOptions;
    rollupConfigs: any;
}): Promise<rollup.RollupOutput[] | undefined>;
