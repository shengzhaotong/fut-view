import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	
	state: {
		
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		sessionKey: uni.getStorageSync('sessionKey') ? JSON.parse(uni.getStorageSync('sessionKey')) : '',
		openid: uni.getStorageSync('openid') ? JSON.parse(uni.getStorageSync('openid')) : '',
		attendantInfo: JSON.parse(uni.getStorageSync('attendantInfo') || '{}'),
		adminInfo: JSON.parse(uni.getStorageSync('adminInfo') || '{}')
		
	},
	
	mutations: {
		
		updateAdminInfo (state, adminInfo) {
			state.adminInfo = adminInfo
			this.commit('saveAdminInfoToStorage')
		},
		saveAdminInfoToStorage (state) {
			uni.setStorageSync('adminInfo', JSON.stringify(state.adminInfo))
		},
		
		updateAttendantInfo (state, attendantInfo) {
			state.attendantInfo = attendantInfo
			this.commit('saveAttendantInfoToStorage')
		},
		saveAttendantInfoToStorage (state) {
			uni.setStorageSync('attendantInfo', JSON.stringify(state.attendantInfo))
		},
		
		updateUserInfo (state, userInfo) {
			state.userInfo = userInfo
			this.commit('saveUserInfoToStorage')
		},
		saveUserInfoToStorage (state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		
		updateSessionKey (state, session_key) {
			state.sessionKey = session_key
			this.commit('saveSessionKeyToStorage')
		},
		saveSessionKeyToStorage (state) {
			uni.setStorageSync('sessionKey', JSON.stringify(state.sessionKey))
		},
		
		updateOpenId (state, openid) {
			state.openid = openid
			this.commit('saveOpenIdToStorage')
		},
		saveOpenIdToStorage (state) {
			uni.setStorageSync('openid', JSON.stringify(state.openid))
		}
		
	}
	
});

export default store
