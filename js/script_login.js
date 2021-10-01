
//FUNCAO RESPONSAVEL POR UM DELAY 
   function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // MENSAGEM AMIGAVEL PARA O USUARIO
  function sweetAlert(titulo,mensagem,alerta){ 
    swal.fire({
        icon:alerta,
        width: 450,
        title: titulo,
        text: mensagem,
        showConfirmButton: true,
        timer:4000,
        footer: '2021 - 2021 © EasyQuery Solutions.'
    });
  }

  function alertSucess(icone,titulo){
    let timerInterval
    Swal.fire({
    icon:icone,
    title: titulo,
    //html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      //console.log('I was closed by the timer')
      //window.location.replace("login.php");
    }
  })
  }
  
// LOADING DE ESPERA PARA CARREGAR OS GRAFICOS
  function loading(acao){
      if (acao) {
          swal.fire({
              width: 400,
              //timer:3000,
              allowEscapeKey: false,
              allowOutsideClick: false,
              padding: '3em',
              title: 'Aguarde, carregando!!!',
              background: '#EEE9E9',
              onOpen: () => {
                  swal.showLoading(function(){  
                  });
              },
              backdrop: `rgba(0,0,0,0.85)`
          });
          
      } else {
          swal.close(); 
      }
  }
  
  function webservices(url,parametros,tipo){
      $.ajax({
          url: url,
          type: "POST",
          //dataType: "json",
          data: parametros,
          async:true,
          timeout:0,
          beforeSend:function(){
            setTimeout(function(){
              //loading(true)
          },1000) 
          },
          success:function(data){
            setTimeout(function(){
              regraNegocio(tipo,data)
              //loading(true)
          },1000) 
              
          },
          complete:function(e){
             console.log("Status "+e.status + " Url: " +url)
             if( e.status !=200){
                 sweetAlert("Tente executar novamente. Caso o problema persista,contacte o Suporte!!!");
             }else{
                  setTimeout(function(){
                      loading(false)
                  },3000)                    
             }
          },
          error:function(data){
            sweetAlert("Tente executar novamente. Caso o problema persista,contacte o Suporte!!!");
            console.log("Status Response :"+ e.status+ " Erro ao consumir: " + url);
          }
      })
  }
  
  function logar(){
      var email=$('#email').val();
      var senha=$('#senha').val();
      var parametro={email:''+email+'',senha:''+senha+''};
      webservices('connections/login_usuario.php',parametro,1);
     
  }
  
  function validaUsuario(tipo,result){
    switch (tipo){
        case 1:
            if(result==0){
                console.log("usuario não cadastrado");
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops... ',
                    text: 'Usuário ou senha inválidos'
                  })
              }else{
                $.each(JSON.parse(result),function(i,v){
                  alertSucess('success','Seja bem vindo '+v.nome)
                  setTimeout(function(){
                    window.location.replace("index.php");
                 },2000)
                })
              } 
        break;
        case 2:
              if(result==0){
                alertSucess('success','Cadastrado com sucesso!')
                setTimeout(function(){
                    window.location.replace("login.php");
                },2000)
              }else{
                alertSucess('error','E-mail já cadastrado!')
              }
        break;
    }
  }
  
  async function regraNegocio(tipo,result){
    delay(500);
      switch(tipo){
          case 1:
            validaUsuario(1,result)
          break;
          case 2:
            validaUsuario(2,result)
          break;
          case 3:
             
          break;
      }
  } 
  
  function cadastrar(){
          var nome =$('#nome').val();
          var sobrenome= $('#sobrenome').val();
          var email=$('#email').val();
          var senha=$('#senha').val();
          var resenha=$('#resenha').val();
          var parametro={nome:''+nome+'',sobrenome:''+sobrenome+'',email:''+email+'',senha:''+senha+'',resenha:''+resenha+''};
          if(nome=='' || nome==null){
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Nome obrigatório!!'
                })
              console.log("Campo nome é obrigatorio");
          }else if(sobrenome=='' || sobrenome==null){
              Swal.fire({
                  icon: 'error',
                  title: 'Oops... ',
                  text: 'Sobrenome obrigatório!!'
                })
              console.log("Campo sobrenome é obrigatorio");
          }else if(email=='' || email==null){
              Swal.fire({
                  icon: 'error',
                  title: 'Oops... ',
                  text: 'E-mail obrigatório!!'
                })
              console.log("Campo email é obrigatorio");
          }else if(senha=='' || senha==null){
              Swal.fire({
                  icon: 'error',
                  title: 'Oops... ',
                  text: 'Senha obrigatório!!'
                })
              console.log("Campo senha é obrigatorio");
          }else if((resenha=='' || sobrenome==null) || resenha!=senha ){
              Swal.fire({
                  icon: 'error',
                  title: 'Oops... ',
                  text: 'Campo re-senha diferente de senha!!'
                })
              console.log("Campo resenha não condiz com o campo senha");
          }else{
            loading(true)
             webservices('connections/cad_usuario.php',parametro,2)
          }
         // console.log(parametro);
  }
  
  function alteraSenha(){}
     
  
  function resgatarSenha(){}
  
  
 
 
  