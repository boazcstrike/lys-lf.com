import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Disable image optimization warning - not applicable to static export (output: 'export')
      // Next.js Image component optimization requires server-side rendering
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
