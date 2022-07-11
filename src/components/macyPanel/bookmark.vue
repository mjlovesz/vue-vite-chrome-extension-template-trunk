<template>
  <!-- bookmarksFolders -->
  <Panel :header="folderInfo.title" :key="index" :value="index">
    <template #icons>
      <button class="p-panel-header-icon p-link mr-2" @click="iniTBookMarkMenu(folderInfo) && showMacyMenu($event)">
        <span class="pi pi-cog"></span>
      </button>
    </template>
    <div class="card flex text-overflow-ellipsis pb-1 mb-1 cursor-pointer hover:surface-hover"
      v-for="(siteInfo, index) in folderInfo.children.map(getSiteInfo)" :key="index" :value="index"
      @click="openUrl(siteInfo.url)">
      <Avatar :image="`chrome://favicon/${siteInfo.url}`" class="mr-2 flex-shrink-0" shape="circle"
        style="width: 1.2rem; height: 1.2rem" />
      <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis">
        {{ siteInfo.title }}
      </div>
    </div>
  </Panel>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import Search from '@/components/Search.vue'
import { useBookmarksStore } from "@/stores/bookmarks.js"
import MacyContainer from '@/components/MacyContainer.vue'

export default {
  components: {
    Search, MacyContainer
  },
  setup(props) {
    console.debug(props)
    const folderInfo = ref(props.info)
    const uid = ref(`bookmark_${folderInfo.id}`)
    // BOOKMARKS
    const bookmarksStore = useBookmarksStore()
    const getSiteInfo = (id) => {
      return bookmarksStore.sitesAndFolders[id]
    }
    
    let menuBookmark = [{
      label: 'setting bookmarks',
      icon: 'pi pi-refresh',
      url: `edge://favorites/?id=${folderInfo.id}`
    },
    {
      separator: true
    }]
    
    return {
      folderInfo, uid,
      bookmarksFolders, getSiteInfo, iniTBookMarkMenu,
    };
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