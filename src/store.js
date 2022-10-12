import Vue from "vue";
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex);
const user = localStorage.getItem('user');
export const store = new Vuex.Store({
    state: {
        blogs: [],
        currentUserBlogs: [],
        token: localStorage.getItem("token") || '',
        user: user || null,
        newBlog: {}
    },

    //only to modify state
    mutations: {
        updateBlogs(state, blogs) {
            state.blogs = blogs
        },
        updateCurrentUserBlogs(state, currentUserBlogs) {
            state.currentUserBlogs = currentUserBlogs
        },
        newBlog(state, newBlogIn) {
            state.blogs.push(newBlogIn)
            state.newBlog = newBlogIn
        },
        deleteBlog(state, blogId) {
            const blogtobedeleted = state.blogs.findIndex(blog => {
                return blog.id === blogId;
            });
            state.blogs.splice(blogtobedeleted, 1)
            state.currentUserBlogs.splice(blogtobedeleted, 1)
        },
        auth(state, token) {
            state.token = token
        },
        logout(state) {
            state.token = '',
                state.user = null
            localStorage.clear('token')
            localStorage.clear('user')
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
                    return res
                });
        },
        async updateBlog({ commit }, blogObject) {
            console.log( blogObject)
            await axios
                .put(`http://localhost:3000/blog/${blogObject.id}`, blogObject)
                .then((res) => {
                    return res
                });
        },
        async getBlogsByUserid({ commit }, userid) {
            if (!userid) {
                console.error("userid is null")
                return;
            }

            return await axios.get(`http://localhost:3000/blogs/${userid}`).then((res) => {
                commit("updateCurrentUserBlogs", res.data);
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
            localStorage.setItem("user", userInfo);
            axios.defaults.headers.common['Authorization'] = res.token
            commit("auth", res.token)

            commit("user", { id: res.id, username: res.username, description: res.description })
        },
    },
    getters: {
        isUserAuthenticated: state => {
            const userExist = state.user ? !!state.user.id : !!state.user;
            return !!state.token && userExist
        }
    }
})
