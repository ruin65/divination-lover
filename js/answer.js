// 获取数据并处理
function handlerData(success, error) {
	// 获取选择男还是女
	let sex = localStorage.getItem("sex")
	if (!sex || sex == '') {
		// 默认是男
		sex = '男'
	}
	// 获取文件信息
	let url = "./json/man.json"
	if (sex === '男') {
		url = "./json/man.json"
	} else {
		url = "./json/woman.json"
	}
	// 发起请求获取数据
	$.ajax({
		type: "get",
		url: url,
		success: success,
		error: error
	});
}

// 取得[0,n-1]范围随机数
function randomIndex(n) {
	return Math.floor(Math.random() * n)
}

// 获取随机元素
function getRandomElement(elements) {
	if (!elements || elements.length <= 0) {
		return ""
	}
	let random = randomIndex(elements.length)
	return elements[random]
}

// 随机获取三个关键字
function getRandomThreeKeyWord(elements) {
	if (!elements || elements.length <= 0) {
		return []
	}
	let a = getRandomElement(elements)
	let b = a
	while (a == b) {
		b = getRandomElement(elements)
	}
	let c = a
	while (a == c || b == c) {
		c = getRandomElement(elements)
	}
	return a + " " + b + " " + c
}

// 处理成功请求
function handlerSuccess(response) {
	let {
		imgs,
		sentence,
		keyWord
	} = response
	// 获取随机图片
	let imgE = getRandomElement(imgs)
	// 获取随机句子
	let sentenceE = getRandomElement(sentence)
	// 获取三个随机关键字
	let keyWordE = getRandomThreeKeyWord(keyWord)

	// 动画速度
	let speed = 2000

	// 赋值
	$("#sentence").html(sentenceE)
	$("#keyWord").html(keyWordE)
	let src = "img/" + imgE
	$("#img").attr("src", src)

	// $("#word-list").fadeIn(speed, () => {
	// 	$("#word-list").fadeOut(speed)
	// 	$("#img").fadeIn(speed, () => {
	// 		$("#img").fadeOut(speed)
	// 	})
	// })

	// 淡入淡出效果
	$("#word-list").click(function() {
		$("#word-list").fadeOut(speed)
		$("#img").fadeIn(speed)
	})


}

// 调用方法
handlerData(handlerSuccess, error => console.log(error))
