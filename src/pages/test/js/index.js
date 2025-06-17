(function () {
  const { resolve } = require('path');
  const {
    startRecordAudioForWeb,
    stopRecordAudioForWeb,
    playAudioForWeb,
    exitForWindows
  } = require(resolve(__dirname, '../../utils/bridge'));
  const upload = require(resolve(__dirname, '../../utils/upload'));
  const { showToast } = require(resolve(__dirname, '../../components/Toast'));
  const { showLoading, hideLoading } = require(resolve(__dirname, '../../components/Loading'));

  /**
   * 注册按钮事件函数
   */
  function registerButtonEvents() {
    // 【录制音频】按钮
    const recorderButton = document.getElementById('recorder');
    // 【播放音频】按钮
    const playerButton = document.getElementById('player');
    // 【上传文件】按钮
    const uploaderButton = document.getElementById('uploader');
    // 【退出程序】按钮
    const exitButton = document.getElementById('exit');

    let audioSrc = '';

    const uploadAudioFile = (audioFile) => {
      showLoading('音频上传中...');
      upload(audioFile).then((data) => {
        audioSrc = data.Location;
        hideLoading();
        showToast(`音频上传成功`);
      }).catch((err) => {
        hideLoading();
        showToast(`音频上传失败`);
      });
    };

    // 注册【录制音频】按钮按下事件
    recorderButton.addEventListener('mousedown', async () => {
      const { success, errorMessage } = await startRecordAudioForWeb(uploadAudioFile);
      if (!success) {
        showToast(errorMessage);
        return;
      }
      showToast('开始录制音频');
    });
    // 注册【录制音频】按钮抬起事件
    recorderButton.addEventListener('mouseup', () => {
      const { success, errorMessage } = stopRecordAudioForWeb();
      if (!success) {
        showToast(errorMessage);
        return;
      }
      showToast('结束录制音频');
    });
    // 注册【播放音频】按钮点击事件
    playerButton.addEventListener('click', async () => {
      const { success, errorMessage } = await playAudioForWeb(audioSrc);
      if (!success) {
        showToast(errorMessage);
        return;
      }
      showToast('开始播放音频');
    });
    // 注册【上传文件】按钮点击事件
    uploaderButton.addEventListener('click', () => {
      const audioBlob = new Blob([], { type: 'audio/wav' });
      const timestamp = Date.now();
      const audioFile = new File([audioBlob], `test-${timestamp}.wav`, { type: 'audio/wav', lastModified: timestamp });
      uploadAudioFile(audioFile);
    });
    // 注册【退出程序】按钮点击事件
    exitButton.addEventListener('click', () => {
      const { success, errorMessage } = exitForWindows();
      if (!success) {
        showToast(errorMessage);
        return;
      }
      showToast('退出程序');
    });
  }

  registerButtonEvents();
})();
