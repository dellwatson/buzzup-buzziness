const path = require("path");

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            // Add local aliases if needed, or remove this section entirely
            // Example of a local alias:
            // 'your-local-ui-package': path.resolve(__dirname, 'path/to/local/ui')
          },
        },
      ],
    ],
  };
};
