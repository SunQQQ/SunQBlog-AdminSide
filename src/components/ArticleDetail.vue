<template>
  <main class="RightContent">
    <div class="ArticleDetail">
      <h1>{{ Article.Title }}</h1>
      <div v-html="Article.content"></div>
    </div>
  </main>
</template>

<script>
import TopBar from './TopBar'

export default {
  name: "ArticleDetail",
  data: function () {
    return {
      Article: ''
    }
  },
  beforeCreate: function () {
    var that = this;

    this.SQAjax({
      Url: '/api/getBlogDetail',
      RequestData: {
        id: this.$route.params.ID
      },
      Success: function (data) {
        that.Article = data;
      }
    });
  },
  mounted: function () {
    this.bus.$emit('Topbar', {
      MenuHighLight: '1-1'
    });
  },
  components: {
    TopBar: TopBar
  }
}
</script>

<style scoped></style>
