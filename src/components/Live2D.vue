<template>
  <canvas ref="live2dCanvas"></canvas>
</template>

<script>
import { Application } from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

export default {
  name: 'Live2D',
  mounted() {

    const cubism2Model ="https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";

    const app = new Application({
      width: 800, 
      height: 600, 
      backgroundColor: 0x1099bb,
      view: this.$refs.live2dCanvas,
    });

    Live2DModel.from(cubism2Model).then(model => {
      app.stage.addChild(model);
      app.ticker.add((delta) => {
        model.update(delta);
      });
    });
  },
};
</script>

<style scoped>
/* 添加你的样式 */
</style>
