Meteor.methods({
  buscarPets() {
    //sem parâmetro
    return Pets.find({ consumidor: this.userId }).fetch();
  },

  adicionarPet(pet) {
    //espera um OBJETO de um pet
    Pets.insert(pet);
  },

  editarPet(pet) {
    //espera objeto do pet
    Pets.udpate({ _id: pet._id }, { $set: pet });
  },

  excluirPet(petId) {
    //espera o id do Pet
    Pets.remove({ _id: petId });
  },
})