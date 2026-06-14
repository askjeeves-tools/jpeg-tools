import askJeeves from "@askjeeves/astro-integration";
import { defineConfig } from "astro/config";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
	output: "static",
	site: "https://jpeg.askjeeves.cc",
	integrations: [
		askJeeves({
			name: "Ask Jeeves",
			tagline:
				"Convert JPEG files in your browser. Nothing leaves your device.",
			version: pkg.version,
			openGraph: {
				home: {
					title: "JPEG Converter — Ask Jeeves",
					description:
						"Free JPEG conversion, compression, and export tools in your browser. No upload.",
				},
			},
		}),
	],
	vite: {
		resolve: {
			preserveSymlinks: true,
		},
		ssr: {
			noExternal: [
				"@askjeeves/conversion-core",
				"@askjeeves/processors-images",
				"@askjeeves/ui",
			],
		},
	},
});
