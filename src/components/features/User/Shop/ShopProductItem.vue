<template>
  <div class="col-4 p-3 product-container d-flex flex-column">
    <div class="d-flex flex-row justify-content-center">
      <img style="height:150px;" :src="product.img"/>
    </div>
    <div class="d-flex flex-row justify-content-center">
      <h6 style="height:60px;">{{ product.title }}</h6>
    </div>
    <hr class="w-100"/>
    <div style="height:150px;" class="d-flex flex-row justify-content-center p-2">
      <p>{{ product.description | maxLength(200) }}</p>
    </div>
    <div class="d-flex flex-row justify-content-center">
      <span>{{ product.price | price }}</span>
    </div>
    <div class="d-flex flex-row justify-content-center">
      <button @click="addProductToCart" class="btn-dark">Commander</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../../../main'

export default {
  props : ['product'],
  methods: {
    addProductToCart() {
      eventBus.addProductToCart({...this.product});
    }
  }
  
}
</script>

<style>
  .product-container{
    height: 500px;
  }
  p {
    font-size: 10px;
  }
</style>