<template>
	<view class="content">
		<view id="title">
			<view class="cu-bar  solid-bottom">
				<view class="action ">
					<text class="cuIcon-activityfill text-red"></text><text class="title">{{title}}</text> 
				</view>
			</view>
		</view>
		<view id="connect" class="margin-top-xs">
			<rich-text :nodes="nodes"></rich-text>
		</view>
	</view>
</template>

<script>
	import {post,get,showModal} from '../../utils/index.js';
	export default {
		data() {
			return {
				nodes:'山东中医药大学（Shandong University of Traditional Chinese Medicine），位于山东省济南市，是全国重点建设的中医院校、山东省重点高校、山东省人民政府和国家中医药管理局共建中医药院校、'+
						'山东省应用基础型人才培养特色名校、山东省一流学科建设单位、教育部本科教学工作水平评估优秀学校。' +
						'学前身为1955年创建的山东省中医研究所研究班和1956年创建的山东省中医进修学校。1958年，经山东省人民委员会批准创建山东中医学院。1996年，经国家教育委员会批准更名为山东中医药大学。' +
						'截至2021年3月，学校拥有三个校区，总占地2039亩，建筑面积56万平方米；图书馆馆藏图书205万册、电子图书77余万册、古籍善本近3万册；设置17个教学机构、5个科研机构、4个教辅机构，有3所直属附属医院、' +
						'20所非直属附属医院、23所教学医院；拥有35个本科专业、3个博士后科研流动站、3个一级学科博士学位授权点、15个二级学科博士学位授权点、9个一级学科硕士学位授权点、46个二级学科硕士学位授权点；'+
						'全日制在校生23000余人，其中研究生近4200人；有教职医护员工3900余人，其中博士生导师236人，硕士生导师1011人。',
				title:'关于山东中医药大学'
			}
		},
		onLoad() {
			// get(this.ali_app + 'about_us').then(res=>{
			// 	this.title = res.data.title;
			// 	this.nodes = res.data.html;
			// })
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		height: 100%;
		background: #fff;
	}
	.content{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;
	}
</style>
