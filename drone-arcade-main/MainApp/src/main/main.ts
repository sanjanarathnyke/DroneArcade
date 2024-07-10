/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from 'path';
import { app, BrowserWindow, shell, ipcMain, IpcMainEvent } from 'electron';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { connectDB } from './lib/mongo';
import { Repair } from './lib/typeDefinitions';
import { Repairs } from './models/Repairs';
import { loadingProgress } from './lib/utilFuncs';

let mainWindow: BrowserWindow | null = null;

let DB_CONNECTED = false;
const repairs = new Repairs();

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.setMenuBarVisibility(false);
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      repairs.getLastJobNumber();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  //new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.on('ipc-app-ctl', async (event, args) => {
  if (args === 'close') {
    mainWindow?.close();
    app.quit();
  }

  if (args === 'minimize') {
    mainWindow?.minimize();
  }

  if (args === 'maximize') {
    mainWindow?.isMaximized()
      ? mainWindow.unmaximize()
      : mainWindow?.maximize();
  }
});

ipcMain.on('ipc-connect-db', async (event, args) => {
  loadingProgress(event, true, 's');
  if (!DB_CONNECTED) {
    try {
      await connectDB();
    } catch (err) {
      log.info(err);
      event.reply('ipc-db-failed');
    }
  }
  loadingProgress(event, false, 's');
});

ipcMain.on('ipc-insert-data', async (event, args) => {
  loadingProgress(event, true, 'l');
  log.info('>>Inserting');
  try {
    await repairs.insertRepair(args);
    event.reply('ipc-response', true);
    log.info('>>Successfully Inserted');
  } catch (e) {
    event.reply('ipc-response', false);
  }
  loadingProgress(event, false, 'l');
});

ipcMain.on('ipc-get-last-jobNumber', async (event, args) => {
  const n: String = await repairs.getLastJobNumber();
  event.reply('ipc-got-last-jobNumber', n);
});

ipcMain.on('ipc-update-data', async (event, args) => {
  log.info('>>Updating');
  loadingProgress(event, true, 'l');
  try {
    await repairs.updateRepair(args);
    log.info('>>Successfully Updated');
    event.reply('ipc-response', true);
  } catch (e) {
    event.reply('ipc-response', false);
    log.info(e);
  }
  loadingProgress(event, false, 'l');
});

ipcMain.on('ipc-get-job-by-number', async (event, args) => {
  log.info(`>>Finding Job Number ${args}`);
  loadingProgress(event, true, 'l');
  try {
    const r: Repair = await repairs.getJobByJobNumber(args);
    event.reply('ipc-got-job-by-number', r);
  } catch (err) {
    event.reply('ipc-response', false);
    log.info(err);
  }
  loadingProgress(event, false, 'l');
});

ipcMain.on('ipc-get-jobs-by-stage', async (event, args) => {
  log.info('>>Filtering Jobs');
  loadingProgress(event, true, 'l');
  const r: Repair[] = await repairs.getJobsByStage(args);
  event.reply('ipc-got-jobs-by-stage', r);
  loadingProgress(event, false, 'l');
});
