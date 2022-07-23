<template>
	<view class="container">
		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">请认真填写以下资料</text>
		</uni-card>
		<uni-section title="个人信息" type="line">
			<view class="example">
				<uni-forms ref='form' :rules='rules' v-model='formData'>
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="formData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="手机号" required name="phone">
						<uni-easyinput v-model="formData.phone" placeholder="请输入手机号" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="button-group">
				<button type="primary" @click="submit" style="width: 12rem; text-align: center;">提交</button>
			</view>
			<view class="button-group">
			</view>
			<view class="button-group">
			</view>
			<view class="button-group">
			</view>
			<view class="button-group">
			</view>
		</uni-section>
		
	</view>
</template>

<script>
	import util from '@/utils/index.js';
	export default {
		data() {
			return {
				formData: {
					openid: this.$state.openid,
					name: '',
					phone: ''
				},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}, {
							format: 'number',
							errorMessage: '手机号格式不正确'
						}]
					},
				},
			}
		},
		onLoad (option) {
			if (!this.$state.openid) return uni.navigateBack()
			if (option.info === 'login') {
				util.showToast('登录成功，请完善信息')
			} else if (option.info === 'add') {
				util.showToast('提交失败，请先完善信息')
			}
		},
		methods: {
			submit(ref) {
				let that = this;
				if (!this.formData.openid) return util.showToast('请先登录')
				this.$refs.form.validate().then(res => {
					util.post(that.$baseUrl+'/user/updateInfo', that.formData).then((result) => {
						if (result.status === 200) return util.showToast('修改成功', 'success')
						return util.showToast('修改失败', 'error')
					})
				}).catch(err => {})
			},
		}
	}
</script>

<style lang="scss">
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 5px;
		display: flex;
		justify-content: space-around;
		width: 100%;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>
