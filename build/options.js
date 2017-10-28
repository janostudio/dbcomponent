'use strict';
const path = require('path');

const banner =   '/*!\n' +
' * Keen UI v1.0.0 (https://github.com/JosephusPaye/keen-ui)\n' +
' * (c) ' + new Date().getFullYear() + ' Josephus Paye II\n' +
' * Released under the MIT License.\n' +
' */';

module.exports = {
    banner,
    isProduction: process.env.NODE_ENV === 'production',
    paths: {
        root: path.join(__dirname, '..'),
        src: {
            main: path.join(__dirname, '..', 'src'),
            docs: path.join(__dirname, '..', 'example')
        },
        output: {
            main: path.join(__dirname, '..', 'dist'),
            lib: path.join(__dirname, '..', 'lib'),
            docs: path.join(__dirname, '..', 'docs')
        },
        resolve(location) {
            return path.join(__dirname, '..', location);
        }
    }
};