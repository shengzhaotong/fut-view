<template>
	<view class="container">
		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">请认真填写以下资料</text>
		</uni-card>

		<uni-forms ref="form" :rules="rules" v-model="formData" :label-position="alignment">
			<uni-section title="预约信息" type="line">
				<view class="example">
					<uni-forms-item label="就诊时间" required name="date">
						<uni-datetime-picker type="date" return-type="timestamp" v-model="formData.date"/>
					</uni-forms-item>
					<uni-forms-item label="        " name="time">
						<uni-data-checkbox v-model="formData.time" :localdata="time"/>
					</uni-forms-item>
					<uni-forms-item required label="选择医院" name="hospital">
						<uni-data-picker v-model="formData.hospital" :localdata="hospital" popup-title="选择医院"></uni-data-picker>
					</uni-forms-item>
					<uni-forms-item label="挂号科室" required name="department">
						<uni-easyinput v-model="formData.department" placeholder="请输入挂号科室"/>
					</uni-forms-item>
					<uni-forms-item label="医师姓名" name="physician">
						<uni-easyinput v-model="formData.doctor" placeholder="请输入医师姓名"/>
					</uni-forms-item>
					<uni-forms-item label="症状描述" required name="symptom">
						<uni-easyinput type="textarea" v-model="formData.symptom" placeholder="请描述您的症状"/>
					</uni-forms-item>
				</view>
			</uni-section>
			<uni-section title="就诊人信息" type="line">
				<view class="example">
						<uni-forms-item label="就诊人姓名" required name="name">
							<uni-easyinput v-model="formData.name" placeholder="请输入就诊人姓名"/>
						</uni-forms-item>
						<uni-forms-item label="就诊人年龄" required name="age">
							<uni-easyinput v-model="formData.age" placeholder="请输入就诊人年龄"/>
						</uni-forms-item>
						<uni-forms-item label="就诊人性别" required name="sex">
							<uni-data-checkbox v-model="formData.sex" :localdata="sexs"/>
						</uni-forms-item>
						<uni-forms-item label="就诊人手机号" required name="phone">
							<uni-easyinput v-model="formData.phone" placeholder="请输入就诊人手机号"/>
						</uni-forms-item>
						<uni-forms-item required label="与就诊人关系" name="relationship">
							<uni-data-picker v-model="formData.relationship" :localdata="relationship" popup-title="与就诊人关系"></uni-data-picker>
						</uni-forms-item>
						<uni-forms-item label="基础疾病">
							<uni-data-checkbox v-model="formData.disease" multiple :localdata="health" />
						</uni-forms-item>
						<uni-forms-item label="其他" name="other">
							<uni-easyinput type="textarea" v-model="formData.other" placeholder="除上述基础疾病外,是否还有其他疾病"/>
						</uni-forms-item>
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
		</uni-forms>
		
	</view>
</template>

<script>
	import util from '@/utils/index.js';
	export default {
		data() {
			return {
				book: '研究背景（包括研究方案已得到伦理委员会的批准等）与研究目的；哪些人不宜参加研究；,' +
						'可替代的治疗措施；如果参加研究将需要做什么（包括研究过程，预期参加研究持续时间，给予的治疗方案，' +
						'告知受试者可能被分配到试验的不同组别，检查操作，需要受试者配合的事项）；根据已有的经验和试验结果推测受试者预期可能的受益，' +
						'可能发生的风险与不便，以及出现与研究相关损害的医疗与补偿等费用；个人资料有限保密问题；怎样获得更多的信息；' +
						'自愿参与研究的原则，在试验的任何阶段有随时退出研究并且不会遭到歧视或报复，其医疗待遇与权益不受影响的权力。' +
						'声明已经阅读了有关研究资料，所有的疑问都得到满意的答复，完全理解有关医学研究的资料以及该研究可能产生的风险和受益；确认已有充足的时间进行考虑；' +
						'知晓参加研究是自愿的，有权在任何时间退出本研究，而不会受到歧视或报复，医疗待遇与权益不会受到影响；同意药品监督管理部门、' +
						'伦理委员会或申办者查阅研究资料，表示自愿参加研究。签字项：执行知情同意的研究者、受试者必须亲自签署知情同意书并注明日期。' +
						'对无能力表达同意的受试者（如儿童、老年痴呆患者等），应取得其法定监护人同意及签名并注明日期。' +
						'执行知情同意过程的医师或研究小组指定的医师必须将自己的联系电话及手机号码留给受试者，以保证随时回答受试者提出的疑问或响应受试者的要求',
				relationship: [{text: "父亲",value: "父亲"}, {text: "母亲",value: "母亲"}, {text: "自己",value: "自己"}, {text: "妻子", value: "妻子"}, {text: "丈夫", value: "丈夫"}, {text: "儿子", value: "儿子"}, {text: "女儿", value: "女儿"}],
				hospital: [ { value: "省中医东院区", text: "省中医东院区"}, {value: "千佛山医院", text: "千佛山医院" }, {value: "齐鲁医院", text: "齐鲁医院"}, {value: "省中医中心院区", text: "省中医中心院区"}],
				time: [ { text: '上午', value: '上午' },{ text: '下午',value: '下午' } ],
				sexs: [ { text: '男', value: '男' }, { text: '女',value: '女' } ],
				health: [ {text: '三高', value: '三高' }, {text: '糖尿病', value: '糖尿病' } ],
				rules: {
					date: {rules: [{required: true,errorMessage: '请选择挂号时间'}]},
					time: {rules: [{required: true,errorMessage: '请选择挂号时间'}]},
					department: {rules: [{required: true,errorMessage: '请选择挂号科室'}]},
					symptom: {rules: [{required: true,errorMessage: '请描述您的症状'}]},
					sex: {rules: [{required: true,errorMessage: '性别不能为空'}]},
					phone: {rules: [{required: true,errorMessage: '手机号不能为空'}, {format: 'number',errorMessage: '手机号格式不正确'}]},
					relationship: {rules: [{required: true,errorMessage: '关系不能为空'}]},
					hospital: {rules: [{required: true,errorMessage: '请选择医院'}]},
					name: {rules: [{required: true,errorMessage: '姓名不能为空'}]},
					age: {rules: [{required: true,errorMessage: '年龄不能为空'}, {format: 'number',errorMessage: '年龄只能输入数字'}]}
				},
				formData: {
					date: null,
					time: '',
					hospital: '',
					department: '',
					doctor: '',
					symptom: '',
					name: '',
					age: '',
					sex: '',
					phone: '',
					relationship: '',
					disease: [],
					other: '',
					longitude: 0.0,
					latitude: 0.0,
					openid: this.$state.openid,
					status: 0
				}
			}
		},
		onLoad () {
			if (!this.$state.openid) {
				uni.switchTab({
					url: '../ucenter/ucenter'
				})
			} else {
				this.location()
			}
		},
		methods: {
			//经纬度必须转换为number类型
			goMap(weidu,jd){
				console.log('weidu: '+weidu)
				uni.openLocation({
					latitude: Number(weidu), 
					longitude: Number(jd),
					name: 'add',
					success() {
						console.log('success');
					}
				});
			},
			location() {
				let that = this
				if (uni.getStorageSync('position') == '') {
					uni.getLocation({
						geocode: true,
						type: 'wgs84',
						altitude:true,
						success: (res) => {
							that.formData.latitude = res.latitude
							that.formData.longitude = res.longitude
						}
					})
				}
			},
			submit(ref) {
				let that = this
				this.$refs.form.validate().then(res => {
					uni.showModal({
						title: '知情同意书',
						content: that.book,
						confirmText: '同意',
						success: function(res) {
							if (res.confirm) {
								that.formData.disease.push(that.formData.other)
								delete that.formData.other
								util.post(that.$baseUrl+'/user/appointment', that.formData).then((result)=>{
									if (result.status === 200) {
										let pages = getCurrentPages();
										let prevPage = pages[pages.length - 2]; 
										prevPage.setData({
										    commit: true
										})
										uni.navigateBack()
									} else if (result.status === 601) {
										uni.navigateTo({
											url: '../ucenter/info/update?info=add'
										})
									} else {
										util.showToast('提交失败', 'error')
									}
								})
							} else if (res.cancel) {}
						}
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
