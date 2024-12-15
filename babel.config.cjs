module.exports = {
  presets: [
    ['@babel/preset-env', { modules: "commonjs", targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: ["@babel/plugin-syntax-jsx"]
};