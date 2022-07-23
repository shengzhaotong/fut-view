<!-- 蓝色登录页面2 -->
<template>
	<view style="background-color: #66ccff;">
		<view class="img-a">
			<view class="t-b">
				您好，
				<br />
				请修改密码
			</view>
		</view>
		<view class="login-view" style="">
			<view class="t-login">
				<form class="cl">
					<view class="t-a">
						<text class="txt">原密码</text>
						<input type="password" name="code" maxlength="18" placeholder="请输入原密码" v-model="updateData.originalPassword"/>
					</view>
					<view class="t-a">
						<text class="txt">新密码</text>
						<input type="password" name="code" maxlength="18" placeholder="请输入新密码" v-model="updateData.newPassword"/>
					</view>
					<view class="t-a">
						<text class="txt">确认密码</text>
						<input type="password" name="code" maxlength="18" placeholder="请确认密码" v-model="updateData.confirmPassword"/>
					</view>
					<button @tap="modify">修改密码</button>
					<text>\n</text><text>\n</text>
				</form>
			</view>
		</view>
	</view>
</template>
<script>
import util from '@/utils/index.js'
import {sm3Digest} from '@/encryption/index.js'
import {mapMutations} from 'vuex'
export default {
	data() {
		return {
			updateData: {
				originalPassword: '',
				newPassword: '',
				confirmPassword: ''
			}
		};
	},
	methods: {
		...mapMutations(['updateAttendantInfo']),
		async modify () {
			if (this.updateData.newPassword !== this.updateData.confirmPassword) return util.showToast('两次输入密码不一致')
			let data = {
				id: this.$state.attendantInfo.id,
				originalPassword: sm3Digest(this.updateData.originalPassword), 
				newPassword: sm3Digest(this.updateData.newPassword)
			 }
			const result = await util.restPut(this.$baseUrl+'/attendant', data)
			if (result.status === 200) {
				this.updateAttendantInfo({})
				util.showToast('修改密码成功', 'success')
			} else if (result.status === 402) {
				uni.switchTab({
					url: '/pages/doctor/login/index'
				})
			} else if (result.entity === 'failed'){
				util.showToast('原密码不正确', 'error')
			} else {
				util.showToast('修改密码失败', 'error')
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
/* 	background-image: url(https://s3.bmp.ovh/imgs/2022/03/d7f85c54e39bbc88.png); */
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
