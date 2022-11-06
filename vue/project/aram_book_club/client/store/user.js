export const state = () => {
  return {
    phoneAgency: [],
    viewMode: '',
    userToken: ''
  }
}

export const mutations = {
  SET_AGENCY(state, payload) {
    state.phoneAgency = Object.freeze(payload)
  },
  SET_VIEW_MODE(state, payload) {
    state.viewMode = Object.freeze(payload)
  },
  SET_USER_TOKEN(state, payload) {
    state.userToken = Object.freeze(payload)
  }
}

export const actions = {
  // 로그인
  login({ state, dispatch }, user) {
    return this.$auth.loginWith('local', {
      data: user
    })
  },
  fetchUser() {
    return this.$auth.fetchUser()
  },
  logout() {
    localStorage.setItem('trlvrsnDays', 'false')
    return this.$auth.logout()
  },
  // 통신사 가져오기
  async phoneAgencyGet({ commit }, user) {
    try {
      const { data } = await this.$axios.post('code/codelist', {
        hgrkCd: 'MNO_CD'
      })
      commit('SET_AGENCY', data.result)
    } catch (e) {
      console.log('err', e)
      return e
    }
  },
  // 뷰모드
  async viewMode({ commit }, size) {
    console.log('store size', size)
    commit('SET_VIEW_MODE', size)
  },
  // 토큰
  async userToken({ commit }, token) {
    commit('SET_USER_TOKEN', token)
  }
}
