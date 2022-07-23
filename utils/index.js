import store from '@/store/index.js'

function request(url, method, data, showLoading = true) {
	let attendantInfo = store.state.attendantInfo
	let adminInfo = store.state.adminInfo
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中...'
			});
		};
		data = data || {};
		uni.request({
			url: url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'attendantToken': attendantInfo.token ? attendantInfo.token : 'null',
				'adminToken': adminInfo.token ? adminInfo.token : 'null'
			},
			data: data,
			method: method,
			dataType: 'json',
			success: function(res) {
				if (showLoading) {
					uni.hideLoading();
				};
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					var title = res.err_msg;
					showToast(title); //提示信息
					reject();
				}
			},
		});
	})
};

//toast提示信息
function showToast(title, icon = 'none') {
	uni.showToast({
		title: title.toString(),
		icon,
		duration: 850
	});
};

//提示功能开发中...
function showTipPending() {
	showToast('功能开发中...');
}

//Modal弹窗
function showModal(title, content, succ) {
	uni.showModal({
		title: title.toString(),
		content: content.toString(),
		succ: success
	});
};

function get(url, data, showLoading = true) {
	return request(url, 'GET', data, showLoading);
}

function restGet(url, data, showLoading = true) {
	data.forEach((item) => {url = url + '/' + item})
	return request(url, 'GET', showLoading = showLoading);
}

function post(url, data, showLoading = true) {
	return request(url, 'POST', JSON.stringify(data), showLoading);
}

function put(url, data, showLoading = true) {
	return request(url, 'PUT', data, showLoading);
}

function restPut(url, data, showLoading = true) {
	return request(url, 'PUT', JSON.stringify(data), showLoading);
}

function del(url, data, showLoading = true) {
	return request(url, 'DELETE', JSON.stringify(data), showLoading);
}

export default {
	showToast,
	showTipPending,
	showModal,
	get,
	restGet,
	post,
	put,
	del,
	restPut
}
