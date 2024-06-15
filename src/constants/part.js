export const MANAGER = "manager";

export const PATH = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  MANAGER:{
    DASHBOARD: `/${MANAGER}`,
    PRODUCT: `/${MANAGER}/product`,
    USER: `/${MANAGER}/user`,
    EMPLOYEE: `/${MANAGER}/employee`,
  },
  USER: {
    PRODUCT: `product`
  }
}
