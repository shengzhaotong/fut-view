<template>
	<view class="padding-top">
		<view class="card-menu cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-orange cuIcon-roundrightfill"></text>{{appointment.date}}&nbsp;&nbsp;{{appointment.time}}
				</view>
				<view class="action">
					<button class="cu-btn bg-orange shadow" @tap="add" data-target="Modal">添加</button>
				</view>
			</view>
		</view>
		<view class="card-menu cu-list menu">
			<view v-for="(item, key) in already" :key="key" class="cu-item" data-target="BindQrcode" :data-id="item.id"
				@tap="del(key)">
				<view class="content">{{item.name}}</view>
				<view class="action">
					<view class="cu-tag round light bg-gray"> {{item.id}} </view>
					<view class="cu-tag round light bg-gray"> 陪诊次数: {{item.num}} </view>
				</view>
			</view>
		</view>
		<text>\n\n</text>
		<view class="button-group">
			<button type="primary" @tap="confirmBack" style="width: 12rem; text-align: center;">返回</button>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" >
			<view class="cu-dialog">
				<view class="card-menu cu-list menu">
					<view class="cu-item" data-target="BindQrcode" @tap="close">
						<view class="content">关闭</view>
					</view>
					<view v-for="(item, key) in notYet" :key="key" class="cu-item" data-target="BindQrcode" :data-id="item.id"
						@tap="insert(key)">
						<view class="content">{{item.name}}</view>
						<view class="action">
							<view class="cu-tag round light bg-gray"> {{item.id}} </view>
							<view class="cu-tag round light bg-gray"> 陪诊次数: {{item.num}} </view>
						</view>
					</view>
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
			modalName: null,
			appointment: null,
			already: [],
			notYet: []
		}
	},
	onLoad (option) {
		this.appointment = JSON.parse(option.data)
		util.restGet(this.$baseUrl+'/admin/accompany', [this.appointment.id]).then((result) => {
			if (result.status === 200) {
				this.already = result.entity
			} else if (result.status === 402) {
				uni.navigateBack({
					url: 'login'
				})
			} else {
				util.showToast('信息获取失败', 'error')
			}
		})
		util.restGet(this.$baseUrl+'/admin/attendant', [this.appointment.date, this.appointment.time]).then((result) => {
			if (result.status === 200) {
				this.notYet = result.entity
				if (this.notYet.length === 0) {
					util.showToast('当前无空闲陪诊员')
				}
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
		async insert (index) {
			let accompany = {
				atid: this.notYet[index].id,
				apid: this.appointment.id
			}
			const result = await util.post(this.$baseUrl+'/admin', accompany)
			if (result.status === 200) {
				this.already.push(this.notYet[index])
			} else if (result.status === 402) {
				uni.navigateBack({
					url: 'login'
				})
			} else {
				util.showToast('添加失败', 'error')
			}
			this.modalName = null
		},
		close () {
			this.modalName = null
		},
		confirmBack () {
			uni.navigateBack()
		},
		add (e) {
			util.restGet(this.$baseUrl+'/admin/attendant', [this.appointment.date, this.appointment.time]).then((result) => {
				if (result.status === 200) {
					this.notYet = result.entity
					if (this.notYet.length === 0) {
						util.showToast('当前无空闲陪诊员')
					}
				} else if (result.status === 402) {
					uni.navigateBack({
						url: 'login'
					})
				} else {
					util.showToast('信息获取失败', 'error')
				}
			})
			if (this.notYet.length !== 0) {
				let target = e.currentTarget.dataset.target;
				let id = e.currentTarget.dataset.id;
				if (target == 'BindQrcode'){
					this.val = "https://www.zgnnet.com/aliapp/apply/?id="+id;
				}
				this.modalName = target;
			}
		},
		delArray (arr, index) {
			let temp = []
			for (let i = 0; i < arr.length; i++) {
				if (i !== index) {
					temp.push(arr[i])
				}
			}
			return temp
		},
		del (index) {
			let that = this
			uni.showModal({
				title: '确认删除',
				content: '确认删除该陪诊员',
				confirmText: '删除',
				success: function(res) {
					if (res.confirm) {
						let accompany = {
							atid: that.already[index].id,
							apid: that.appointment.id
						}
						util.del(that.$baseUrl+'/admin', accompany).then((result) => {
							if (result.status === 200) {
								that.already = that.delArray(that.already, index) 
							} else if (result.status === 402) {
								uni.navigateBack({
									url: 'login'
								})
							} else {
								util.showToast('删除失败', 'error')
							}
						})
					} else if (res.cancel) {}
				}
			})
		}
	}
}
</script>

<style>

</style>
