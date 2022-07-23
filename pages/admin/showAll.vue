<template>
	<view class="padding-top">
		<view class="card-menu cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-orange cuIcon-roundrightfill"></text>预约者列表
				</view>
			</view>
		</view>
		<view class="card-menu cu-list menu">
			<view v-for="(item, key) in list" :key="key" class="cu-item" data-target="BindQrcode" :data-id="item.id" @tap="catInfo(key)">
				<view class="content">{{item.name}}</view>
				<view class="action">
					<view class="cu-tag round light bg-orange" v-if="item.status === 0"> {{item.hospital}} </view>
					<view class="cu-tag round light bg-blue" v-if="item.status === 1"> {{item.hospital}} </view>
					<view class="cu-tag round light bg-green" v-if="item.status === 2"> {{item.hospital}} </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import util from '@/utils/index.js';
export default {
	data() {
		return {
			list:[],
			dateTime: null
		}
	},
	onShow () {
		util.restGet(this.$baseUrl+'/admin/appointment', [this.dateTime.date, this.dateTime.time]).then((result) => {
			if (result.status === 200) {
				this.list = result.entity
			} else if (result.status === 402) {
				uni.navigateBack({
					url: 'login'
				})
			} else {
				util.showToast('获取信息失败', 'error')
			}
		})
	},
	onLoad (option) {
		this.dateTime = JSON.parse(option.data)
	},
	methods: {
		catInfo (index) {
			uni.navigateTo({
				url: `showInfo?data=${JSON.stringify(this.list[index])}`
			})
		}
	}
}
</script>

<style>

</style>
