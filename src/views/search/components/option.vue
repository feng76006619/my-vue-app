<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <svg font-size="20" class="icon" aria-hidden="true">
            <use xlink:href="#picfanhui1" />
          </svg>
        </v-btn>
        <v-toolbar-title>显示选项</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>画作类型</v-list-item-title>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-list-item-subtitle v-on="on">{{ optionsParams.illustType }}</v-list-item-subtitle>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in type"
                  :key="index"
                  @click="optionsParams.illustType = item.value"
                >
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>搜索类型</v-list-item-title>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-list-item-subtitle v-on="on">{{ optionsParams.searchType }}</v-list-item-subtitle>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in searchTypes"
                  :key="index"
                  @click="optionsParams.searchType = item.value"
                >
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>发布时间</v-list-item-title>
            <v-bottom-sheet v-model="showDate">
              <template v-slot:activator="{ on }">
                <v-list-item-subtitle v-on="on">{{ optionsParams.beginDate + ' - ' + optionsParams.endDate }}</v-list-item-subtitle>
              </template>
              <v-sheet class="text-center">
                <v-date-picker
                  v-model="date"
                  full-width
                  no-title
                  color="#b9eee5"
                  locale="zh-cn"
                  multiple
                  @input="selectDate"
                />
              </v-sheet>
            </v-bottom-sheet>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>最小宽度</v-list-item-title>
            <v-text-field
              v-model="optionsParams.minWidth"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>最小高度</v-list-item-title>
            <v-text-field
              v-model="optionsParams.minHeight"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.username === 'pixivic'">
          <v-list-item-content>
            <v-list-item-title>其它</v-list-item-title>
            <v-checkbox
              v-model="optionsParams.xRestrict"
              label="xRestrict"
              :false-value="0"
              :true-value="1"
            />
            <v-text-field
              v-model="optionsParams.maxSanityLevel"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              placeholder="maxSanityLevel"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="text-center">
        <v-btn color="primary" dark width="70%" @click="setOption">按这个条件搜索</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      type: [{ text: '插画', value: 'illust' }, { text: '漫画', value: 'manga' }],
      searchTypes: [{ text: '原始', value: 'original' }, { text: '自动翻译', value: 'autoTranslate' }],
      date: [],
      showDate: false,
      optionsParams: {
        illustType: 'illust',
        searchType: 'original',
        minWidth: 0, // 最小宽度
        minHeight: 0, // 最小高度
        beginDate: null, // 画作发布日期限制
        endDate: null, // 画作发布日期限制
        xRestrict: 0,
        maxSanityLevel: 6
      }
    };
  },
  computed: {
    ...mapGetters(['user', 'option'])
  },
  mounted() {
    this.optionsParams = { ...this.optionsParams, ...this.option };
  },
  methods: {
    selectDate(val) {
      if (val.length > 2) {
        this.date.shift();
      }
      this.optionsParams.beginDate = this.date[0] || '';
      this.optionsParams.endDate = this.date[1] || '';
    },
    show() {
      this.dialog = true;
    },
    setOption() {
      const data = this.optionsParams;
      Object.keys(data).forEach(item => {
        if (!data[item]) { delete data[item]; }
      });
      this.$store.commit('SET_OPTION', data);
      this.dialog = false;
      this.$emit('setOption');
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
