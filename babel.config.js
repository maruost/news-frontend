const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '15',
        and_chr: '85',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: '3.4.1',
    },
  ],
];

module.exports = { presets };
