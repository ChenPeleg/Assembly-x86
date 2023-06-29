export const getScreenMediaState = () => {
  // This is a new file
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  const isMobile = width < 576;
  return {
    width,
    height,
    isMobile,
  };
};
