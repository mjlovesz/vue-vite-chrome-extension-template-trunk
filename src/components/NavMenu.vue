<template>
  <Menubar :model="items">
    <template #start>
      <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40"
        class="mr-2" />
    </template>
    <template #end>
      <InputText placeholder="Search" type="text" />
    </template>
  </Menubar>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const items = ref([
      {
        label: "home",
        icon: "pi pi-fw pi-home",
        command: (event) => {
          router.push("/")
        }
      },
      {
        label: "options",
        icon: "pi pi-fw pi-th-large",
        command: (event) => {
          router.push("/options")
        }
      },
      {
        label: "about",
        icon: "pi pi-fw pi-exclamation-circle",
        command: (event) => {
          router.push("/about")
        }
      },
      {
        label: "test",
        icon: "pi pi-fw pi-exclamation-circle",
        command: (event) => {
          chrome.runtime.sendMessage("test", (data)=>{
            console.log(data)
          });
        }
      },
    ]);

    return { items };
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