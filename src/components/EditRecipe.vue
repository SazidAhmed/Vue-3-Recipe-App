<template>
  <div v-if="smoothie" class="edit-recipe container z-depth-1">
    <h2 class="purple-text center-align">Edit {{ smoothie.title }}</h2>
    <form @submit.prevent="editRecipe">
      <div class="field title">
        <label class="purple-text" for="title">Title :</label>
        <input class="purple-text" type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ing, index) in smoothie.ingredients" class="field ingredient" :key="index">
        <label class="purple-text" for="ingredient">Ingredient :</label>
        <input class="purple-text" type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete purple-text" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label class="purple-text" for="add-ingredient">Ingredient :</label>
        <input class="purple-text" type="text" name="add-ingredient" v-model="another">
        <i class="material-icons delete green-text" @click="addIng">add</i>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn purple">Update Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditRecipe',
  data(){
    return{
      smoothie: null,
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    editRecipe(){
       if(this.smoothie.title){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // update smoothie in firestore
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          slug: this.slug,
          ingredients: this.smoothie.ingredients
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
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'Enter a value to add another ingredient'
      }
    },
    deleteIng(ing){
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  },
  created(){
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.recipe_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      })
    })
  }
}
</script>
 
<style>
.edit-recipe{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipe h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipe .field{
  margin: 20px auto;
  position: relative;
  color: purple;
}
.edit-recipe .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
.edit-recipe .field input[type=text]:focus {
  border-bottom: 1px solid purple;
  box-shadow: 0 1px 0 0 purple;
}
</style>
 