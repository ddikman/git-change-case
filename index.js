#! /usr/bin/env node

const find = require('find')
const path = require('path')

// get the first command argument
const searchPath = process.argv[2];

const extension = process.argv.length > 2 ? process.argv[3] : 'tsx';
const regex = new RegExp(`.*\\.${extension}$`, 'ig');

// convert path to absolute
const absolutePath = path.resolve(searchPath);

// find all files recursively in this path
console.log(`finding files in ${absolutePath}`)
const files = find.fileSync(regex, absolutePath);

function getKebabCase(str) {
    return str.replace(/_/g, '-').toLowerCase();
}

// for each file
for (let file of files) {
    const name = path.basename(file)
    const kebab = getKebabCase(name)
    if (name === kebab) {
        console.log(`${name} [OK]`)
    } else {
        const newPath = path.join(path.dirname(file), kebab)
        // run git mv in a sync subprocess
        require('child_process').execSync(`git mv ${file} ${newPath}`)
        console.log(`${name} -> ${kebab} [RENAMED]`)
    }
}

