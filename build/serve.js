const shell = require('shelljs');
const program = require('commander');

program
  .version('0.0.1')
  .option('-p, --port [port]', 'Add the specified type of cheese [marble]', '8080')
  .parse(process.argv);

const port = process.argv[2] || 8080;

shell.exec('serve -p ' + port, {slient: true}, (code, stdout, stderr) => {
if(code != 0) {
  console.log('请输入正确的命令，eg：\n npm run serve -p 8080');
}
});