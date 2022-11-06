export const state = () => {
  return {
    currentPoint: 0,
    getAddr: {}
  }
}

export const mutations = {
  SET_POINT(state, payload) {
    state.currentPoint = Object.freeze(payload)
  },
  SET_ADDR(state, payload) {
    state.getAddr = Object.freeze(payload)
  }
}

export const actions = {
  // DB에 저장된 내 포인트 가져오기
  async getPoint({ commit }) {
    try {
      const { data } = await this.$axios.get('/point/seltotholdpoint')
      console.log('point data', data)
      commit('SET_POINT', data.result.totHoldPointAmt)
    } catch (e) {
      return e
    }
  },
  // DB에 저장된 내 배송지 정보 가져오기
  async getAddr({ commit }) {
    try {
      const { data } = await this.$axios.get('/buy/selSameMemInfo')
      commit('SET_ADDR', data.result)
    } catch (e) {
      return e
    }
  }
}
