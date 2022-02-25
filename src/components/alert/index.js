import Vue from 'vue';
import './index.styl';

const root = window.document.body;

export default function Alert(config) {
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
      title: config.title || '提示',
      content: config.content || '',
      btn: config.btn || '确定',
      html: config.html || ''
    },
    methods: {
      close() {
        root.removeChild(wrap);
        resolve('close');
      }
    },
    template: `
      <div class="pixivic-alert-wrapper">
        <div class="pixivic-overlay" />
        <div class="pixivic-alert animated bounceIn">
          <div class="pixivic-alert-title">{{ title }}</div>
          <div v-if="content" class="pixivic-alert-content">{{ content }}</div>
          <div v-if="html" class="pixivic-alert-content" v-html="html" />
          <div class="pixivic-alert-btn" @click="close">{{ btn }}</div>
        </div>
      </div>
    `
  }));
}
