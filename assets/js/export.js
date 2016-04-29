$(function() {
	"use strict";

	$("#exportA").click(function() {
		var hpWidth = 960, sum = 0, folder="20160429", isBlock = false,
			strings = {
				"link" : '<link rel="stylesheet" href="./css/macy-base.css" type="text/css" />',
				"genCss" : "#globalContentContainer { border: none !important;}",
				"blockCss" : ".block_grid ul, .block_grid li {margin: 0px !important;padding: 0px !important;}"
			},
			$html = $("<html/>"),
			$head = $("<head/>"),
			$style = $("<style/>"),
			$body = $("<body/>"),
			$rowDiv, $innerDiv, $innerUl, $img, $map,
			i = 0, j, k, l,
			imgLen, imgLen, temp, rowLen, row, mapName,
			imgSrc = [], imgSizes = [], columns = [], isRowEven = [], coords = [], alts = [], hrefs = [], imgalts = [];

		{ // find images, get size and name
			$("#imgMainList").find("img").each(function() {
				imgSrc.push($(this).attr("src"));
				imgSizes.push({
					width: $(this).width(),
					height: $(this).height()
				});
				imgalts.push($(this).attr("alt"));
				coords[i] = [];
				alts[i] = [];
				hrefs[i] = [];
				$(this).parent().find("div").each(function() {
					var $this = $(this);
					temp = {
						x0: parseInt($this.css("left")) + parseInt($(this).attr("data-x")),
						y0: parseInt($this.css("top")) + parseInt($(this).attr("data-y")),
						x1: parseInt($this.css("left")) + $this.width() + parseInt($(this).attr("data-x")),
						y1: parseInt($this.css("top")) + $this.height() + parseInt($(this).attr("data-y"))
					}
					coords[i].push(temp);
					alts[i].push({data: $(this).attr("data-alt")});
					hrefs[i].push({data: $(this).attr("data-href")});
				});
				i++;
			});
			imgLen = imgSizes.length;
			//console.log(coords);
		}

		{ // get rows and columns
			temp = "";
			for(i = 0, j = 0, k = 1; i < imgLen; i++, k++) {
				sum += imgSizes[i].width;
				if(sum >= hpWidth) {
					if(k > 1 && sum > hpWidth) {
						temp = "";
						for(l = i - k + 1; l <= i; l++) temp += ", " + imgSrc[l];
						alert("One or more images not sliced correctly! [" + temp.substring(2) + "]");
					}
					columns[j++] = k;
					sum = 0;
					k = 0;
				}
			}
			if(temp) return false;
			sum !== 0 && alert("Last row does not fill the full width of the page!\nAre you missing one or more images?\n");
			rowLen = j;
		}

		for(i = 0, k = 0; i < rowLen; i++) {
			inner: for(j = 0; j < columns[i]; j++) {
				temp = imgSizes[k + j].width;
				if(temp > hpWidth) {
					j++;
					break inner;
				} else if(temp % 60 !== 0) break inner;
			}
			isRowEven[i] = j === columns[i];
			k += columns[i];
		}

		{ // build html and apply foundation
			for(i = 0, k = 0; i < rowLen; i++) {
				row = 'data-row-num="row_' + ("00" + (i + 1)).slice(-2) + '"';
				if(isRowEven[i]) {
					// apply row-column classes
					$rowDiv = $('<div class="row collapse" ' + row + '/>');
					for(j = 0; j < columns[i]; j++, k++) {
						temp = imgSizes[k].width;
						mapName = folder + "_map" + (k + 1);
						$innerDiv = $('<div class="small-' + (temp <= hpWidth ? temp / 60 : 16) + ' column"/>');
						$img = $("<img/>");
						$img.attr({
							"src" : imgSrc[k],
							"width" : imgSizes[k].width,
							"height" : imgSizes[k].height,
							"usemap" : "#" + mapName,
							"alt" : imgalts[k]
						});
						$innerDiv.append($img, '<map name="' + mapName + '" id="' + mapName + '" ' + row + '/>');
						$map = $innerDiv.find("map");
						for(l = 0; l < coords[k].length; l++) {
							$map.append('<area shape="rect" coords="' + coords[k][l].x0 + ',' + coords[k][l].y0 + ',' + coords[k][l].x1 + ',' + coords[k][l].y1 + '" href="' + hrefs[k][l].data + '" alt="' + alts[k][l].data + '"/>');
						}
						$rowDiv.append($innerDiv);
					}
				} else {
					// apply block_grid class
					isBlock = true;
					$rowDiv = $('<div class="row collapse block_grid" ' + row + '/>');
					$innerUl = $('<ul class="small-block-grid-' + columns[i] + '"/>');
					$rowDiv.append($innerUl);
					for(j = 0; j < columns[i]; j++, k++) {
						mapName = folder + "_map" + (k + 1);
						$img = $("<img/>");
						$img.attr({
							"src" : imgSrc[k],
							"width" : imgSizes[k].width,
							"height" : imgSizes[k].height,
							"usemap" : "#" + mapName,
							"alt" : imgalts[k]
						});
						$innerUl.append('<li>' + $("<div/>").append($img.clone()).html() + '<map name="' + mapName + '" id="' + mapName + '" ' + row + '/></li>');
						$map = $innerUl.find("map");
						for(l = 0; l < coords[k].length; l++) {
							$map.append('<area shape="rect" coords="' + coords[k][l].x0 + ',' + coords[k][l].y0 + ',' + coords[k][l].x1 + ',' + coords[k][l].y1 + '" href="' + hrefs[k][l].data + '" alt="' + alts[k][l].data + '"/>');
						}
					}
				}
				$body.append($rowDiv);
			}
			isBlock && $head.append($style) && $style.append(strings.blockCss);
		}
console.log($body.html());
		localStorage.setItem('template', $body.html());
	});
});