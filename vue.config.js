module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/poetry-mini-game/" // ← replace with your GitHub repo name
      : "/",
};
