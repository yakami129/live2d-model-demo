<template>
  <canvas ref="live2dCanvas"></canvas>
</template>

<script>
import { Application } from '@pixi/app';
import { Live2DModel } from 'pixi-live2d-display';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { InteractionManager } from '@pixi/interaction';
import { Renderer } from '@pixi/core';

Live2DModel.registerTicker(Ticker);
Application.registerPlugin(TickerPlugin);
Renderer.registerPlugin('interaction', InteractionManager);

export default {
  name: 'Live2D',
  mounted() {
    const app = new Application({
      backgroundColor: 0x1099bb,
      view: this.$refs.live2dCanvas,
      resizeTo: window  // 添加这行代码来自动调整画布尺寸
    });

    const modelPath = '/model/Hiyori/Hiyori.model3.json';  // 获取模型文件的本地路径
    console.log(modelPath);
    const canvasWidth = app.renderer.width;  // 获取画布的宽度
    const canvasHeight = app.renderer.height;  // 获取画布的高度

    Live2DModel.from(modelPath).then(model => {
        
        // 缩小模型
        model.scale.set(0.15);

        // 计算模型应该居中显示的位置
        const modelWidth = model.width;
        const modelHeight = model.height;
        const offsetX = (canvasWidth - modelWidth) / 2;
        const offsetY = (canvasHeight - modelHeight) / 2;

        // 设置模型的位置
        model.x = offsetX;
        model.y = offsetY;

        // 将模型添加到舞台
        app.stage.addChild(model);

        // 更新模型
        app.ticker.add((delta) => {
          model.update(delta);
        });

    })
  },
};
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
