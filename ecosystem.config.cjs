// pm2 config for running the standalone production server (see
// `output: "standalone"` in next.config.ts and the `postbuild` script that
// copies public/ and .next/static into .next/standalone/).
//
// Usage:
//   npm run build
//   pm2 start ecosystem.config.cjs
//
module.exports = {
  apps: [
    {
      name: "abmas-2026",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      node_args: ["--env-file=.env"],
      env: {
        // Change this to whatever port you want it to listen on.
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
