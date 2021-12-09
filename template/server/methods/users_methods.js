import { Meteor } from 'meteor/meteor'

Meteor.methods({
  fetchUserById(userId) {
    return Meteor.users.findOne({ _id: userId }, { fields: { profile: 1 } });
  },

  fetchUser(email) {
    return Meteor.users.findOne({ 'emails.0.address': email });
  },

  novoUsuario(usuarioSelecionado, senha) {
    const emailJaExiste = !!Meteor.users.findOne({ 'emails.0.address': email });
    const documentoJaExiste = !!Meteor.users.findOne({ 'profile.documento': { $ne: usuarioSelecionado.documento } })
    let usuario = {}

    if (emailJaExiste || documentoJaExiste) {
      return "Email ou documento já cadastrado"
    } else {
      usuario = {
        profile: {
          name: usuarioSelecionado.nome,
          documento: usuarioSelecionado.documento,
          tipo: usuarioSelecionado.documento.length > 14 ? 1 : 2,
          endereco: {
            uf: usuarioSelecionado.uf,
            pais: usuarioSelecionado.pais,
            cidade: usuarioSelecionado.cidade,
          }
        },
        email: usuarioSelecionado.email.trim(),
        password: senha,
        createdAt: new Date(),
      }
    }

    console.log(usuario);

    Accounts.createUser(usuario);

    console.log('Usuário cadastrado:', usuario.email);
  },

  editarUsuario(usuario) {
    //nome: string, email:string, documento: number, telefone:number, endereco: objeto com os dados
    //espera o objeto do usuário
    const { nome, email, documento,
      telefone, endereco } = usuario;

    const emailJaExiste = !!Meteor.users.findOne({ _id: { $ne: this.userId }, 'emails.0.address': email });
    const documentoJaExiste = !!Meteor.users.findOne({ _id: { $ne: this.userId }, 'profile.documento': { $ne: usuarioSelecionado.documento } })

    if (emailJaExiste || documentoJaExiste) {
      return "Email ou documento já cadastrado"
    } else {
      Meteor.users.update({ _id: this.userId }, {
        $set: {
          'profile.name': nome, 'emails.0.address': email, 'profile.documento': documento,
          'profile.telefone': telefone, 'profile.endereco': endereco
        }
      });
    }
  },
})