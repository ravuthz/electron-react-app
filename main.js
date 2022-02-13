require("dotenv").config();

const path = require("path");
const { app, BrowserWindow } = require("electron");

const {
  REACT_APP_BACKGROUND_COLOR,
  ELECTRON_APP_MIN_WIDTH,
  ELECTRON_APP_MIN_HEIGHT,
  ELECTRON_APP_WIDTH,
  ELECTRON_APP_HEIGHT,
} = process.env;
const isDev = !app.isPackaged;

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

let mainWindow;

const minWidth = ELECTRON_APP_MIN_WIDTH || 850; // 570;
const minHeight = ELECTRON_APP_MIN_HEIGHT || 638; // 640;
const width = ELECTRON_APP_WIDTH || minWidth;
const height = ELECTRON_APP_HEIGHT || minHeight;

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    icon: "icon.png",
    width,
    height,
    minWidth,
    minHeight,
    backgroundColor: REACT_APP_BACKGROUND_COLOR,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      worldSafeExeciteJavaScript: true,
      // preload: path.join(__dirname, "public/preload.js"),
    },
  });

  if (isDev) {
    mainWindow.maximize();
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile("build/index.html");
    // mainWindow.loadFile(path.join(__dirname, "public", "index.html"));
  }

  // mainWindow.setMenuBarVisibility(false);
  // mainWindow.setTitle(process.env.REACT_APP_TITLE);

  // ipcMain.on("main:init", async (event, key) => {
  //     event.reply("main:init");
  // });

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
