const { encode } = require('wav-encoder');

async function convertBlobToAudioBuffer(blob) {
  return new Promise(async (resolve, reject) => {
    // 校验 Blob
    if (!blob || blob.size < 1) {
      reject(new Error('blob 数据不能为空'));
      return;
    }
    // 将 Blob 转换为 ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();
    // 将 ArrayBuffer 转换为 AudioBuffer
    const audioContext = new AudioContext();
    try {
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      resolve(audioBuffer);
    } catch (err) {
      reject(err);
    }
  });
}

function convertAudioBufferToWavData(audioBuffer) {
  return {
    sampleRate: audioBuffer.sampleRate,
    channelData: Array.from(
      { length: audioBuffer.numberOfChannels },
      (_, i) => audioBuffer.getChannelData(i)
    ),
  };
}

async function convertWavDataToWavBlob(wavData) {
  return new Promise(async (resolve, reject) => {
    // 校验 sampleRate
    if (!wavData.sampleRate || wavData.sampleRate <= 0) {
      reject(new Error('无效的 sampleRate'));
      return;
    }
    // 校验 channelData 长度
    if (!Array.isArray(wavData.channelData) || wavData.channelData.length === 0) {
      reject(new Error('channelData 必须是非空数组'));
      return;
    }
    // 校验 channelData 每一项是否为 Float32Array
    for (const item of wavData.channelData) {
      if (!(item instanceof Float32Array)) {
        reject(new Error('channelData 必须包含 Float32Array 类型的数组'));
        return;
      }
    }
    // 将 wavData 转换为 wavBlob
    try {
      const wavBlob = await encode(wavData);
      resolve(wavBlob);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { convertBlobToAudioBuffer, convertAudioBufferToWavData, convertWavDataToWavBlob };
