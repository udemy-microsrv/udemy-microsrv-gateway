export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  transport: {
    nats: {
      servers: process.env.NATS_SERVERS?.split(','),
    },
  },
});
