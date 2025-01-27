const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Remove the watchFolders and nodeModulesPaths
// config.watchFolders = [...]; // Remove this line
// config.resolver.nodeModulesPaths = [...]; // Remove this line
config.resolver.disableHierarchicalLookup = false; // Set this to false if you want default behavior

module.exports = config;
