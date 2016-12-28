import moment from 'moment';		// 时间格式化

export default {
	/* 获取当前格式化时间 */
	getNow: function () {
		return moment().format("YYYY-MM-DD HH:mm:ss ") + moment().millisecond();
	},
	/* 获取工程名称 */
	getProjectName: function () {
		let arr = __dirname.split('\\');
		return arr[arr.length - 2];
	}
}