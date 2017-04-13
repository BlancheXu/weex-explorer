#!/usr/bin/env node
 // 获取参数
const path = require('path');
const fs = require('fs');
// require('shelljs/global');
const shell = require('shelljs');
const ora = require('ora');
const ROOT = path.dirname(__dirname);
const DESTROOT = 'templates/';

let outputTimes = 0;
let spinner = null;

const copyDirArr = [
  'assets',
  'build',
  'customized_modules',
  'components'
  // ,
  // 'node_modules'
];

const copyFileArr = [
  'app.js',
  'index.html',
  'package.json',
  'README.md',
  'webpack.config.js',
  'weex.html'
];

// 筛选出所有公用的文件夹
const filterTmpFolder = (folders) => {
  const reg = /^\./;
  let tmpFolders = [];
  tmpFolders = folders.filter((item, index) => {
    return !reg.test(item);
  })
  return tmpFolders;
}


/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
// const copyDir = (src, dist, callback) => {
//   fs.access(dist, (err) => {
//     if (err) {
//       // 目录不存在时创建目录
//       fs.mkdirSync(dist);
//     }
//     _copy(null, src, dist);
//   });

//   const _copy = (err, src, dist) => {
//     if (err) {
//       callback(err);
//     } else {
//       fs.readdir(src, (err, paths) => {
//         if (err) {
//           callback(err)
//         } else {
//           paths.forEach((path) => {
//             const _src = src + '/' + path;
//             const _dist = dist + '/' + path;
//             fs.stat(_src, (err, stat) => {
//               if (err) {
//                 callback(err);
//               } else {
//                 // 判断是文件还是目录
//                 if (stat.isFile()) {
//                   fs.writeFileSync(_dist, fs.readFileSync(_src));
//                 } else if (stat.isDirectory()) {
//                   // 当是目录是，递归复制
//                   copyDir(_src, _dist, callback)
//                 }
//               }
//             })
//           })
//         }
//       })
//     }
//   }
// }

const folders = filterTmpFolder(fs.readdirSync('./templates'));


const dirPromise = new Promise((resolve, reject) => {

  copyDirArr.forEach((item, index) => {
    folders.forEach((val, key) => {
      // try {
      //   shell.exec(`rm -rf ${path.resolve(DESTROOT, val, item)}`, {async: false});
      // } catch(err) {
      //     console.log(err);
      // }
      
      try {
        shell.exec(`cp -r ${path.resolve(ROOT, item)} ${path.resolve(DESTROOT, val, item)}`, {slient: true}, (code) => {
          if(code == 0) {
            if(index == (copyDirArr.length - 1)) {
              resolve();
            }
          } else {
            reject(`复制文件夹失败`);
          }
        })
      } catch(err) {
          console.log(err);
      }
      
    })
  });
})

const filePromise = new Promise((resolve, reject) => {
  copyFileArr.forEach((item, index) => {
    folders.forEach((val, key) => {
      fs.stat(item, (err, stat) => {
        if (err) {
          callback(err);
        } else {
            // 判断是文件还是目录
            if (stat.isFile()) {
              // shell.exec(`rm -rf ${path.resolve(DESTROOT, val, item)}`, {async: false});
              shell.exec('cp ' + item + ' ' + DESTROOT + val  + '/' + item, {silent: true}, (code, stdout, stderr) => {
                // console.log(key)
                if(code != 0) {
                  console.log(stderr);
                  reject(`复制文件失败`);
                } else if( index == (copyFileArr.length - 1)) {
                    resolve();
                }
              });
            }
        }
      })
    })
  })
})


spinner = ora(``).start();

setTimeout(() => {
  spinner.color = 'yellow';
  spinner.text = `正在复制文件, 请稍后...`;
}, 1000);
 
Promise.all([dirPromise, filePromise]).then(function(data) {
  spinner.stop();
  console.log(`复制成功啦！`);
  // folders.forEach((item, index) => {
  //   shell.cd(path.resolve(__dirname, '../templates',item));
  //   shell.exec('npm run build', {slient: true});
  // })
}).catch((err) => {
  console.log(err);
})
  



