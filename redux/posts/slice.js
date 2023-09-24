import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentUserPosts: [],
    selectedPost: null,
    users: {},
  },
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts = [...state.posts, ...payload];
      state.currentUserPosts = [...state.currentUserPosts, ...payload];
    },
    setCurrentUserPosts: (state, { payload }) => {
      state.currentUserPosts = payload;
    },
    addComment: (state, { payload }) => {
      const selectedPost = state.posts.find(
        ({ postId }) => postId === state.selectedPost
      );
      selectedPost.comments = [...selectedPost.comments, payload];
      state.posts = [...state.posts];
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setSelectedPost: (state, { payload }) => {
      if (state.selectedPost !== payload) {
        state.selectedPost = payload;
      }
    },
  },
});

export const {
  addPost,
  setCurrentUserPosts,
  setPosts,
  setSelectedPost,
  addComment,
  setUsers,
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
