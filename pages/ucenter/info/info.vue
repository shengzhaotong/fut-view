<template>
	<view class="padding-top">
		<form class="" @submit="formSubmit">
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>我的信息<text class="text-gray text-sm padding-left-sm"></text>
					</view>
				</view>
			</view>
			<view class="card-menu cu-list menu" >
				<view class="cu-item" >
					<view class="content">姓名：</view>
					<view class="action">{{user.name}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">手机号：</view>
					<view class="action">{{user.phone}}</view>
				</view>
			</view>
			
		</form>
	</view>
</template>

<script>
import util from '@/utils/index.js';
export default {
	data() {
		return {
			user: {}
		}
	},
	onLoad () {
		let openid = this.$state.openid
		if (!openid) return uni.navigateBack()
		let that = this
		util.restGet(this.$baseUrl+'/user/info', [openid]).then((result) => {
			if (result.status === 200) {
				that.user = result.entity
			} else {
				util.showToast('获取信息失败', 'error')
			}
		})
	},
	methods: {
		
	}
}
</script>

<style>

</style>
