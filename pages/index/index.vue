<template>
	<view class="main" style="background-color: #66CCFF;">
		<image src = "../../static/bg.png" style="text-align: center;"></image>
		<view class="main">
			<view id="head1" class="flex justify-around margin-top-sm "></view>
			<view id="chuxing" class="flex  justify-center align-center margin-top-sm">
				<image src="../../static/sdzyydx.jpeg" style="height: 11.5rem; width: 100%; z-index: 100;"></image>
			</view>
			<view id="btn" class="flex justify-around margin-top-sm">
				<navigator class="btn-box bg-gradual-blue flex align-center justify-center" url="/pages/add/add">
					<text class="text-xxl text-shadow">立即预约</text>
					<text class="cuIcon-write padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
				</navigator>
				<navigator class="btn-box bg-gradual-green flex align-center justify-center" url="/pages/appointment/list">
					<text class="text-xxl text-shadow">查看记录</text>
					<text class="cuIcon-punch padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
				</navigator>
			</view>
			<view class="margin-top-sm flex  justify-center align-center">
				<view class="gg-box">
					<view class="flex align-center padding-left-sm padding-top-sm">
						<text class="cuIcon-notificationfill text-blue padding-right-xs" style="font-size: 40upx"></text>
						<text class="text-lg">公告通知：</text>
					</view>
					<view class="flex align-center justify-center flex-direction padding-top-xl">
						<image src="../../static/none.png" mode="aspectFit" style="width: 200upx;height: 200upx;"></image>
						<text class="text-gray">暂无公告发布</text>
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
		return {}
	},
	onShow () {
		let pages = getCurrentPages();
		let currPage = pages[pages.length-1];
		if (currPage.data.commit === true){
			util.showToast('提交成功', 'success')
			currPage.data.commit = false
		}
	},
	methods: {}
}
</script>

<style>
cover-image {
	position: absolute;
	left: 0;
	top: 0;
	height: 300rpx;
	width: 100%;
}
.main{
	position: absolute;
	top: 0;width: 100%;
}
.head_box{
	width: 700upx;
	height: 220upx;
	background-color: #ffffff;
	border-radius: 15upx;
}
.btn-box{
	width: 310upx;
	height: 150upx;
	border-radius: 20upx;
}
.scroll{
	height: 700rpx;
}
</style>
