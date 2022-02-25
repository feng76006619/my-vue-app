<template>
  <div class="list">
    <Header title="消息列表" />
    <div class="list-content">
      <vue-better-scroll
        ref="scroll"
        class="wrapper"
        :pull-up-load="pullUpLoadObj"
        @pulling-up="getMessagesList"
      >
        <div class="list-content-inside">
          <div
            v-for="item in list"
            :key="item.id"
            v-ripple
            class="item"
            @click.stop="clickComment(item)"
          >
            <div class="avatar">
              <v-avatar
                v-if="item.actors.length === 1"
                size="40"
                @click.stop="$router.push(`/users/${item.actors[0].userId}`)"
              >
                <img :src="item.actors[0].userId | replaceAvatar">
              </v-avatar>
              <div v-else class="avatar-mul">
                <v-avatar class="one" size="40">
                  <img :src="item.actors[0].userId | replaceAvatar">
                </v-avatar>
                <v-avatar size="40">
                  <img :src="item.actors[1].userId | replaceAvatar">
                </v-avatar>
              </div>
            </div>
            <div class="comment">
              <div class="line-1">
                <span v-if="item.actors.length === 1" class="name">{{
                  item.actors[0].username
                }}</span>
                <span v-else class="name">
                  {{ item.actors[0].username }}、{{
                    item.actors[1].username
                  }}...
                </span>
                <span class="desc">{{ item.message }}</span>
              </div>
              <div v-if="item.extend" class="line-2">
                <span>{{ item.extend }}</span>
              </div>
              <div class="line-3">
                <span>{{ item.createDate | dateFormat }}</span>
              </div>
            </div>
            <div class="content">
              {{ item.objectTitle }}
            </div>
          </div>
        </div>
      </vue-better-scroll>
    </div>
    <Comment :show.sync="show" :cid="cid" />
  </div>
</template>

<script>
import VueBetterScroll from 'vue2-better-scroll';
import { mapGetters } from 'vuex';
import Header from '@/components/header/Header';
import Comment from '@/views/detail/components/Comment';

export default {
  name: 'MessageList',
  components: {
    VueBetterScroll,
    Header,
    Comment
  },
  props: ['type'],
  data() {
    return {
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '到底了～'
        }
      },
      list: [],
      show: false,
      cid: 0,
      offset: parseInt(Date.now() / 1000)
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getMessagesList();
  },
  methods: {
    getMessagesList() {
      this.$api.user
        .getReminds({
          userId: this.user.id,
          type: this.type,
          offset: this.offset
        })
        .then((res) => {
          if (res.status === 200) {
            const list = res.data.data || [];
            this.list = this.list.concat(list);
            if (this.list.length) {
              this.offset = parseInt(new Date(this.list[this.list.length - 1].createDate).getTime()) / 1000;
            }
            if (list.length < 30) {
              this.$refs.scroll.forceUpdate(false);
            } else {
              this.$refs.scroll.forceUpdate(true);
            }
          }
        });
    },
    clickComment(item) {
      this.cid = item.objectId;
      this.show = true;
    }
  }
};
</script>

<style scoped lang="stylus">
.list {
  position: relative;

  &-content {
    position: fixed;
    top: 48px;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 8px;
    box-sizing: border-box;
    background: #fff;
    z-index: 999;

    &-inside {
      width: 100%;

      .item {
        display: flex;
        padding: 12px 8px;

        .avatar {
          width: 40px;
          margin-right: 18px;

          .avatar-mul {
            position: relative;

            .one {
              position: absolute;
              top: 12px;
              left: 14px;
            }
          }
        }

        .comment {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-right: 10px;

          .line-1, .line-2 {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .line-1 {
            .name {
              color: #222;
              margin-right: 8px;
              font-weight: bold;
            }

            .desc {
              color: #505050;
            }
          }

          .line-3 {
            color: #999;
            font-size: 12px;
          }
        }

        .content {
          width: 60px;
          height: 60px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
