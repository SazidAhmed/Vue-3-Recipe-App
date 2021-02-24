<template>
  <div class="add-recipe container z-depth-1">
    <h2 class="center-align purple-text">Add New Recipe</h2>
    <form @submit.prevent="addRecipe">
      <div class="field title">
        <label class="purple-text" for="title">Title:</label>
        <input class="purple-text" type="text" name="title" v-model="title">
      </div>

      <div v-for="(ing, index) in ingredients" class="field ingredient" :key="index">
        <label class="purple-text" for="ingredient">Ingredient:</label>
        <input class="purple-text" type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete purple-text" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label class="purple-text" for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input class="purple-text" type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn purple">Add recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddRecipe',
  data(){
    return{
      title: null,
      ingredients: [],
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    addRecipe(){
      if(this.title){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        //save recipe to firestore
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'Enter a recipe title'
      }
    },

    addIng(){
      if(this.another){
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'Enter a value to add another ingredient'
      }
    },

    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.add-recipe{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipe h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-recipe .field{
  margin: 20px auto;
  position: relative;
}
.add-recipe .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
.add-recipe .field input[type=text]:focus {
  border-bottom: 1px solid purple;
  box-shadow: 0 1px 0 0 purple;
}
</style>

