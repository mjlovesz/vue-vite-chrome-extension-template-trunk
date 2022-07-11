import { defineStore } from 'pinia'
import { getLocalData, setLocalData, getBookmarkTree, setBookmarkTreeChangeListener } from "@/utils/chrome.js"

export const useMacyStore = defineStore({
	id: 'counter',
	state: () => ({
		priorityMacyBoxes: [],
		hideMacyBoxes: [],
		folderList: [],
		sitesAndFolders: {
		},
	}),
	getters: {
	},
	actions: {
    async init() {
      // init bookmarks setting 
      this.hideMacyBoxes = await getLocalData("hideMacyBoxes", [])
      this.priorityMacyBoxes = await getLocalData("priorityMacyBoxes", [])
    }
});