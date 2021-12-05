Meteor.methods({
  fetchUser(userId) {
    return Meteor.users.findOne({ _id: userId });
  },

  novoUsuario(usuarioSelecionado, senha) {
    console.log('entrou aqui?');
    const usuario = {
      profile: {
        name: usuarioSelecionado.nome,
        documento: usuarioSelecionado.documento,
        tipo: 1
      },
      email: usuarioSelecionado.email.trim(),
      password: senha,
    }

    console.log(usuario);

    Accounts.createUser(usuario);

    console.log('Usuário cadastrado:', usuario.email);
  },
})