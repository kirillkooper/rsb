/*
 * @title Config
 */

// Paths
export const paths = {
  src: './src',
  dest: './dist',
  deploy: './dist/**/*',
  styles: {
    src: 'src/styles/main.scss',
    watch: 'src/styles/**/*.scss',
    modules: 'src/modules/**/*.scss',
    dest: 'dist/css',
    lint: 'src/styles/**/*.s+(a|c)ss'
  },
  pages: {
    src: 'src/pages/**/*.scss',
    watch: 'src/pages/**/*.scss',
    dest: 'dist/css',
    lint: 'src/pages/**/*.s+(a|c)ss'
  },
  scripts: {
    src: './src/scripts/app.js',
    watch: 'src/scripts/**/*.js',
    modules: 'src/modules/**/*.js',
    pages: 'src/pages/**/*.js',
    dest: 'dist/js',
  },
  templates: {
    src: 'src/templates/pages/*.{twig,html}',
    watch: 'src/templates/**/*.{twig,html}',
    modules: 'src/modules/**/*.{twig,html}',
    dest: 'dist/'
  },
  assets: {
    src: 'src/assets/fonts/*',
    dest: 'dist/assets/fonts'
  },
  images: {
    src: 'src/assets/img/**/*',
    dest: 'dist/assets/img'
  },
  copy: {
    src: 'src/robots.txt',
    dest: 'dist/'
  }
};
