import {
	compressImage,
	compressImageBatch,
	convertImage,
	cropImage,
	imageToBase64,
	imageToPdf,
} from "@askjeeves/processors-images";
import type { ProcessorMap } from "@askjeeves/ui/scripts/tool-controller";

export const processors: ProcessorMap = {
	"jpeg-png": (file, options) => convertImage(file, "png", options),
	"jpeg-webp": (file, options) => convertImage(file, "webp", options),
	"jpeg-to-pdf": imageToPdf,
	"jpeg-to-base64": imageToBase64,
	"jpeg-crop": (file, options) => cropImage(file, "jpeg", options),
	"jpeg-compress": (file, options) => compressImage(file, "jpeg", options),
	"jpeg-compress-batch": compressImageBatch,
};
