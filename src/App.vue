

<template>
  <div>
    <NavMenu />
  </div>
  <RouterView />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import {useBookmarksStore} from "@/stores/bookmarks.js"

export default {

  components: {
    NavMenu
  },
  setup() {
    const bookmarksStore = useBookmarksStore()
		bookmarksStore.init()
  },
};


</script>

<style lang="scss" >
.p-panel p {
  line-height: 1.5;
  margin: 0;
}

.p-panel.p-component .p-panel-header {
  padding: 0.5rem 1rem !important;
}
</style>