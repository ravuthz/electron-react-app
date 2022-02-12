// require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { app, BrowserWindow } = require("electron");

const isDev = !app.isPackaged;

if (isDev) {
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    });
}

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        icon: "icon.png",
        minWidth: 1000,
        minHeight: 700,
        backgroundColor: "#2c3e50",
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
    // mainWindow.setTitle("Two Factor Authenticator");

    // ipcMain.on("main:init", async (event, key) => {
    //     event.reply("main:init");
    // });

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => { mainWindow = null });
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