<template>
	<view class="padding-top">
		<form>
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>我的信息<text class="text-gray text-sm padding-left-sm"></text>
					</view>
				</view>
			</view>
			<view class="card-menu cu-list menu" >
				<view class="cu-item" >
					<view class="content">学号：</view>
					<view class="action">{{attendant.id}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">姓名：</view>
					<view class="action">{{attendant.name}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">手机号：</view>
					<view class="action">{{attendant.phone}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">专业年级班级：</view>
					<view class="action">{{attendant.group}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">陪诊次数：</view>
					<view class="action">{{attendant.num}}</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				attendant: {}
			}
		},
		onShow () {
			this.attendant = this.$state.attendantInfo
		}
	}
</script>

<style>

</style>
