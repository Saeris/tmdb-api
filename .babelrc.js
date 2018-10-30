module.exports = {
  plugins: [
    require(`@babel/plugin-transform-runtime`),

    // Stage 1
    [require(`@babel/plugin-proposal-optional-chaining`), { loose: false }],
    [require(`@babel/plugin-proposal-pipeline-operator`), { proposal: `minimal` }],
    [require(`@babel/plugin-proposal-nullish-coalescing-operator`), { loose: false }],

    // Stage 2
    [require(`@babel/plugin-proposal-decorators`), { legacy: true }],
    require(`@babel/plugin-proposal-export-namespace-from`),

    // Stage 3
    [require(`@babel/plugin-proposal-class-properties`), { loose: false }]
  ],
  presets: [[require(`@babel/preset-env`), { targets: { node: `8.10` }, useBuiltIns: `usage` }]],
  env: {
    test: {
      sourceMaps: `inline`,
      plugins: [require(`@babel/plugin-transform-runtime`)],
      presets: [
        [require(`@babel/preset-env`), { targets: { node: `8.10` }, modules: `commonjs`, useBuiltIns: `usage` }]
      ]
    }
  }
}
