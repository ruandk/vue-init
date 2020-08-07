module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      // 设计图为750
      remUnit: 75,
      exclude: /node_modules/i
    }
  }
}
