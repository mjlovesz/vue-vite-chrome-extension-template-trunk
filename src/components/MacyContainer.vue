<template>
  <div id="macy-container">
    <ContextMenu ref="macyPanelMenu" :model="macyPanelMenuItems" />
    <slot>

    </slot>
  </div>
  <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }" :modal="true">


    <PickList v-model="products" listStyle="height:342px" dataKey="id">
      <template #sourceheader>
        Boxes
      </template>
      <template #targetheader>
        Selected
      </template>
      <template #item="slotProps">
        <div class="product-item">
          <div class="image-container">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" />
          </div>
          <div class="product-list-detail">
            <h6 class="mb-2">{{ slotProps.item.name }}</h6>
            <i class="pi pi-tag product-category-icon"></i>
            <span class="product-category">{{ slotProps.item.category }}</span>
          </div>
          <div class="product-list-action">
            <h6 class="mb-2">${{ slotProps.item.price }}</h6>
            <span
              :class="'product-badge status-' + slotProps.item.inventoryStatus.toLowerCase()">{{ slotProps.item.inventoryStatus }}</span>
          </div>
        </div>
      </template>
    </PickList>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
      <Button label="Save" icon="pi pi-check" @click="closeModal" autofocus />
    </template>
  </Dialog>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { macyInit } from "@/utils/macy.js"
import Search from '@/components/Search.vue'
import { openUrl } from "@/utils/chrome.js"

export default {
  components: {
    Search
  },
  setup(props, context) {
    const defaults = context.slots.default();
    console.log(context, defaults)
    // MACY ITEMS
    const macyItems = computed(() => {
      return [...bookmarksStore.folderList]
    })


    // MACY SETTING DIALOG
    const displayModal = ref(false);
    const closeModal = () => {
      displayModal.value = false;
    }

    // MACY MENU
    const macyPanelMenuItems = reactive([])
    const macyMenuItems = [{
      label: 'show settings',
      icon: 'pi pi-external-link',
      command: () => {
        displayModal.value = true;
      }
    }]
    const macyPanelMenu = ref()
    const showMacyMenu = (event) => {
      console.log(event)
      macyPanelMenu.value.toggle(event);
    };


    // mounted
    onMounted(() => {
      macyInit()
    });

    return {
      macyPanelMenu, macyPanelMenuItems, showMacyMenu,
      openUrl, displayModal, closeModal, macyItems
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