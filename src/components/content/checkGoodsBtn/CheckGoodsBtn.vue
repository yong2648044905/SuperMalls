<template>
    <div class="check-button" :class="{check:isChecked}">
        <img src="@/assets/img/cart/tick.svg" alt="" srcset="" >

    </div>
  </template>
  
  <script>
  
    export default {
      name: 'CheckGoodsBtn',
      props: {
        isChecked: {
          type: Boolean,
          default: false
        }
      },
      components: {
  
      }
  
    }
  </script>
  
  <style scoped>
    .check-button {
      border-radius: 50%;
      border: 2px solid #aaa;
      width: 20px;
      height: 20px;
    }
  
    .check {
      border-color: red;
      background-color: red;
  
    }
  </style>