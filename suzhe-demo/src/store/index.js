import Vue from "vue";
import Vuex from "vuex";
import { GET_TOP_MENU, GET_PERMISSION } from "./actions";
import {
  MERGE_TOP_MENU,
  SELECT_CURRENT_SYSTEM,
  GET_PERMISSION_SUCCESS
} from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topMenu: [],
    currentSystem: "",
    permission: {}
  },
  getters: {
    sideMenu: state => {
      if (!state.currentSystem) return;
      const permission = state.permission[state.currentSystem];
      return (permission && permission.menu) || [];
    }
  },
  mutations: {
    [MERGE_TOP_MENU](state, { payload }) {
      state.topMenu = payload;
    },
    [SELECT_CURRENT_SYSTEM](state, sys) {
      state.currentSystem = sys;
    },
    [GET_PERMISSION_SUCCESS](state, { payload }) {
      Vue.set(state.permission, payload.sys, payload.data);
    }
  },
  actions: {
    [GET_TOP_MENU]({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          const topMenus = [
            {
              key: "cc",
              name: "成本"
            },
            {
              key: "pf",
              name: "业绩"
            }
          ];
          commit({
            type: MERGE_TOP_MENU,
            payload: topMenus
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    [GET_PERMISSION]({ commit }, sys) {
      return new Promise(async (resolve, reject) => {
        try {
          if (sys === "cc") {
            const menu = [
              {
                key: "place",
                name: "考勤设置",
                children: [
                  {
                    key: "place.myList",
                    name: "考勤体系",
                    children: [
                      {
                        path: "place.myList.management",
                        name: "考勤期段管理",
                        children: []
                      },
                      {
                        path: "place.myList.timesetting",
                        name: "工时设置",
                        children: []
                      }
                    ]
                  },
                  {
                    key: "place.list",
                    name: "考勤地点",
                    children: []
                  }
                ]
              }
            ];
            commit({
              type: GET_PERMISSION_SUCCESS,
              payload: {
                sys,
                data: {
                  menu
                }
              }
            });
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  }
});
