export function DateFtt (fmt, date, toNextDay, toBeforeDay) {
	if (!date) return '%'
	date = new Date(date)
	if (toNextDay) date = new Date(date.valueOf() + 24 * 3600 * 1000)
	if (toBeforeDay) date = new Date(date.valueOf() - 24 * 3600 * 1000)
	let o = {
		'M+': date.getMonth() + 1,                    // 月份
		'd+': date.getDate(),                         // 日
		'h+': date.getHours(),                        // 小时
		'm+': date.getMinutes(),                      // 分
		's+': date.getSeconds(),                      // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3),  // 季度
		'S': date.getMilliseconds()                   // 毫秒
	}
	// 如果传入的toNextDay为true则计算到下一天
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}


// 取某两个子串中间的字符串
// str  母字符串
// left 左边子串
// right 右边子串
export function subSection (str, left, right) {
    if (!str || !left) return ''
    let len = str.length
    let lPos = str.indexOf(left) + left.length
    let rPos = right ? str.indexOf(right) : len
    return str.substring(lPos, rPos)
}
