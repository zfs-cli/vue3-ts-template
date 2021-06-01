const { loadEnv } = require('vite');
const project = loadEnv('production', process.cwd()).VITE_OUTPUT_DIR;

console.log(project);
