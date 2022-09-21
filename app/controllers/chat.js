module.exports.iniciaChat = (application, req, res) => {
    const dadosForm = req.body;
    console.log(dadosForm);
  
    req.assert('name', 'O campo usuário devem ser preenchido').notEmpty();
    req.assert('name', 'O campo usuário devem  conter de 3 a 15 caracteres').len(3,14);

    req.assert('senha', 'O campo senha devem ser preenchido').notEmpty();
    req.assert('senha', 'O campo senha devem  conter de 3 a 15 caracteres').len(3,14);


    const erros = req.validationErrors();
  
    if(erros) {
      res.render('index', { validacao: erros });
      return;
    }
  
    application.get('io').emit('msgParaCliente', {
       name: dadosForm.name,
       mensagem: 'Entrou no chat'
    });
  
    
    res.render('chat', { dadosForm });
  }