<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m6 l4 xl4" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card" >
          <div class="card-content">
            <i class="material-icons delete purple-text" @click="deleteSmoothie(smoothie.id)">delete</i>
            <h2 class="purple-text">{{ smoothie.title }}</h2>
            
            <ul class="ingredients">
              <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                <span class="chip">{{ ing }}</span>
              </li>
            </ul>
          </div>
          <router-link :to="{ name: 'EditRecipe', params: {recipe_slug: smoothie.slug}}">
            <span class="btn-floating btn-large halfway-fab purple">
              <i class="material-icons edit">edit</i>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data(){
    return{
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id){
      // delete doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    // fetch data from firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<style>
.card{
  display: grid;
  grid-gap: 30px;
  margin-top: 60px;
}
.card h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.card .ingredients{
  margin: 30px auto;
}
.card .ingredients li{
  display: inline-block;
}
.card .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
