const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
function onReady () {
  win = new BrowserWindow({width: 600, height: 300, frame:true })
  win.loadURL(url.format({
    pathname: path.join(
    __dirname,
    'dist/poker420/browser/index.html'),
    protocol: 'file:',
    slashes: true
   })
  )
}
app.on('ready', onReady);