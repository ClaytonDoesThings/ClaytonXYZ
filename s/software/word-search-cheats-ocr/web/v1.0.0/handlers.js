function handleImageUpload () {
	var f = document.getElementById("imageUpload").files[0];
	var fNSplit = f.name.split('.');
	console.log("fNSplit: " + fNSplit);
	var extension = fNSplit[fNSplit.length-1].toLowerCase();
	console.log("Extension: " + extension)
	if (
		extension === "jpg" ||
		extension === "jpeg" ||
		extension === "svg" ||
		extension === "png" ||
		extension === "webp"
	) {
		console.log(f.name);
		console.log(f.size);
		var reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = () => {
			document.getElementById("img").src = reader.result;
			loadImage(reader.result, (loadedImage) => {
				sourceImg = loadedImage;
				let iW = sourceImg.width;
				let iH = sourceImg.height;
				sourceImgC = createGraphics(iW, iH);
			});
		}
	} else {
		//document.getElementById("return").value = "Invalid image type";
	}
}