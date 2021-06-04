/**
 * 用于包装时，生成额外的配置文件。该文件可以用一些全局变量进行配置，这样就可以直接从外部改变，而不需要重新打包
 */
import { GLOB_CONFIG_NAME, GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant';
import fs, { writeFileSync } from 'fs-extra';
import chalk from 'chalk';

import { getRootPath, getEnvConfig } from '../utils';

import pkg from '../../package.json';

function createConfig(
    {
        config,
        configName = GLOB_CONFIG_NAME,
        configFileName = GLOB_CONFIG_FILE_NAME,
    }: { config: any; configName?: string; configFileName?: string } = {
        configName: '',
        config: {},
    }
) {
    try {
        const windowConf = `window.${configName}`;
        // Ensure that the variable will not be modified
        const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
        fs.mkdirp(getRootPath(OUTPUT_DIR));
        writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

        console.log(
            chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`
        );
        console.log(chalk.gray(OUTPUT_DIR + '/' + chalk.green(configFileName)) + '\n');
    } catch (error) {
        console.log(
            chalk.red('configuration file configuration file failed to package:\n' + error)
        );
    }
}

export function runBuildConfig() {
    const config = getEnvConfig();
    createConfig({ config });
}
