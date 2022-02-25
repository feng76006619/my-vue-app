import Vue from 'vue';
import './index.styl';

const root = window.document.body;

export default function Confirm(config) {
  const wrap = document.createElement('div');
  const div = document.createElement('div');
  wrap.style.position = 'absolute';
  wrap.style.width = '100%';
  wrap.style.height = '100%';
  wrap.style.left = '0';
  wrap.style.top = '0';

  root.appendChild(wrap);
  wrap.appendChild(div);

  config = config || {};

  return new Promise(resolve => new Vue({
    el: div,
    data: {
      title: config.title || '',
      content: config.content || '',
      ok: config.ok || '确定',
      cancel: config.cancel || '取消'
    },
    methods: {
      submit() {
        root.removeChild(wrap);
        resolve('submit');
      },
      close() {
        root.removeChild(wrap);
        resolve('close');
      }
    },
    template: `
      <div class="pixivic-confirm-wrapper">
        <div class="pixivic-overlay" />
        <div class="pixivic-confirm animated zoomIn">
          <div class="pixivic-confirm-title">{{ title }}</div>
          <div v-if="content" class="pixivic-confirm-content">{{ content }}</div>
          <div class="pixivic-confirm-btns">
            <div class="pixivic-confirm-btn danger" @click="close">{{ cancel }}</div>
            <div class="pixivic-confirm-btn" @click="submit">{{ ok }}</div>
          </div>
        </div>
      </div>
    `
  }));
}
