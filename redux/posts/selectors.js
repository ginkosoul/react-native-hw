export const selectedPost = (state) =>
  state.posts.posts.find(({ postId }) => postId === state.posts.selectedPost);
export const selectPosts = (state) => state.posts.posts;
export const selectCurrentUserPosts = (state) => state.posts.currentUserPosts;
export const selectUsers = (state) => state.posts.users;
