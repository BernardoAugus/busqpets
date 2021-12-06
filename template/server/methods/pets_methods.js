Meteor.methods({
  adicionarPet(pet) {
    //espera um OBJETO de um pet
    Pets.insert(pet);
  },

  editarPet(pet) {
    //espera array com objeto de pets
    Pets.udpate({ _id: pet._id }, { $set: pet });
  },

  excluirPet(pet) {
    //espera array com objeto de pets
    Pets.remove({ _id: pet._id });
  },
})