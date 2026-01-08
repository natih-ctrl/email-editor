// CommonJS wrapper for Next config to avoid ESM/CommonJS mismatch when "type": "module" is set in package.json
// Keep this file minimal and in sync with next.config.ts

module.exports = {
  /* config options here */
  reactCompiler: true,
};
