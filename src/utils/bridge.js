const { ipcRenderer } = require('electron');
const { convertBlobToAudioBuffer, convertAudioBufferToWavData, convertWavDataToWavBlob } = require('./convert');
const { downloadUrl } = require('./download');

let mediaRecorder;
let audioChunks = [];

/**
 * Web API：开始录制音频
 */
async function startRecordAudioForWeb(callback) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioBuffer = await convertBlobToAudioBuffer(blob);
      const wavData = convertAudioBufferToWavData(audioBuffer);
      const wavBlob = await convertWavDataToWavBlob(wavData);
      const timestamp = Date.now();
      const audioFile = new File([wavBlob], `${timestamp}.wav`, { type: 'audio/wav', lastModified: timestamp });
      callback(audioFile);
    };
    mediaRecorder.start();
    return { success: true, errorMessage: '' };
  } catch (err) {
    return { success: false, errorMessage: err.message };
  }
}

/**
 * Web API：结束录制音频
 */
function stopRecordAudioForWeb() {
  try {
    mediaRecorder.stop();
    mediaRecorder = null;
    audioChunks = [];
    return { success: true, errorMessage: '' };
  } catch (err) {
    return { success: false, errorMessage: err.message };
  }
}

/**
 * Web API：播放音频
 */
async function playAudioForWeb(locationUrl) {
  // 初始化 Audio
  const audio = new Audio(`https://${locationUrl}`);
  // 播放结束销毁 Audio
  audio.addEventListener('ended', () => {
    audio.src = '';
    audio.remove();
  });
  // 播放音频
  try {
    await audio.play();
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
