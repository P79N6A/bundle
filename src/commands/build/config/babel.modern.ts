export default {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false,
        modules: false,
        targets: {
          esmodules: true
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-react-jsx"
  ]
};
