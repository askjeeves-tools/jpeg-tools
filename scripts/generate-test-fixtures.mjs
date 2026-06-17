import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = join(root, "tests", "fixtures");

mkdirSync(fixturesDir, { recursive: true });

await sharp({
	create: { width: 1, height: 1, channels: 3, background: { r: 255, g: 0, b: 0 } },
})
	.jpeg()
	.toFile(join(fixturesDir, "1x1.jpg"));

await sharp({
	create: { width: 1, height: 1, channels: 3, background: { r: 0, g: 255, b: 0 } },
})
	.jpeg()
	.toFile(join(fixturesDir, "1x1-alt.jpg"));

await sharp({
	create: { width: 32, height: 32, channels: 3, background: { r: 0, g: 0, b: 255 } },
})
	.jpeg()
	.toFile(join(fixturesDir, "32x32.jpg"));

console.log("Generated tests/fixtures/*.jpg");
