# Obsidian Image Slider
This plugin helps you make an image slider in obsidian notes. Currently, the slides can only be swiped using touchpad of the device.

https://github.com/amatya-aditya/obsidian-image-slider/assets/63241408/d7860c25-c6aa-4037-9120-ad9ddc5cea40
 
## Installation
1. Using BRAT Plugin [Find more about BRAT Plugin]([url](https://tfthacker.com/Obsidian+Plugins+by+TfTHacker/BRAT+-+Beta+Reviewer's+Auto-update+Tool/Quick+guide+for+using+BRAT))
	1. Install BRAT from the Community Plugins in Obsidian
	2. Get the link to the GitHub repository you want to test. The plugin developer can provide you with this link.
		`It will look something like: (https://github.com/amatya-aditya/obsidian-image-slider/releases)`
	3. Open the command palette and run the command BRAT: Add a beta plugin for testing (If you want the plugin version to be frozen, use the command BRAT: Add a beta plugin with frozen version based on a release tag.)
	4. Using the link from step 2, copy that into the modal that opens up
	5. Click on Add Plugin -- wait a few seconds and BRAT will tell you what is going on
	6. After BRAT confirms the installation, in Settings go to the Community plugins tab.
	7. Refresh the list of plugins
	8. Find the beta plugin you just installed and Enable it.

2. Manual process

	1. Navigate to the releases tab [Obsidian Image Slider](https://github.com/amatya-aditya/obsidian-image-slider/releases)
	2. Download the main.js, mainfest.ts and styles.css of the latest releases.
	3. Navigate to the directory of obsidian plugin inside your vault. It should look like this: .obsidian/plugins
	4. Create a new folder and rename it as obsidian-image-slider and move those three files into that folder.
	5. Refresh the list of plugins, find the Image slider in that list, and finally enable it.

# Usuage

It can be used for both local as well as for cloud images. For local images, you can use it as follows:

```
```image-slider-8
![[Pasted image 20231103120023.png]]
![[Pasted image 20231103120114.png]]
![[Pasted image 20231103120044.png]]
![[Pasted image 20231103170316.png]]
![[Pasted image 20231103120114.png]]
![[Pasted image 20231104163420.png]]
![[Pasted image 20231104163429.png]]
![[Pasted image 20231104163453.png]]
```

For images from the internet, you can use it as follows:

```
```image-slider-5
![](https://picsum.photos/id/1/200/300)
![](https://picsum.photos/id/2/200/300)
![](https://picsum.photos/id/3/200/300)
![](https://picsum.photos/id/4/200/300)
![](https://picsum.photos/id/5/200/300)

```

The number '5' means it can show 5 images. You can put 20 images in each code-block. 

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
## Roadmap:

- Using next and previous button to navigate in between the images
- Using dot like slide-controllers for jumping to exact images you're looking for.
- Image captions
- Overlay text on images

This plugin is heavily inspired by obsidian-image-layouts plugin.
