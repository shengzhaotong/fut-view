<template>
	<view class="padding-top">
		<view class="card-menu cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-orange cuIcon-roundrightfill"></text>我的预约记录
				</view>
			</view>
		</view>
		<view class="card-menu cu-list menu">
			<view v-for="(item, key) in list" :key="key" class="cu-item" data-target="BindQrcode" :data-id="item.id" @tap="catInfo(key)">
				<view class="content">{{item.hospital}}</view>
				<view class="action">
					<view class="cu-tag round light bg-orange" v-if="item.status === 0">{{item.date}}&nbsp;{{item.time}}</view>
					<view class="cu-tag round light bg-blue" v-if="item.status === 1">{{item.date}}&nbsp;{{item.time}}</view>
					<view class="cu-tag round light bg-green" v-if="item.status === 2">{{item.date}}&nbsp;{{item.time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import util from '@/utils/index.js';
export default {
	components: {
		tkiQrcode
	},
	data() {
		return {
			list: []
		}
	},
	onLoad () {
		let id = this.$state.openid
		let that = this
		if (!id) return uni.switchTab({url: '../ucenter/ucenter'})
		util.restGet(this.$baseUrl+'/user/history', [id]).then((result) => {
			if (result.status === 200) {
				that.list = result.entity
			} else {
				util.showToast('获取信息失败', 'error')
			}
		})
	},
	methods: {
		catInfo (index) {
			uni.navigateTo({
				url: `./info?info=${JSON.stringify(this.list[index])}`
			})
		}
	}
}
</script>

<style>

</style>
