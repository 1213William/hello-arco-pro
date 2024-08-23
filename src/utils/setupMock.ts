export default (config: { mock?: boolean; setup: () => void }) => {
  // const { mock = process.env.NODE_ENV === 'development', setup } = config;
  const { mock = true, setup } = config;
  if (mock === false) return;
  setup();
};
