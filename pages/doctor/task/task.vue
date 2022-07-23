<template>
	<view class="time-table width-100-bfb flex flex-direction" style="height: 100vh">
		<view>
			<view class="cu-bar bg-white text-primary">
				<view class="action" @click="previousWeek">
					<text class="cuIcon-back" style="margin-right: unset;"></text>
					<text class="text-bold text-lg">上一周</text>
				</view>
				<text class="content text-bold">{{ time }}</text>
				<view class="action" @click="nextWeek">
					<text class="text-bold text-lg">下一周</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="flex text-center page-bg-white margin-bottom-sm">
				<view class="cu-item flex-sub" v-for="(item, index) in timeList" :key="index" @click="tabSelect" :data-id="index">
					<view class="margin-tb text-lg" style="color: #B1B1B1;">{{ item.week }}</view>
					<view class="text-bold text-lg time radio-circle" :class="index + 1 === week ? 'text-white page-bg-primary radio-circle' : ''">{{ item.time }}</view>
					<text class="text-gray" style="font-size: 80rpx;line-height: 20rpx;" v-if="index + 1 === week">·</text>
				</view>
			</view>
		</view>
		<view v-for="(items, index) in list" :key="index" v-if="index + 1 === week || true" class="flex-sub">
			<view class="" v-for="(item, i) in items" :key="i" v-if="item.length !== 0" @tap="catInfo(item)">
				<view class="cu-card article" :class="isCard ? 'no-card' : ''" v-if="item.date == time">
					<view class="cu-item padding-bottom-xs margin-bottom-xs cu-shadow">
						<view class="cu-list menu-avatar">
							<view class="cu-item flex justify-between margin-lr text-xl height-50 ">
								<view class="text-lg">
									<text class="cuIcon-time text-orange"></text>
									<text class="margin-lr-xs text-bold">{{ item.time }}</text>
								</view>
							</view>
						</view>
						<view class="text-lg">
							<view style="height: 60rpx;">
								<text class="title padding-right-unset">预约人：</text>
								<text>{{ item.name }}</text>
							</view>
							<view>
								<text class="title padding-right-unset">地址：</text>
								<text>{{ item.hospital }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex justify-center" style="margin-top: 260rpx;">
				<image
					src="../../../static/not.png"
					mode=""
					v-if="!isNot"
					class=""
					style="width: 100px;
					height: 80px;"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
import { formatDayTime, teacherData } from '@/components/qiuhc-timeTable/common.js';
const oneDayTimeStamp = 86400000;
const now = new Date();
const todayDayTimeStamp = now.getTime();
const day = now.getDay();
const getDay = day === 0 ? 7 : day;
import util from '@/utils/index.js'
export default {
	name: 'time-table',
	data() {
		return {
			week: getDay,
			timeList:[
				{time: '1', week: '一'},
				{time: '2', week: '二'},
				{time: '3', week: '三'},
				{time: '4', week: '四'},
				{time: '5', week: '五'},
				{time: '6', week: '六'},
				{time: '7', week: '日'}
			],
			list: [[]],
			num: 0,
			isCard: false,
			time: now.toISOString().slice(0, 10),
			mondayDayTimeStamp: 0,
			sundayDayTimeStamp: 0,
			isNot: false
		};
	},
	watch: {
		time: {
			handler(newValue, oldValue) {
				let flag = false
				this.list[0].forEach((item) => {
					if (item.date === newValue) {
						flag = true
					}
				})
				this.isNot = flag
			}
		}
	},
	async created() {
		this.thisWeek();
		const result = await util.restGet(this.$baseUrl+'/attendant/appointment', [this.$state.attendantInfo.id])
		if (result.status === 200) {
			this.list[0] = result.entity
		} else if (result.status === 402) {
			uni.navigateBack()
		} else if (result.status === 500) {
			util.showToast('获取信息失败', 'error')
		}
	},
	methods: {
		getNowFormatDate() {
			let seperator1 = '-'
		    let year = now.getFullYear()
		    let month = now.getMonth() + 1
		    let strDate = now.getDate()
			if (month >= 1 && month <= 9) month = '0' + month
			if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate
			let currentdate = year + seperator1 + month + seperator1 + strDate 
			return currentdate
		},
		catInfo(item) {
			uni.navigateTo({
				url: `info?data=${JSON.stringify(item)}`
			})
		},
		tabSelect(e) {
			this.week = +e.currentTarget.dataset.id + 1;
			this.time = formatDayTime(this.mondayDayTimeStamp + oneDayTimeStamp * (this.week - 1));
		},
		async previousWeek() {
			this.week = 1;
			this.num = this.num - 1;
			if (this.num === 0) this.num === -1;
			if (this.num >= 0) {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num);
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num);
			} else {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num));
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num));
			}
			this.dayList();
			this.time = formatDayTime(this.mondayDayTimeStamp);
		},
		async nextWeek() {
			this.week = 1;
			this.num = this.num + 1;
			if (this.num === 0) this.num === 1;
			if (this.num <= 0) {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(this.num));
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(this.num));
			} else {
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num);
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num);
			}
			this.dayList();
			this.time = formatDayTime(this.mondayDayTimeStamp);
		},
		async thisWeek() {
			this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1);
			this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp;
			this.dayList();
			this.time = this.getNowFormatDate()
		},
		dayList() {
			for (let i = 0; i < 7; i++) {
				if (this.num === 0) {
					i + 1 === getDay ? (this.timeList[i].time = '今') : (this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8));
				} else {
					this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8);
				}
			}
		}
	},
	onUnload() {
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2]; 
		prevPage.setData({
		    loginS: true
		})
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/qiuhc-timeTable/colorUi/main.css';
@import '@/components/qiuhc-timeTable/colorUi/icon.css';
.time-table {
	.content {
		background-color: #ffffff;
	}

	.title {
		line-height: 76rpx !important;
	}
	.time {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin: 0 auto;
	}
}
.width-100-bfb {
	width: 100%;
}
.text-primary {
	color: #409eff;
}
.margin-bottom-sm {
	margin-bottom: 20rpx !important;
}
.padding-bottom-xs {
	padding-bottom: 10rpx !important;
}
.margin-bottom-xs {
	margin-bottom: 5px !important;
}
.cu-shadow {
	box-shadow: rgba(43, 111, 179, 0.15) 0px 0px 8px 0px;
}
.height-50 {
	height: 100rpx !important;
}
.padding-right-unset {
	padding-right: unset !important;
}
.radio-circle {
	border-radius: 100%;
}
.page-bg-primary {
	background: #409eff !important;
	color: #ffffff;
}
.justify-between {
	justify-content: space-between !important;
}
</style>
