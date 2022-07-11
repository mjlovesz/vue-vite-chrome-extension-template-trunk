<template>
  <div>
    <Card>
      <template #content>
        <div class="p-fluid grid formgrid">
          <div class="field col-12 md:col-4 md:col-offset-4">
            <Search />
          </div>
        </div>
        <Divider />
        <MacyContainer> 
          
          <!-- bookmarksFolders -->
          <Panel :header="folderInfo.title" v-for="(folderInfo, index) in bookmarksFolders.map(getSiteInfo)" :key="index"
            :value="index">
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
        </MacyContainer>
      </template>
    </Card>
  </div>
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
  setup() {
    
    // BOOKMARKS
    const bookmarksStore = useBookmarksStore()
    const bookmarksFolders = computed(() => bookmarksStore.folderList)
    const getSiteInfo = (id) => {
      return bookmarksStore.sitesAndFolders[id]
    }
    // BOOKMARK MENU
    const iniTBookMarkMenu = (folderInfo) => {
      console.log(folderInfo)
      let menuBookmark = [{
        label: 'setting bookmarks',
        icon: 'pi pi-refresh',
        url: `edge://favorites/?id=${folderInfo.id}`
      },
      {
        separator: true
      }]
      macyPanelMenuItems.splice(0, macyPanelMenuItems.length, ...menuBookmark, ...macyMenuItems)
      return true
    }

    return {
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