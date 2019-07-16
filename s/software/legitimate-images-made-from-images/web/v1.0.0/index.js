function resizeWindow() {
	console.log((pixelPerfect ? targetImg.width*2*subSize : targetImg.width*2));
	console.log(width);
	resizeCanvas((pixelPerfect ? targetImg.width*2*subSize : targetImg.width*2), (pixelPerfect ? targetImg.height*subSize : targetImg.height));
}

function draw () {
	setTimeout(redraw, frameRate);
	push();
	if (sourceImgsExist) {
		for (var i = 0; i < sourceImgs.length; i++) {
			if (!sourceImgs[i].rendered && sourceImgs[i].image.width > 1) {
				var result = sourceImgs[i].image;
				var w = result.width < result.height ? result.width : result.height;
				var h = result.height < result.width ? result.height : result.width;
				console.log("Pre-crop")
				console.log(result);
				console.log("width");
				console.log(w);
				result = result.get(0, 0, w, h);
				console.log("pre-resize");
				console.log(result);
				result.resize(subSize, subSize);
				console.log("final");
				console.log(result);
				console.log("getting color avg");
				var colorAvgR = 0;
				var colorAvgG = 0;
				var colorAvgB = 0;
				for (var j = 0; j < result.width; j++) {
					for (var k = 0; k < result.height; k++) {
						var c = result.get(j, k);
						var a = c[3]/255;
						colorAvgR += 255-(255-c[0])*a;
						colorAvgG += 255-(255-c[1])*a;
						colorAvgB += 255-(255-c[2])*a;
					}
				}
				colorAvgR = colorAvgR/(result.width*result.height);
				colorAvgG = colorAvgG/(result.width*result.height);
				colorAvgB = colorAvgB/(result.width*result.height);
				console.log(colorAvgR);
				console.log(colorAvgG);
				console.log(colorAvgB);
				sourceImgs[i] = {
					image: result,
					rendered: true,
					cAR: colorAvgR,
					cAG: colorAvgG,
					cAB: colorAvgB
				};
				sourceImgsG.push(sourceImgs[i]);
				drawing = false;
				drew = false;
			}
		}
	}
	
	if (targetImgExists ? (targetImg.width > 1 && (pixelPerfect ? targetImg.width*2*subSize : targetImg.width*2) !== width) : false) {
		resizeWindow();
	}
	if (!drawing && !drew) {
		drawProgW = 0;
		drawProgH = 0;
		background(255);
		if (targetImgExists) {
			image(targetImg, 0, 0, (pixelPerfect ? targetImg.width*subSize : targetImg.width), (pixelPerfect ? targetImg.height*subSize : targetImg.height));
		}
	}
	
	if (sourceImgsG.length > 0 && (targetImgExists ? targetImg.width > 1 : false) && !drew) {
		drawing = true;
		var t = targetImg;
		translate((pixelPerfect ? t.width*subSize : t.width), 0);
		if (drawProgW < t.width) {
			var i = drawProgW;
			if (drawProgH < t.height) {
				var j = drawProgH;
				
				var c = t.get(i, j);
				var cA = c[3]/255;
				var cR = 255-(255-c[0])*cA;
				var cG = 255-(255-c[1])*cA;
				var cB = 255-(255-c[2])*cA;
				
				var cRD = 255;
				var cGD = 255;
				var cBD = 255;
				var cD = 255*3;
				var closestImg;
				for (var k = 0; k < sourceImgsG.length; k++) {
					var s = sourceImgsG[k];
					if ((Math.abs(cR-s.cAR)+Math.abs(cG-s.cAG)+Math.abs(cB-s.cAB)) <= cD) {
						cRD = Math.abs(cR-s.cAR);
						cGD = Math.abs(cG-s.cAG);
						cBD = Math.abs(cB-s.cAB)
						cD = cRD+cGD+cBD;
						closestImg = s.image;
					}
				}
				image(closestImg, (pixelPerfect ? i*subSize : i), (pixelPerfect ? j*subSize : j));
				drawProgH += (pixelPerfect ? 1 : subSize);
			} else {
				drawProgW += (pixelPerfect ? 1 : subSize);
				drawProgH = 0;
			}
		} else {
			drew = false;
		}
	}
	pop();
}