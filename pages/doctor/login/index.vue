<!-- 蓝色登录页面2 -->
<template>
	<view style="background-color: #66ccff;">
		<view class="img-a">
			<view class="t-b">
				您好，
				<br />
				欢迎使用陪诊宝
			</view>
		</view>
		<view class="login-view" style="">
			<view class="t-login">
				<form class="cl">
					<view class="t-a">
						<text class="txt">学号</text>
						<input type="number" name="phone" placeholder="请输入学号" maxlength="11" v-model="loginData.id" />
					</view>
					<view class="t-a">
						<text class="txt">密码</text>
						<input type="password" name="code" maxlength="18" placeholder="请输入密码" v-model="loginData.password" />
					</view>
					<button @tap="login()">登 录</button>
					<text>\n</text><text>\n</text>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
import util from '@/utils/index.js'
import {mapMutations} from 'vuex';
import {sm3Digest} from '@/encryption/index.js'
export default {
	data() {
		return {
			loginData: {
				id: '',
				password: ''
			}
		};
	},
	onShow () {
		let pages = getCurrentPages();
		let currPage = pages[pages.length-1];
		if (currPage.data.loginS === true){
			currPage.data.loginS = false
			uni.switchTab({
				url: '/pages/index/index'
			})
		} else {
			util.get(this.$baseUrl+'/attendant/test').then((result) => {
				if (result.status === 200) {
					uni.navigateTo({
						url: '../task/task'
					})
				}
			})
		}
	},
	methods: {
		...mapMutations(['updateAttendantInfo']),
		async login() {
			let loginData = this.loginData;
			if (!loginData.id) return util.showToast('请输入学号', 'none');
			if (!loginData.password) return util.showToast('请输入密码', 'none');
			loginData.password = sm3Digest(loginData.password)
			const result = await util.post(this.$baseUrl+'/login/attendant', loginData)
			if (result.status === 200) {
				this.updateAttendantInfo(result.entity)
				uni.navigateTo({
					url: '../task/task'
				})
			} else if (result.status === 402){
				util.showToast('用户名或密码错误', 'error')
			} else {
				util.showToast('服务器异常，登录失败', 'error')
			}
		}
	}
};
</script>
<style>
.txt {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}
.img-a {
	width: 100%;
	height: 450rpx;
	background-size: 100%;
}
.reg {
	font-size: 28rpx;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
	background: #f5f6fa;
	color: #000000;
	text-align: center;
	margin-top: 30rpx;
}

.login-view {
	width: 100%;
	position: relative;
	margin-top: -120rpx;
	background-color: #ffffff;
	border-radius: 8% 8% 0% 0;
}

.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	padding-top: 80rpx;
}

.t-login button {
	font-size: 28rpx;
	background: #2796f2;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
}

.t-login input {
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	border-bottom: 1px solid #e9e9e9;
	font-size: 28rpx;
}

.t-login .t-a {
	position: relative;
}

.t-b {
	text-align: left;
	font-size: 42rpx;
	color: #ffffff;
	padding: 130rpx 0 0 70rpx;
	font-weight: bold;
	line-height: 70rpx;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 150rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
