/*
 * @title Styles
 * @description A task to compile Sass to CSS.
 */

// Dependencies
import { src, dest, series } from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import webpcss from "gulp-webpcss";
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import gulpStylelint from 'gulp-stylelint';
import errorHandler from '../util/errorHandler.js';
import { isProd } from "../util/env.js"

import { reload } from '../tasks/server';
import browserSync from 'browser-sync'

// Config
import { paths } from "../config";


export function scss() {
    return src(paths.pages.src)
        .pipe(plumber({errorHandler}))
        .pipe(gulpif(isProd, sourcemaps.init() ))
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: ['node_modules'],
            outputStyle: 'compressed'
        }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(webpcss({
            webpClass:'.webp',
            replace_from:/\.(png|jpg|jpeg)/,
            replace_to:'.webp',
        }))
        .pipe(gulpif(isProd, sourcemaps.write('.') ))
        .pipe(dest(paths.pages.dest))
        .pipe(browserSync.stream())
}

export function stylelint() {
    return src(paths.pages.watch)
        .pipe(gulpStylelint({
            failAfterError: isProd,
            reporters: [{ formatter: 'string', console: true }],
            syntax: 'scss'
        }));
}

export const pagescss = series(stylelint, scss);
