import { Meteor } from 'meteor/meteor'

Meteor.methods({
  buscarPets() {
    //sem parâmetro
    return Pets.find({ consumidor: this.userId }).fetch();
  },

  adicionarPet(pet) {
    pet.consumidor = this.userId
    pet.createdAt = new Date()
    //espera um OBJETO de um pet
    Pets.insert(pet);
  },

  editarPet(pet) {
    //espera objeto do pet
    console.log(pet)
    Pets.update({ _id: pet._id }, { $set: pet });
  },

  excluirPet(petId) {
    //espera o id do Pet
    Pets.remove({ _id: petId });
  },
})