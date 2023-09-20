export const selectIsAuth = (state) => Boolean(state.user?.uid);
export const selectUser = (state) => state.user;
