const { ipcRenderer } = require('electron');

let mediaRecorder;
let audioChunks = [];
let audioBlob;

async function startRecord() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  // 监听数据可用事件
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
  // 监听录制结束事件
  mediaRecorder.onstop = async () => {
    audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  };
  // 开启录制（每1s收集一次数据）
  mediaRecorder.start(1000);
}

/**
 * Web API：开始录制音频
 */
async function startRecordAudioForWeb() {
  try {
    await startRecord();
    return { success: true, errorMessage: '' };
  } catch (err) {
    return { success: false, errorMessage: err.message };
  }
}

/**
 * Web API：结束录制音频
 */
function stopRecordAudioForWeb() {
  mediaRecorder.stop();
  mediaRecorder = null;
  audioChunks = [];
  audioBlob = null;
  return { success: true, errorMessage: '' };
}

/**
 * Web API：播放音频
 */
async function playAudioForWeb() {
  const player = document.querySelector('audio');
  player.src = URL.createObjectURL(audioBlob);
  try {
    await player.play();
    return { success: true, errorMessage: '' };
  } catch (err) {
    return { success: false, errorMessage: err.message };
  }
}

/**
 * Windows API：退出程序
 */
function exitForWindows() {
  ipcRenderer.invoke('exit');
  return { success: true, errorMessage: '' };
}

module.exports = {
  startRecordAudioForWeb,
  stopRecordAudioForWeb,
  playAudioForWeb,
  exitForWindows,
};
