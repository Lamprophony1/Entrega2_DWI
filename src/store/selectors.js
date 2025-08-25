

export const selectTotalItems = state =>
  state.cart.reduce((sum, p) => sum + p.quantity, 0);

export const selectTotalPrice = state =>
  state.cart.reduce((sum, p) => sum + p.quantity * p.price, 0);