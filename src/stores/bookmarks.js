import { defineStore } from 'pinia'
import { getLocalData, setLocalData, getBookmarkTree, setBookmarkTreeChangeListener } from "@/utils/chrome.js"

import {macyInit} from "@/utils/macy.js"

export const useBookmarksStore = defineStore({
	id: 'counter',
	state: () => ({
		priorityFolders: [],
		hideFolders: [],
		folderList: [],
		sitesAndFolders: {
		},
	}),
	getters: {
	},
	actions: {
    async init() {
      // init bookmarks setting 
      this.hideFolders = await getLocalData("hideFolders", [])
      this.priorityFolders = await getLocalData("priorityFolders", [])

      // read bookmarks 
      let bookmarkTree = await getBookmarkTree()
      this.refreshBookmarks(bookmarkTree)

      setBookmarkTreeChangeListener((changedbookmarkTree)=>{
        this.refreshBookmarks(changedbookmarkTree)
      })
    },

    async refreshBookmarks(bookmarkTree) {
      console.debug(bookmarkTree)
      // init folderList and sitesAndFolders
      let folderList = []
      let sitesAndFolders = {}
      let bfs_bookmarks = function (bookmark_list) {
        let [childrenRet, childrenAllRet] = [[], []]
        for (const element of bookmark_list) {
          childrenAllRet.push(element.id)
          let [children, childrenAll] = [undefined, undefined]
          let isFolder = element.children !== undefined
          if (isFolder) {
            folderList.push(element.id)
            let ret_children = bfs_bookmarks(element.children)
            children = ret_children[0]
            childrenAll = ret_children[1]
          } else {
            childrenRet.push(element.id)
          }
          sitesAndFolders[element.id] = {
            id: element.id,
            parentId: element.parentId,
            title: element.title,
            url: element.url,
            children: children,
            childrenAll: childrenAll,
          }
        }
        return [childrenRet, childrenAllRet]
      }

      bfs_bookmarks(bookmarkTree)

      let bookmarskStore = this
      folderList.sort(function (folderShowFirst, folderShowLast) {
        let indexOfFirst = bookmarskStore.priorityFolders.indexOf(folderShowFirst)
        let indexOfLast = bookmarskStore.priorityFolders.indexOf(folderShowLast)
        let priorityFirst = indexOfFirst < 0 ? folderList.length : indexOfFirst
        let priorityLast = indexOfLast < 0 ? folderList.length : indexOfLast
        if (priorityFirst != priorityLast) {
          return priorityFirst < priorityLast
        }

        let childrenCountOfFirst = sitesAndFolders[folderShowFirst].children.length
        let childrenCountOfLast = sitesAndFolders[folderShowLast].children.length

        priorityFirst = childrenCountOfFirst == 0 ? folderList.length : 0
        priorityLast = childrenCountOfLast == 0 ? folderList.length : 0
        if (priorityFirst != priorityLast) {
          return priorityFirst < priorityLast
        }


        priorityFirst = folderList.indexOf(folderShowFirst)
        priorityLast = folderList.indexOf(folderShowLast)

        return priorityFirst < priorityLast
      })

      this.folderList = folderList
      for (const id in sitesAndFolders) {
        let siteOrFolder = sitesAndFolders[id]
				this.sitesAndFolders[id] = siteOrFolder
      }
      macyInit()
    }
	}
});