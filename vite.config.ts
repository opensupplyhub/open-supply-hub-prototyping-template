import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const basePath = process.env.BASE_PATH;

export default defineConfig({
  base: basePath ? (basePath.endsWith("/") ? basePath : `${basePath}/`) : undefined,
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
