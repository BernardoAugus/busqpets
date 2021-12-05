import { Meteor } from 'meteor/meteor'

Meteor.methods({
  fetchUser(email) {
    return Meteor.users.findOne({ 'emails.0.address': email });

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