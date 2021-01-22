import { src, dest, series } from 'gulp';
import { reload } from './server';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import changed from "gulp-changed";
import errorHandler from '../util/errorHandler.js';
// Config
import { paths } from "../config";

export function imgmin() {
    return src(paths.images.src)
        .pipe(plumber({errorHandler}))
        .pipe(changed(paths.images.dest))
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 70, progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
        ]))
        .pipe(dest(paths.images.dest));
}
export function imgwebp() {
    return src(paths.images.src+'.{jpg,png}')
        .pipe(plumber({errorHandler}))
        .pipe(webp({quality: 65}))
        .pipe(dest(paths.images.dest));
}

export const images = series(imgmin, imgwebp, reload);

