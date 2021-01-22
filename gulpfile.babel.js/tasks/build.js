/*
 * @title Build
 * @description A task to compile production code.
 */

// Dependencies
import { series, parallel } from 'gulp';

// Tasks
import { clean } from './clean';
import { styles } from './styles';
import { pagescss } from './pages';
import { scripts } from './scripts';
import { templates } from './templates';
import { assets } from './assets';
import { images } from './images';
import { copy } from './copy';

// Config
import { paths } from "../config";

export const build = series(
  clean,
  parallel(styles, scripts, pagescss, templates, assets, copy, images)
);
