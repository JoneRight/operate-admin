/* eslint-disable */
export default {
  namespaced: true,
  state: {
    id: 0,
    name: "",
    realName: "",
    orgNo: "",
    orgName: "",
  },
  mutations: {
    updateId(state, id) {
      state.id = id;
    },
    updateName(state, name) {
      state.name = name;
    },
    updateRealName(state, realName) {
      state.realName = realName;
    },
    updateOrgNo(state, orgNo) {
      state.orgNo = orgNo;
    },
    updateOrgName(state, orgName) {
      state.orgName = orgName;
    },
  },
};
