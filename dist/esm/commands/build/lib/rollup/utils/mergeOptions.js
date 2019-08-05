"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mergeOptions;
exports.commandAliases = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createGetOption = function createGetOption(config, command) {
  return function (name, defaultValue) {
    return command[name] !== undefined ? command[name] : config[name] !== undefined ? config[name] : defaultValue;
  };
};

var normalizeObjectOptionValue = function normalizeObjectOptionValue(optionValue) {
  if (!optionValue) {
    return optionValue;
  }

  if ((0, _typeof2["default"])(optionValue) !== 'object') {
    return {};
  }

  return optionValue;
};

var getObjectOption = function getObjectOption(config, command, name) {
  var commandOption = normalizeObjectOptionValue(command[name]);
  var configOption = normalizeObjectOptionValue(config[name]);

  if (commandOption !== undefined) {
    return commandOption && configOption ? _objectSpread({}, configOption, {}, commandOption) : commandOption;
  }

  return configOption;
};

var defaultOnWarn = function defaultOnWarn(warning) {
  if (typeof warning === 'string') {
    console.warn(warning);
  } else {
    console.warn(warning.message);
  }
};

var getOnWarn = function getOnWarn(config) {
  var defaultOnWarnHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOnWarn;
  return config.onwarn ? function (warning) {
    return config.onwarn(warning, defaultOnWarnHandler);
  } : defaultOnWarnHandler;
};

var getExternal = function getExternal(config, command) {
  var configExternal = config.external;
  return typeof configExternal === 'function' ? function (id) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return configExternal.apply(void 0, [id].concat(rest)) || command.external.indexOf(id) !== -1;
  } : (typeof config.external === 'string' ? [configExternal] : Array.isArray(configExternal) ? configExternal : []).concat(command.external);
};

var commandAliases = {
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
exports.commandAliases = commandAliases;

function mergeOptions(_ref) {
  var _ref$config = _ref.config,
      config = _ref$config === void 0 ? {} : _ref$config,
      _ref$command = _ref.command,
      rawCommandOptions = _ref$command === void 0 ? {} : _ref$command,
      defaultOnWarnHandler = _ref.defaultOnWarnHandler;
  var command = getCommandOptions(rawCommandOptions);
  var inputOptions = getInputOptions(config, command, defaultOnWarnHandler);

  if (command.output) {
    Object.assign(command, command.output);
  }

  var output = config.output;
  var normalizedOutputOptions = Array.isArray(output) ? output : output ? [output] : [];
  if (normalizedOutputOptions.length === 0) normalizedOutputOptions.push({});
  var outputOptions = normalizedOutputOptions.map(function (singleOutputOptions) {
    return getOutputOptions(singleOutputOptions, command);
  });
  var unknownOptionErrors = [];
  var validInputOptions = Object.keys(inputOptions);
  addUnknownOptionErrors(unknownOptionErrors, Object.keys(config), validInputOptions, 'input option', /^output$/);
  var validOutputOptions = Object.keys(outputOptions[0]);
  addUnknownOptionErrors(unknownOptionErrors, outputOptions.reduce(function (allKeys, options) {
    return allKeys.concat(Object.keys(options));
  }, []), validOutputOptions, 'output option');
  var validCliOutputOptions = validOutputOptions.filter(function (option) {
    return option !== 'sourcemapPathTransform';
  });
  addUnknownOptionErrors(unknownOptionErrors, Object.keys(command), validInputOptions.concat(validCliOutputOptions, Object.keys(commandAliases), 'config', 'environment', 'silent'), 'CLI flag', /^_|output|(config.*)$/);
  return {
    inputOptions: inputOptions,
    optionError: unknownOptionErrors.length > 0 ? unknownOptionErrors.join('\n') : null,
    outputOptions: outputOptions
  };
}

function addUnknownOptionErrors(errors, options, validOptions, optionType) {
  var ignoredKeys = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : /$./;
  var unknownOptions = options.filter(function (key) {
    return validOptions.indexOf(key) === -1 && !ignoredKeys.test(key);
  });
  if (unknownOptions.length > 0) errors.push("Unknown ".concat(optionType, ": ").concat(unknownOptions.join(', '), ". Allowed options: ").concat(validOptions.sort().join(', ')));
}

function getCommandOptions(rawCommandOptions) {
  var external = rawCommandOptions.external && typeof rawCommandOptions.external === 'string' ? rawCommandOptions.external.split(',') : [];
  return _objectSpread({}, rawCommandOptions, {
    external: external,
    globals: typeof rawCommandOptions.globals === 'string' ? rawCommandOptions.globals.split(',').reduce(function (globals, globalDefinition) {
      var _globalDefinition$spl = globalDefinition.split(':'),
          _globalDefinition$spl2 = (0, _slicedToArray2["default"])(_globalDefinition$spl, 2),
          id = _globalDefinition$spl2[0],
          variableName = _globalDefinition$spl2[1];

      globals[id] = variableName;

      if (external.indexOf(id) === -1) {
        external.push(id);
      }

      return globals;
    }, Object.create(null)) : undefined
  });
}

function getInputOptions(config) {
  var command = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    external: [],
    globals: undefined
  };
  var defaultOnWarnHandler = arguments.length > 2 ? arguments[2] : undefined;
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
  }; // support rollup({ cache: prevBuildObject })

  if (inputOptions.cache && inputOptions.cache.cache) inputOptions.cache = inputOptions.cache.cache;
  return inputOptions;
}

function getOutputOptions(config) {
  var command = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var getOption = createGetOption(config, command);
  var format = getOption('format'); // Handle format aliases

  switch (format) {
    case 'esm':
    case 'module':
      format = 'es';
      break;

    case 'commonjs':
      format = 'cjs';
  }

  return {
    amd: _objectSpread({}, config.amd, {}, command.amd),
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