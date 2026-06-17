export const HOW_IT_WORKS_STEPS = [
	"Upload one or more JPEG files using the drop zone or file picker.",
	"Choose an output format or action (compress, crop, batch, and more).",
	"Click Convert, then download your result. Nothing is uploaded to a server.",
] as const;

export const SECURITY_SECTION_COPY =
	"Your files are processed locally in your browser. Nothing is stored on a server and nothing is uploaded over the network. That makes this tool a good fit for photos, documents, and other sensitive images you do not want to send to a third-party service.";

export const CONVERSION_DESCRIPTIONS: Record<string, string> = {
	"jpeg-png":
		"Convert JPEG to PNG with adjustable quality and optional max width.",
	"jpeg-webp": "Convert JPEG to WebP for smaller files with quality control.",
	"jpeg-to-pdf": "Turn a JPEG image into a single-page PDF document.",
	"jpeg-to-base64": "Export JPEG as Base64 text for code or API embedding.",
	"jpeg-crop": "Crop a JPEG using an interactive preview box.",
	"jpeg-compress": "Reduce JPEG file size with a quality slider.",
	"jpeg-compress-batch":
		"Compress multiple JPEGs and download them as a ZIP file.",
};
