import Vue from 'vue';
import './index.styl';

const root = window.document.body;

export default function Toast(config) {
  const wrap = document.createElement('div');
  const div = document.createElement('div');

  root.appendChild(wrap);
  wrap.appendChild(div);

  config = config || {};

  return new Promise(resolve => new Vue({
    el: div,
    data: {
      content: config.content || '',
      timeout: config.timeout || 1500,
      background: config.background || 'rgba(0, 0, 0, 0.7)',
      color: config.color || '#fff',
      toast: false
    },
    mounted() {
      setTimeout(() => {
        this.toast = true;
      }, this.timeout);
      setTimeout(() => {
        this.close();
      }, this.timeout + 1000);
    },
    methods: {
      close() {
        root.removeChild(wrap);
        resolve(this);
      }
    },
    template: `
      <div class="pixivic-toast" :class="{'opacity0': toast}">
        <div class="pixivic-toast-content" :style="{'background-color': background, 'color': color}">
          {{content}}
        </div>
      </div>
    `
  }));
}
