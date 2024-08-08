"use strict";
const fs = require("fs");
const path = require("path");
const files = [];
const sortDir = (maniDir) => {
    const folders = [];
    const CheckFile = (filePath) => fs.statSync(filePath).isFile();
    const sortPath = (dir) => {
        fs.readdirSync(dir)
            .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
            .forEach((res) => {
                const filePath = path.join(dir, res);
                if (CheckFile(filePath)) {
                    const nuevo = dir.split("\\");
                    const ultimo = nuevo.pop();
                    const array = ultimo + "/" + res;

                    files.push(array);
                } else {
                    const nuevo = dir.split("\\");
                    const ultimo = nuevo.pop();
                    const array = ultimo + "/" + res;
                    folders.push(array);
                }
            });
    };
    folders.push(maniDir);
    let i = 0;
    do {
        sortPath(folders[i]);
        i += 1;
    } while (i < folders.length);
};
sortDir(__dirname);
module.exports = files;
