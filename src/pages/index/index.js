(function () {
  const { exitForWindows } = require('./bridge');
  /**
   * 注册按钮事件函数
   */
  function registerButtonEvents() {
    // 【录制音频】按钮
    const recorderButton = document.getElementById('recorder');
    // 【播放音频】按钮
    const playerButton = document.getElementById('player');
    // 【退出程序】按钮
    const exitButton = document.getElementById('exit');

    // 注册【录制音频】按钮事件
    recorderButton.addEventListener('click', () => {
    });
    // 注册【播放音频】按钮事件
    playerButton.addEventListener('click', () => {
    });
    // 注册【退出程序】按钮事件
    exitButton.addEventListener('click', () => {
      exitForWindows();
    });
  }

  registerButtonEvents();
})();
