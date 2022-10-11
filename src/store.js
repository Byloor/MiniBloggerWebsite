import Vue from "vue";
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        blogs: [],
        token: localStorage.getItem("token") || '',
        user: {
            username: null,
            description: null
        },
        newBlog: {}
    },

    //only to modify state
    mutations: {
        updateBlogs(state, blogs) {
            state.blogs = blogs
        },
        newBlog(state, newBlogIn) {
            state.blogs.push(newBlogIn)
            state.newBlog = newBlogIn
        },
        auth(state, token) {
            state.token = token
        },
        logout(state) {
            state.token = ''
            localStorage.clear('token')
        },
        user(state, userInfo) {
            state.user = userInfo
        }
    },

    actions: {
        async getBlogs({ commit }) {
            return await axios.get("http://localhost:3000/blogs").then((res) => {
                commit("updateBlogs", res.data);
            });
        },

        async createBlog({ commit }, blogObject) {


            await axios
                .post("http://localhost:3000/blogs", { blog: blogObject })
                .then((res) => {
                    commit('newBlog', res.data)
                    console.log("Messgae", res.data);
                    return res
                });
        },
        async getBlog({ commit }, id) {
            return axios
                .get(`http://localhost:3000/blog/${id}`)
        },
        async registerUser({ commit }, userInfo) {
            let response = (await axios
                .post("http://localhost:3000/register", userInfo)).data;
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

            commit("user", { username: res.username, description: res.description })
        },
    },
    getters: {
        isUserAuthenticated: state => !!state.token
    }
})
