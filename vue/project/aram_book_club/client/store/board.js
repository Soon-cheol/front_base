export const state = () => {
  return {
    currentPage: 0
  }
}

export const mutations = {
  SET_PAGING(state, payload) {
    state.currentPage = Object.freeze(payload.num)
  }
}

export const actions = {
  // 현재 페이지 저장
  savePaging({ commit }, num) {
    commit('SET_PAGING', num)
  }
}
