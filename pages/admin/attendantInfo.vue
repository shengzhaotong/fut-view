<template>
	<view class="padding-top">
		<view class="card-menu cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-orange cuIcon-roundrightfill"></text>{{appointment.date}}&nbsp;&nbsp;{{appointment.time}}
				</view>
			</view>
		</view>
		<view class="card-menu cu-list menu">
			<view v-for="(item, key) in list" :key="key" class="cu-item" data-target="BindQrcode" :data-id="item.id">
				<view class="content">{{item.name}}</view>
				<view class="action">
					<view class="cu-tag round light bg-gray"> {{item.id}} </view>
					<view class="cu-tag round light bg-gray"> 陪诊次数: {{item.num}} </view>
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
			appointment: null,
			list: null
		}
	},
	onLoad (option) {
		this.appointment = JSON.parse(option.data)
		util.restGet(this.$baseUrl+'/admin/accompany', [this.appointment.id]).then((result) => {
			if (result.status === 200) {
				this.list = result.entity
			} else if (result.status === 402) {
				uni.navigateBack({
					url: 'login'
				})
			} else {
				util.showToast('信息获取失败', 'error')
			}
		})
	},
	methods: {
		
	}
}
</script>

<style>

</style>
