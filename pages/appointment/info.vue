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
					<view class="action">{{info.uName}}</view>
				</view>
				<view class="cu-item">
					<view class="content">联系方式：</view>
					<view class="action">{{info.uPhone}}</view>
				</view>
				<view class="cu-item">
					<view class="content">与就诊人关系：</view>
					<view class="action">{{info.relationship}}</view>
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
					<view class="action">{{info.name}}</view>
				</view>
				<view class="cu-item">
					<view class="content">年龄：</view>
					<view class="action">{{info.age}}</view>
				</view>
				<view class="cu-item">
					<view class="content">性别：</view>
					<view class="action">{{info.sex}}</view>
				</view>
				<view class="cu-item">
					<view class="content">联系方式：</view>
					<view class="action">{{info.phone}}</view>
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
					<view class="action">{{info.date}} {{info.time}}</view>
				</view>
				<view class="cu-item">
					<view class="content">挂号医院：</view>
					<view class="action">{{info.hospital}}</view>
				</view>
				<view class="cu-item">
					<view class="content">挂号科室：</view>
					<view class="action">{{info.department}}</view>
				</view>
				<view class="cu-item">
					<view class="content">医师姓名：</view>
					<view class="action">{{info.doctor}}</view>
				</view>
				<view class="cu-item">
					<view class="content">症状描述：</view>
					<view class="action">{{info.symptom}}</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: null,
			disease: ''
		}
	},
	onLoad (option) {
		this.info = JSON.parse(option.info)
		this.disease = this.getDisease(this.info.disease)
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
		}
	}
}
</script>

<style>

</style>
