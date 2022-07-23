<template>
	<view>
		<view class='UCenter-bg'>
			<button type="primary" v-if="!login" style="font-size: 2rem;background-color: #66ccff;"
				@click="getUserProfile">立即登录</button>
			<view v-else>
				<view class="top-box">
					<image :src='userInfo.avatarUrl' class="avater"></image>
					<view class="nickName">{{userInfo.nickName}}</view>
				</view>
			</view>
			<image src='https://api.szyashu.com/static/wave.gif' mode='scaleToFill' class='gif-wave'></image>
		</view>
		<view class="cu-list menu sm-border card-menu padding-top-xs">
			<navigator class="cu-item arrow" url="/pages/ucenter/doctor/info" v-if="attendant">
				<view class="content">
					<text class="cuIcon-list text-lg" />
					<text class="text-left">查看我的陪诊员信息</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow" url="/pages/ucenter/doctor/update" v-if="attendant">
				<view class="content">
					<text class="cuIcon-list text-lg" />
					<text class="text-left">修改陪诊登录密码</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow" url="/pages/ucenter/info/info">
				<view class="content">
					<text class="cuIcon-list text-lg" />
					<text class="text-left">查看个人信息</text>
				</view>
			</navigator>
			<navigator class="cu-item arrow" url="/pages/ucenter/info/update">
				<view class="content">
					<text class="cuIcon-list text-lg" />
					<text class="text-left">修改个人信息</text>
				</view>
			</navigator>
			<navigator v-if="type == 1" url="../member_detail/list" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-friend text-lg" />
					<text class="text-left">成员管理</text>
				</view>
			</navigator>
		</view>
		<view class="cu-list menu sm-border card-menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-apps text-lg" />
					<text class="text-left">当前版本</text>
				</view>
				<view class="action">
					<text>v{{version}}</text>
				</view>
			</view>
			<navigator url="about_us" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-info text-lg" />
					<text class="text-left">关于我们</text>
				</view>
			</navigator>
			<navigator url="/pages/admin/login" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-info text-lg" />
					<text class="text-left">进入后台</text>
				</view>
			</navigator>
		</view>
		<view class="flex padding-top-sm justify-center flex-direction align-center">
			<view class="padding-top-sm">
				<tki-qrcode cid="qrcode2" ref="qrcode2" :val="val" :background="background" :foreground="foreground"
					:pdground="pdground" :size="200" :onval="true" :loadMake="true" :usingComponents="true"
					@result="qrR" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		version
	} from 'utils/config.js';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	import util from '@/utils/index.js';
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				version: '',
				src: '',
				foreground: '#000000',
				pdground: '#309286',
				background: '#ffffff',
				val: '',
				attendant: null
			}
		},
		onShow() {
			if (!this.$state.openid) {
				util.showToast('请先登录')
			}
			this.attendant = this.$state.attendantInfo.token
		},
		onLoad() {
			this.version = version;
			this.val = "https://www.sdutcm.edu.cn/";
		},
		computed: {
			...mapState(['userInfo']),
			login() {
				let session_key = this.$state.sessionKey
				let openid = this.$state.openid
				return session_key && openid
			}
		},
		methods: {
			...mapMutations(['updateUserInfo', 'updateSessionKey', 'updateOpenId']),
			qrR(res) {
				this.src = res
			},
			async getOpenId(info) {
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return util.showToast('登录失败', 'error')
				let data = {
					appid: this.appid,
					secret: this.secret,
					js_code: res.code,
					grant_type: 'authorization_code'
				}
				const result = await util.get(this.$openid, data)
				if (!(result.session_key || result.openid)) return util.showToast('登录失败', 'error')
				this.updateSessionKey(result.session_key)
				this.updateOpenId(result.openid)
				util.restGet(this.$baseUrl+'/user/info', [this.$state.openid]).then((res) => {
					if (res.status === 200) {
						uni.reLaunch({
							url: '../index/index'
						})
					} else if (res.status === 400) {
						uni.navigateTo({
							url: 'info/update?info=login'
						})
					} else {
						util.showToast('获取信息失败', 'error')
					}
				})
			},
			getUserProfile(e) {
				uni.getUserProfile({
					desc: '登录',
					success: (res) => {
						this.updateUserInfo(res.userInfo)
						this.getOpenId(res)
					},
					fail: (error) => {
						if (error.errMsg == 'getUserProfile:fail auth deny') {
							util.showToast('您取消了登录授权')
						}
					}
				})
			}
		}
	}
</script>

<style>
.top-box {
	height: 400rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.nickName {
	font-size: 1.5rem;
	color: #fff;
	font-weight: bold;
	margin-top: 1rem;
}

.avater {
	width: 90rpx;
	height: 90rpx;
	border-radius: 3rem;
	border: 2px solid #66CCFF;
	box-shadow: 0 1px 5px black;
}

.UCenter-bg {
	background-color: #66ccff;
	height: 400rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
	opacity: 0.8;
}

.UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}
</style>
