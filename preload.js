const { contextBridge, ipcRenderer } = require('electron');

// 暴露 uTools API 给渲染进程
contextBridge.exposeInMainWorld('uTools', {
  // 在这里可以暴露 uTools 的 API 方法
  onPluginEnter: (callback) => ipcRenderer.on('uTools:pluginEnter', callback),
  onPluginOut: (callback) => ipcRenderer.on('uTools:pluginOut', callback),
  setSubInput: (placeholder, callback) => ipcRenderer.send('uTools:setSubInput', placeholder, callback),
  hideMainWindow: () => ipcRenderer.send('uTools:hideMainWindow'),
  showMainWindow: () => ipcRenderer.send('uTools:showMainWindow'),
  // 可以根据需要添加更多 API 方法
});

// 暴露其他需要的 API
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, (event, ...args) => listener(...args)),
  },
});
