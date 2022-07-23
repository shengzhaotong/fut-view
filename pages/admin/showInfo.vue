<template>
	<view class="padding-top">
		<form>
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>预约人信息<text
							class="text-gray text-sm padding-left-sm"></text>
					</view>
				</view>
			</view>
			<view class="card-menu cu-list menu">
				<view class="cu-item">
					<view class="content">姓名：</view>
					<view class="action">{{appointment.uName}}</view>
				</view>
				<view class="cu-item">
					<view class="content">联系方式：</view>
					<view class="action">{{appointment.uPhone}}</view>
				</view>
				<view class="cu-item">
					<view class="content">与就诊人关系：</view>
					<view class="action">{{appointment.relationship}}</view>
				</view>
			</view>
		</form>
		<text>\n</text>
		<form>
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>就诊人信息<text
							class="text-gray text-sm padding-left-sm"></text>
					</view>
				</view>
			</view>
			<view class="card-menu cu-list menu">
				<view class="cu-item">
					<view class="content">姓名：</view>
					<view class="action">{{appointment.name}}</view>
				</view>
				<view class="cu-item">
					<view class="content">年龄：</view>
					<view class="action">{{appointment.age}}</view>
				</view>
				<view class="cu-item">
					<view class="content">性别：</view>
					<view class="action">{{appointment.sex}}</view>
				</view>
				<view class="cu-item">
					<view class="content">联系方式：</view>
					<view class="action">{{appointment.phone}}</view>
				</view>
				<view class="cu-item">
					<view class="content">基础疾病：</view>
					<view class="action">{{disease}}</view>
				</view>
			</view>
		</form>
		<text>\n</text>
		<form>
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>预约信息<text
							class="text-gray text-sm padding-left-sm"></text>
					</view>
				</view>
			</view>
			<view class="card-menu cu-list menu">
				<view class="cu-item">
					<view class="content">就诊时间：</view>
					<view class="action">{{appointment.date}} {{appointment.time}}</view>
				</view>
				<view class="cu-item">
					<view class="content">挂号医院：</view>
					<view class="action">{{appointment.hospital}}</view>
				</view>
				<view class="cu-item">
					<view class="content">挂号科室：</view>
					<view class="action">{{appointment.department}}</view>
				</view>
				<view class="cu-item">
					<view class="content">医师姓名：</view>
					<view class="action">{{appointment.doctor}}</view>
				</view>
				<view class="cu-item">
					<view class="content">症状描述：</view>
					<view class="action">{{appointment.symptom}}</view>
				</view>
			</view>
		</form>
		<text>\n</text><text>\n</text>
		<view class="button-group" v-if="appointment.status === 0">
			<button type="primary" @tap="update" style="width: 12rem; text-align: center;">派出陪诊员</button>
		</view>
		<view class="button-group" v-if="appointment.status === 1">
			<button type="primary" @tap="complete" style="width: 12rem; text-align: center;">完成陪诊</button>
			<text>\n\n</text>
			<button type="primary" @tap="update" style="width: 12rem; text-align: center;">更换陪诊员</button>
		</view>
		<view class="button-group" v-if="appointment.status === 2">
			<button type="primary" @tap="catInfo" style="width: 12rem; text-align: center;">查看陪诊员</button>
		</view>
		<text>\n</text><text>\n</text>
	</view>
</template>

<script>
import util from '@/utils/index.js'
export default {
	data() {
		return {
			appointment: {},
			disease: ''
		}
	},
	onLoad (option) {
		this.appointment = JSON.parse(option.data)
	},
	onShow () {
		util.restGet(this.$baseUrl+'/admin/appointment/one', [this.appointment.id]).then((result) => {
			if (result.status === 200) {
				this.appointment = result.entity
				if (!this.disease) {
					this.disease = this.getDisease(this.appointment.disease)
				}
			} else if (result.status === 402) {
				uni.navigateBack({
					url: 'login'
				})
			} else if (result.status === 500) {
				util.showToast('获取信息失败', 'error')
			}
		})
	},
	methods: {
		getDisease (disArr) {
			let temp = JSON.parse(disArr)
			let resTemp = ''
			if (temp[temp.length - 1] === '') {
				temp.pop()
			}
			for (let i = 0; i < temp.length; i++) {
				if (i === 0) {
					resTemp += temp[i]
				} else {
					resTemp = resTemp + ', ' + temp[i]
				}
			}
			return resTemp
		},
		catInfo () {
			uni.navigateTo({
				url: `attendantInfo?data=${JSON.stringify(this.appointment)}`
			})
		},
		update () {
			uni.navigateTo({
				url: `attendant?data=${JSON.stringify(this.appointment)}`
			})
		},
		async complete () {
			const result = await util.put(this.$baseUrl+'/admin', this.appointment.id)
			if (result.status === 200) {
				uni.navigateBack()
			} else if (result.status === 402) {
				uni.navigateBack({
					url: 'login'
				})
			} else {
				util.showToast('服务器异常', 'error')
			}
		}
	}
}
</script>

<style>

</style>
