module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            ios: 11,
            android: 7,
            browsers:
              "last 2 firefox version, last 2 chrome version, last 1 edge version, last 2 safari version, >=2%, not ie 11, not op_mini all"
          },
          useBuiltIns: "usage"
        }
      }
    ],
    "@zeit/next-typescript/babel"
  ],
  plugins: ["babel-plugin-styled-components"]
};
