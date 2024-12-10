import { nodeResolve } from "@rollup/plugin-node-resolve";
import tailwindcss from "tailwindcss";
import postcss from "rollup-plugin-postcss";
import tailwindConfig from "./tailwind.config.js";
import autoprefixer from "autoprefixer";

import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        to: "dist/index.css",
        extensions: [".css"],
        inject: true,
        extract: true,
        plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
      }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
