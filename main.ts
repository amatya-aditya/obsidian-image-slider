import { Plugin } from "obsidian";

const regexWiki = /\[\[([^\]]+)\]\]/
const regexParenthesis = /\((.*?)\)/
const regexWikiGlobal = /\[\[([^\]]*)\]\]/g
const regexMdGlobal = /\[([^\]]*)\]\(([^\(]*)\)/g

const imageNumber: Record<string, number> = {
	'a': 1,
	'b': 2,
	'c': 3,
	'd': 4,
	'e': 5,
	'f': 6,
	'g': 7,
	'h': 8,
	'i': 9,
	'j': 10,
	'k': 11,
	'l': 12
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

	const div = parent.createEl("div", { cls: `image-layouts-grid image-layouts-layout-${slides}` });

	images.forEach((image, idx) => {
		const imgdiv = div.createEl("div", { cls: `image-layouts-image` });
		if (image.type === 'local') {
			addImageFromLink(image.link, sourcePath, imgdiv, plugin);
		} else if (image.type === 'external') {
			console.log(image.link);
			addExternalImage(image.link, imgdiv);
		} else if (image.type === 'placeholder') {
			addPlaceHolder('640x480', imgdiv);
		}
	});


	// create next and previous slide button

	function nextSlide(){
		
	}

	function prevSlide(){
		

	}

	// create next and previous button html element
	const buttonDiv = parent.createEl("div", {cls: "slide-controls"});
	let prevButtonEl = buttonDiv.createEl("button", { text: "Prev", cls: "prev-img-btn" });
	let nextButtonEl = buttonDiv.createEl("button", { text: "Next", cls: "next-img-btn" });


	nextButtonEl.addEventListener("click", () => {
		nextSlide();
	});

	prevButtonEl.addEventListener("click", () => {
		prevSlide();
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
