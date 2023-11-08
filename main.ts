import { Plugin } from "obsidian";
import { text } from "stream/consumers";

const regexWiki = /\[\[([^\]]+)\]\]/
const regexParenthesis = /\((.*?)\)/
const regexWikiGlobal = /\[\[([^\]]*)\]\]/g
const regexMdGlobal = /\[([^\]]*)\]\(([^\(]*)\)/g

const imageNumber: Record<string, number> = {
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'10': 10,
	'11': 11,
	'12': 12,
	'13': 13,
	'14': 14,
	'15': 15,
	'16': 16,
	'17': 17,
	'18': 18,
	'19': 19,
	'20': 20
}

const addImageFromLink = (link: string, sourcePath: string, parent: HTMLElement, plugin: Plugin) => {
	let destFile = app.metadataCache.getFirstLinkpathDest(link, sourcePath);
	if (destFile) {
		const img = parent.createEl("img");
		img.src = plugin.app.vault.adapter.getResourcePath(destFile.path);
	}
}

const addExternalImage = (link: string, parent: HTMLElement) => {
	const img = parent.createEl("img");
	img.src = link;
}

const addPlaceHolder = (widthXHeight: string, parent: HTMLElement) => {
	widthXHeight = widthXHeight ?? "640x480";
	const img = parent.createEl("img");
	img.src = `https://via.placeholder.com/${widthXHeight}`;
}

const renderLayout = (
	images: ImageLink[],
	slides: string,
	sourcePath: string,
	parent: HTMLElement,
	plugin: Plugin) => {
	
	// add placeholders if images are missing
	const imageNumberCount = imageNumber[slides];
	if (images.length < imageNumberCount) {
		for (let i = images.length; i < imageNumberCount; i++) {
			images.push({ type: 'placeholder' });
		}
	}
	if (images.length > imageNumberCount) {
		images = images.slice(0, imageNumberCount);
	}

	const img_div = parent.createEl("div", { cls: `gallery_wrapper slider-container` });
	const ul_img = img_div.createEl("ul", { cls: `inner-slider` });


		images.forEach((image, idx) => {

			const li_img = ul_img.createEl("li", { cls: `img-card` });

			if (image.type === 'local') {
				addImageFromLink(image.link, sourcePath, li_img, plugin);
			} else if (image.type === 'external') {
				console.log(image.link);
				addExternalImage(image.link, li_img);
			} else if (image.type === 'placeholder') {
				addPlaceHolder('640x480', li_img);
			}
		});

	

		// create next and previous button html element
	const buttonDiv = parent.createEl("div", {cls: "slide-controls"});
	let prevButtonEl = buttonDiv.createEl("button", { text: "Prev", cls: "prev-img-btn" });
	let nextButtonEl = buttonDiv.createEl("button", { text: "Next", cls: "next-img-btn" });

	
	const dot_span = img_div.createEl("div", { cls: `dots-span` });
		images.forEach((image, idx) => {
			const dot = dot_span.createEl("button", { cls: `dots` });
		});


}

const getImages = (source: string): ImageLink[] => {
	const lines = source.split('\n').filter((row) => row.startsWith('!'));
	const images = lines.map((line) => getImageFromLine(line));
	return images.filter((image) => image !== null) as ImageLink[];
}

type ImageLink = {
	type: 'local' | 'external';
	link: string;
} | {
	type: 'placeholder';
}

const getImageFromLine = (line: string): ImageLink | null => {
	if (line.match(regexMdGlobal)) {
		const link = line.match(regexParenthesis)?.[1];
		if (link) {
			return { type: 'external', link };
		}
	} else if (line.match(regexWikiGlobal)) {
		const link = line.match(regexWiki)?.[1];
		if (link) {
			return {
				type: 'local',
				link: link
			}
		}
	}
	return null;
}

export default class ImageNumberPlugin extends Plugin {
  async onload() {
	Object.keys(imageNumber).forEach((slides) => {
		this.registerMarkdownCodeBlockProcessor(`image-slider-${slides}`, (source, el, ctx) => {
			const images = getImages(source);
			renderLayout(images, slides, ctx.sourcePath, el, this);
		});
	});
  }
}
