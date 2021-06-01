const { loadEnv } = require('vite');
const project = loadEnv('production', process.cwd()).VITE_OUTPUT_DIR;
const os = require(`child_process`).execSync;
const ip = '172.16.200.38';
const src = 'apps/web';

function main() {
    console.log('开始部署', ip);
    build();
    move();
    effect();
}

function build() {
    console.log('打包');
    os(` yarn build `);
}

function move() {
    console.log('上传');
    try {
        os(`ssh root@${ip} "cd /${src} && rm -rf ${project}"`);
        console.log('已删除服务器旧文件');
    } catch (error) {
        console.log('删除旧文件错误');
    }
    os(` scp -r ${project} root@${ip}:/${src}`);
    console.log('上传成功');
}

function effect() {
    console.log(` http://${ip}/${project}/ `);
    try {
        os(`explorer http://${ip}/${project}/`);
    } catch (error) {}
}
