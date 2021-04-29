/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-21 15:49:14
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-21 17:50:32
 */
import { } from "../../../api/api";
import { } from "../../../config/index";
import { } from "../../../utils/util.js";
Component({
	behaviors: [],
	properties: {
		houseId: {
			type: [String, Number],
			value: "",
			observer: function (newVal, oldVal) { },
		},
	},
	data: {}, // 私有数据，可用于模版渲染

	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () { },
		moved: function () { },
		detached: function () { },
	},

	// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
	attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
	ready: function () { },

	pageLifetimes: {
		// 组件所在页面的生命周期函数
		show: function () {
			// this.data.data.getVisitProjectLogList();
		},
	},

	methods: {},
});
