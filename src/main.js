import Vue from 'vue' ;
import App from './App.vue' ;
import * as Filters from './utils/filters' ;
import router from './router' ;
import axios from 'axios' ;

Vue.config.productionTip = false ;
axios.defaults.baseURL = 'https://boutiquevuetest.firebaseio.com/' ;
Vue.prototype.$http = axios ;

Object.keys(Filters).forEach((f) => {
  Vue.filter(f, Filters[f]);
})

export const eventBus = new Vue ({
  data: {
    products: [],
    cart: []
  },
  methods: {
    addProductToCart(product){
      if(!this.cart.map(i => i.id).includes(product.id)){
        this.cart = [ ...this.cart, product ];
        this.$emit('update:cart', this.cart.slice());
      }
    },
    addProductToShop(product){
      this.$http.post('products.json', product)
        .then( res => {
          this.products = [ ...this.products, { ...product, id: this.products.length + 1 + '' }],
          this.$emit('update:products', this.products);
        })
    },
    removeItemFromCart(item){
      this.cart = this.cart.slice().filter(i => i.id !== item.id);
      this.$emit('update:cart', this.cart);
    },
    initProducts(){
      this.products = this.$http.get('products.json')
      .then(res => {
        const data = res.data ;
        this.products = Object.keys(data).map(key => data[key]) ;
        this.$emit('update:products', this.products) ;
      })
    }
  },
  created(){
    this.initProducts() ;
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
