export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  microsrv: {
    product: {
      host: process.env.MICROSRV_PRODUCT_HOST,
      port: process.env.MICROSRV_PRODUCT_PORT,
    },
    order: {
      host: process.env.MICROSRV_ORDER_HOST,
      port: process.env.MICROSRV_ORDER_PORT,
    },
  },
});
