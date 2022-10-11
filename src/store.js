import Vue from "vue";
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        blogs: [],
        token: localStorage.getItem("token") || '',
        user: {
            name: null,
            description: null
        }
    },

    //only to modify state
    mutations: {
        updateBlogs(state, blogs) {
            state.blogs = blogs
        },
        newBlog(state, newBlog) {
            state.blogs.push(newBlog)
        },
        auth(state, token) {
            state.token = token
        },
        logout(state) {
            state.token = ''
            localStorage.clear('token')
        },
        user(state, userInfo) {
            console.log("userInfo", userInfo)
            state.user = userInfo
        }
    },

    actions: {
        async getBlogs({ commit }) {
            await axios.get("http://localhost:3000/blogs").then((res) => {
                commit("updateBlogs", res.data);
            });
        },

        async createBlog({ commit }, blogObject) {
            await axios
                .post("http://localhost:3000/blogs", { blog: blogObject })
                .then((res) => {
                    commit('newBlog', res.data.details)
                });
        },
        async getBlog({ commit }, id) {
            return axios
                .get(`http://localhost:3000/blogs/${id}`)
        },
        async registerUser({ commit }, userInfo) {
            let response = (await axios
                .post("http://localhost:3000/register", userInfo)).data;
            console.log(token);
            localStorage.setItem("token", response.token);
            axios.defaults.headers.common['Authorization'] = response.token
            commit("auth", response.token)
        },

        async loginUser({ commit }, userInfo) {
            let res = (await axios
                .post("http://localhost:3000/login", userInfo)).data;
            localStorage.setItem("token", res.token);
            axios.defaults.headers.common['Authorization'] = res.token
            commit("auth", res.token)
            console.log(res);
            commit("user", { name: res.userName, description: res.description })
        },
    }
})
