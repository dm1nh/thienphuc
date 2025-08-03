const prettierConfig = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: false,
  semi: false,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  // This plugin's options
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/(.*)$",
    "",
    "^@/(.*)$",
    "",
    "^[../]",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
}

export default prettierConfig
