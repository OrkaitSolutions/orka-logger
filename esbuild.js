const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        outdir: 'dist',
        bundle: true,
        sourcemap: true,
        platform: "node",
        minify: true,
        splitting: true,
        format: 'esm',
        target: ['es2020']
    })
    .catch(() => process.exit(1));