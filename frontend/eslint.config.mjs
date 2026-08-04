import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // App Router uses layout.tsx, not pages/_document.js — this rule
      // is a Pages Router concern and produces a false positive here.
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default eslintConfig;
