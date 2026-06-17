import { test } from "@playwright/test";
import { JPEG_CONVERSION_CASES, runJpegConversionCase } from "./helpers";

for (const testCase of JPEG_CONVERSION_CASES) {
	test(`converts ${testCase.id}`, async ({ page }) => {
		await page.goto("/");
		await runJpegConversionCase(page, testCase);
	});
}
