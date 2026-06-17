import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, type Page } from "@playwright/test";

const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), "../fixtures");

export function fixturePath(name: string): string {
	return join(fixturesDir, name);
}

export async function expectToolStatusError(
	page: Page,
	pattern: RegExp,
): Promise<void> {
	const status = page.locator("#tool-status");
	await expect(status).toHaveClass(/error/);
	await expect(status).toHaveText(pattern);
}

export async function expectConvertPanelVisible(
	page: Page,
	visible: boolean,
): Promise<void> {
	const panel = page.locator("#tool-convert-panel");
	if (visible) {
		await expect(panel).not.toHaveClass(/hidden/);
	} else {
		await expect(panel).toHaveClass(/hidden/);
	}
}

export interface JpegConversionCase {
	id: string;
	fixture: string;
	methodLabel?: string;
	extraFixtures?: string[];
}

export async function runJpegConversionCase(
	page: Page,
	testCase: JpegConversionCase,
): Promise<void> {
	const files = [fixturePath(testCase.fixture)];
	if (testCase.extraFixtures) {
		files.push(...testCase.extraFixtures.map((name) => fixturePath(name)));
	}

	await page.locator("#tool-file-input").setInputFiles(files);
	await expectConvertPanelVisible(page, true);

	if (testCase.methodLabel) {
		await page
			.getByRole("radio", { name: testCase.methodLabel, exact: true })
			.check();
	}

	await page.locator("#tool-convert-btn").click();
	await expect(page.locator("#tool-download")).not.toHaveClass(/hidden/);
	await expect(page.locator("#tool-status")).toHaveText(/ready to download/i);
}

export const JPEG_CONVERSION_CASES: JpegConversionCase[] = [
	{ id: "jpeg-png", fixture: "1x1.jpg", methodLabel: "JPEG → PNG" },
	{ id: "jpeg-webp", fixture: "1x1.jpg", methodLabel: "JPEG → WebP" },
	{ id: "jpeg-to-pdf", fixture: "1x1.jpg", methodLabel: "Convert to PDF" },
	{ id: "jpeg-to-base64", fixture: "1x1.jpg", methodLabel: "Convert to Base64" },
	{ id: "jpeg-crop", fixture: "32x32.jpg", methodLabel: "Crop image" },
	{ id: "jpeg-compress", fixture: "1x1.jpg", methodLabel: "Compress image" },
	{
		id: "jpeg-compress-batch",
		fixture: "1x1.jpg",
		extraFixtures: ["1x1-alt.jpg"],
		methodLabel: "Compress images (batch)",
	},
];
