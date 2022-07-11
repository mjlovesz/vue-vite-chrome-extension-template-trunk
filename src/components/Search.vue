<template>
  <div class="p-inputgroup">

    <span class="p-float-label">
      <InputText id="searchInput" type="text" v-model="searchText" @input="showSearchSuggest" @focus="showSearchSuggest"/>
      <label for="searchInput">Search</label>
    </span>
    <Button icon="pi pi-search" class="p-button-rounded p-button-success p-button-text" @click="toggle" />

    <OverlayPanel ref="suggestionCompent" appendTo="body" id="overlay_panel"
      :breakpoints="{ '960px': '75vw' }">
      <div class="grid"  style="min-width: 600px;">
        <div :class="suggestionClasses" v-if="suggestions.searcher.length > 0" style="min-width: 200px;max-width: 500px;">
          <Panel header="suggestion">
            <div class="card flex text-overflow-ellipsis mb-2 hover:surface-hover" v-for="(siteInfo, index) in suggestions.searcher"
              :key="index" @click="openUrl(siteInfo.url)">
              <Avatar :image="`chrome://favicon/${siteInfo.url}`" class="mr-2 flex-shrink-0" shape="circle"
                style="width: 1.2rem; height: 1.2rem" />
              <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis">
                {{ siteInfo.title }}
              </div>
            </div>
          </Panel>
        </div>
        <div :class="suggestionClasses" v-if="suggestions.bookmarks.length > 0" style="min-width: 200px;max-width: 500px;">
          <Panel header="bookmarks">
            <div class="card flex text-overflow-ellipsis mb-2 hover:surface-hover" v-for="(siteInfo, index) in suggestions.bookmarks"
              :key="index" @click="openUrl(siteInfo.url)">
              <Avatar :image="`chrome://favicon/${siteInfo.url}`" class="mr-2 flex-shrink-0" shape="circle"
                style="width: 1.2rem; height: 1.2rem" />
              <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis">
                {{ siteInfo.title }}
              </div>
            </div>
          </Panel>
        </div>
        <div :class="suggestionClasses" v-if="suggestions.history.length > 0" style="min-width: 200px;max-width: 500px;">
          <Panel header="historys">
            <div class="card flex text-overflow-ellipsis mb-2 hover:surface-hover" v-for="(siteInfo, index) in suggestions.history"
              :key="index" @click="openUrl(siteInfo.url)">
              <Avatar :image="`chrome://favicon/${siteInfo.url}`" class="mr-2 flex-shrink-0" shape="circle"
                style="width: 1.2rem; height: 1.2rem" />
              <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis">
                {{ siteInfo.title }}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </OverlayPanel>

  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { searchBookmark, searchHistory, openUrl } from "@/utils/chrome.js"
import { getSuggestion, getSearcherUrl } from "@/utils/search.js"

export default {
  setup() {
    const searchText = ref("");

    const suggestions = reactive({
      bookmarks: [],
      searcher: [],
      history: [],
    })
    const refreshSugBookmarks = () => {
      searchBookmark(searchText.value).then((bookmarksList) => {
        suggestions.bookmarks = bookmarksList
      })
    }
    const refreshSugHistorys = () => {
      searchHistory(searchText.value).then((historyList) => {
        suggestions.history = historyList
      })
    }
    const refreshSugSearcher = () => {
      getSuggestion(searchText.value, (suggests) =>{
        suggestions.searcher = suggests.map(sugText=>{
          return {
          title: sugText,
          url: getSearcherUrl(sugText)
        }})
      })
    }

    const suggestionCompent = ref()
    const showSearchSuggest = (event) => {
      refreshSugBookmarks()
      refreshSugHistorys()
      refreshSugSearcher()
      suggestionCompent.value.show(event);
    };

    const suggestionClasses = computed(()=>{
      let suggestCount = 0
      if (suggestions.bookmarks.length > 0) {
        ++suggestCount
      }
      if (suggestions.searcher.length > 0) {
        ++suggestCount
      }
      if (suggestions.history.length > 0) {
        ++suggestCount
      }
      console.log(suggestCount)
      if (suggestCount == 3) {
        return ["col-12", "md:col-4"]
      } else if(suggestCount == 2) {
        return ["col-12", "md:col-6"]
      } else{
        return ["col-12"]
      }
    })


    const items = ref([]);

    return {
      items,
      searchText,
      suggestions,
      suggestionCompent,
      suggestionClasses,
      showSearchSuggest,
      openUrl,
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