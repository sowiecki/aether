import path from 'path';

export const NUM_LEDS = process.env.NUM_LEDS || 200;

export const SERVER_PORT = process.env.PORT || 3000;
export const WEB_SOCKET_PORT = process.env.WEB_SOCKET_PORT || 4001;

const ROOT = '../../';
export const PUBLIC_PATH = path.join(__dirname, ROOT, 'public');
export const BUNDLE_PATH = '/dist/bundle.js';
export const VIEWS_PATH = path.join(__dirname, ROOT, 'views');
