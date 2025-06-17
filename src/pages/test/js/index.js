(function () {
  const { resolve } = require('path');
  const { startRecordAudioForWeb, stopRecordAudioForWeb, playAudioForWeb, exitForWindows } = require(resolve(__dirname, './js/bridge'));
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

    // 注册【录制音频】按钮按下事件
    recorderButton.addEventListener('mousedown', async () => {
      const { success, errorMessage } = await startRecordAudioForWeb();
    });
    // 注册【录制音频】按钮抬起事件
    recorderButton.addEventListener('mouseup', () => {
      const { success, errorMessage } = stopRecordAudioForWeb();
    });
    // 注册【播放音频】按钮点击事件
    playerButton.addEventListener('click', async () => {
      const { success, errorMessage } = await playAudioForWeb();
    });
    // 注册【退出程序】按钮点击事件
    exitButton.addEventListener('click', () => {
      const { success, errorMessage } = exitForWindows();
    });
  }

  registerButtonEvents();
})();
