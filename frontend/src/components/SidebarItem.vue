<template>
  <div>
  
    <a :href=idSubmenu data-toggle="collapse" aria-expanded="false" class="bg-white list-group-item list-group-item-action flex-column align-items-start border-0">
      <div class="d-flex w-100 justify-content-start align-items-center">
        <span class="menu-collapsed">{{folder.folder_name}}</span>
        <span class="submenu-icon ml-auto"></span>
      </div>
    </a>
  
    <div :id=submenu class="collapse sidebar-submenu">
      <a v-for="(file,index) in folder.files" :key="index" @click='viewPDF(file.file)' href="#" class="list-group-item list-group-item-action bg-white text-blue border-0">
        <span class="menu-collapsed">{{ file.file_name }}</span>
        {{ file.file.url }}
      </a>
    </div>
  
  </div>
</template>
  
  <script>
  import { isInteger } from 'lodash';
  
  export default {
    name: 'SidebarItem',
    props: {
      folder: Object,
      item: Number,
    },
    methods: {
      viewPDF(path) {
        this.$emit('viewPDF', path)
      }
    },
    computed: {
      submenu() {
        return "submenu" + this.item;
      },
      idSubmenu() {
        return "#submenu" + this.item;
      }
    }
  };
  </script>