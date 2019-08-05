"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var createGetOption = function (config, command) { return function (name, defaultValue) {
    return command[name] !== undefined
        ? command[name]
        : config[name] !== undefined
            ? config[name]
            : defaultValue;
}; };
var normalizeObjectOptionValue = function (optionValue) {
    if (!optionValue) {
        return optionValue;
    }
    if (typeof optionValue !== 'object') {
        return {};
    }
    return optionValue;
};
var getObjectOption = function (config, command, name) {
    var commandOption = normalizeObjectOptionValue(command[name]);
    var configOption = normalizeObjectOptionValue(config[name]);
    if (commandOption !== undefined) {
        return commandOption && configOption ? __assign({}, configOption, commandOption) : commandOption;
    }
    return configOption;
};
var defaultOnWarn = function (warning) {
    if (typeof warning === 'string') {
        console.warn(warning);
    }
    else {
        console.warn(warning.message);
    }
};
var getOnWarn = function (config, defaultOnWarnHandler) {
    if (defaultOnWarnHandler === void 0) { defaultOnWarnHandler = defaultOnWarn; }
    return config.onwarn
        ? function (warning) { return config.onwarn(warning, defaultOnWarnHandler); }
        : defaultOnWarnHandler;
};
var getExternal = function (config, command) {
    var configExternal = config.external;
    return typeof configExternal === 'function'
        ? function (id) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            return configExternal.apply(void 0, [id].concat(rest)) || command.external.indexOf(id) !== -1;
        }
        : (typeof config.external === 'string'
            ? [configExternal]
            : Array.isArray(configExternal)
                ? configExternal
                : []).concat(command.external);
};
exports.commandAliases = {
    c: 'config',
    d: 'dir',
    e: 'external',
    f: 'format',
    g: 'globals',
    h: 'help',
    i: 'input',
    m: 'sourcemap',
    n: 'name',
    o: 'file',
    v: 'version',
    w: 'watch'
};
function mergeOptions(_a) {
    var _b = _a.config, config = _b === void 0 ? {} : _b, _c = _a.command, rawCommandOptions = _c === void 0 ? {} : _c, defaultOnWarnHandler = _a.defaultOnWarnHandler;
    var command = getCommandOptions(rawCommandOptions);
    var inputOptions = getInputOptions(config, command, defaultOnWarnHandler);
    if (command.output) {
        Object.assign(command, command.output);
    }
    var output = config.output;
    var normalizedOutputOptions = Array.isArray(output) ? output : output ? [output] : [];
    if (normalizedOutputOptions.length === 0)
        normalizedOutputOptions.push({});
    var outputOptions = normalizedOutputOptions.map(function (singleOutputOptions) {
        return getOutputOptions(singleOutputOptions, command);
    });
    var unknownOptionErrors = [];
    var validInputOptions = Object.keys(inputOptions);
    addUnknownOptionErrors(unknownOptionErrors, Object.keys(config), validInputOptions, 'input option', /^output$/);
    var validOutputOptions = Object.keys(outputOptions[0]);
    addUnknownOptionErrors(unknownOptionErrors, outputOptions.reduce(function (allKeys, options) { return allKeys.concat(Object.keys(options)); }, []), validOutputOptions, 'output option');
    var validCliOutputOptions = validOutputOptions.filter(function (option) { return option !== 'sourcemapPathTransform'; });
    addUnknownOptionErrors(unknownOptionErrors, Object.keys(command), validInputOptions.concat(validCliOutputOptions, Object.keys(exports.commandAliases), 'config', 'environment', 'silent'), 'CLI flag', /^_|output|(config.*)$/);
    return {
        inputOptions: inputOptions,
        optionError: unknownOptionErrors.length > 0 ? unknownOptionErrors.join('\n') : null,
        outputOptions: outputOptions
    };
}
exports.default = mergeOptions;
function addUnknownOptionErrors(errors, options, validOptions, optionType, ignoredKeys) {
    if (ignoredKeys === void 0) { ignoredKeys = /$./; }
    var unknownOptions = options.filter(function (key) { return validOptions.indexOf(key) === -1 && !ignoredKeys.test(key); });
    if (unknownOptions.length > 0)
        errors.push("Unknown " + optionType + ": " + unknownOptions.join(', ') + ". Allowed options: " + validOptions.sort().join(', '));
}
function getCommandOptions(rawCommandOptions) {
    var external = rawCommandOptions.external && typeof rawCommandOptions.external === 'string'
        ? rawCommandOptions.external.split(',')
        : [];
    return __assign({}, rawCommandOptions, { external: external, globals: typeof rawCommandOptions.globals === 'string'
            ? rawCommandOptions.globals.split(',').reduce(function (globals, globalDefinition) {
                var _a = globalDefinition.split(':'), id = _a[0], variableName = _a[1];
                globals[id] = variableName;
                if (external.indexOf(id) === -1) {
                    external.push(id);
                }
                return globals;
            }, Object.create(null))
            : undefined });
}
function getInputOptions(config, command, defaultOnWarnHandler) {
    if (command === void 0) { command = { external: [], globals: undefined }; }
    var getOption = createGetOption(config, command);
    var inputOptions = {
        acorn: config.acorn,
        acornInjectPlugins: config.acornInjectPlugins,
        cache: getOption('cache'),
        chunkGroupingSize: getOption('chunkGroupingSize', 5000),
        context: config.context,
        experimentalCacheExpiry: getOption('experimentalCacheExpiry', 10),
        experimentalOptimizeChunks: getOption('experimentalOptimizeChunks'),
        experimentalTopLevelAwait: getOption('experimentalTopLevelAwait'),
        external: getExternal(config, command),
        inlineDynamicImports: getOption('inlineDynamicImports', false),
        input: getOption('input', []),
        manualChunks: getOption('manualChunks'),
        moduleContext: config.moduleContext,
        onwarn: getOnWarn(config, defaultOnWarnHandler),
        perf: getOption('perf', false),
        plugins: config.plugins,
        preserveModules: getOption('preserveModules'),
        preserveSymlinks: getOption('preserveSymlinks'),
        shimMissingExports: getOption('shimMissingExports'),
        strictDeprecations: getOption('strictDeprecations', false),
        treeshake: getObjectOption(config, command, 'treeshake'),
        watch: config.watch
    };
    // support rollup({ cache: prevBuildObject })
    if (inputOptions.cache && inputOptions.cache.cache)
        inputOptions.cache = inputOptions.cache.cache;
    return inputOptions;
}
function getOutputOptions(config, command) {
    if (command === void 0) { command = {}; }
    var getOption = createGetOption(config, command);
    var format = getOption('format');
    // Handle format aliases
    switch (format) {
        case 'esm':
        case 'module':
            format = 'es';
            break;
        case 'commonjs':
            format = 'cjs';
    }
    return {
        amd: __assign({}, config.amd, command.amd),
        assetFileNames: getOption('assetFileNames'),
        banner: getOption('banner'),
        chunkFileNames: getOption('chunkFileNames'),
        compact: getOption('compact', false),
        dir: getOption('dir'),
        dynamicImportFunction: getOption('dynamicImportFunction'),
        entryFileNames: getOption('entryFileNames'),
        esModule: getOption('esModule', true),
        exports: getOption('exports'),
        extend: getOption('extend'),
        file: getOption('file'),
        footer: getOption('footer'),
        format: format === 'esm' ? 'es' : format,
        freeze: getOption('freeze', true),
        globals: getOption('globals'),
        indent: getOption('indent', true),
        interop: getOption('interop', true),
        intro: getOption('intro'),
        name: getOption('name'),
        namespaceToStringTag: getOption('namespaceToStringTag', false),
        noConflict: getOption('noConflict'),
        outro: getOption('outro'),
        paths: getOption('paths'),
        preferConst: getOption('preferConst'),
        sourcemap: getOption('sourcemap'),
        sourcemapExcludeSources: getOption('sourcemapExcludeSources'),
        sourcemapFile: getOption('sourcemapFile'),
        sourcemapPathTransform: getOption('sourcemapPathTransform'),
        strict: getOption('strict', true)
    };
}
