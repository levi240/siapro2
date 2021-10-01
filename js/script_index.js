
$(document).ready(function(){
  
   webservices('connections/tabela_provas.php',{ano:'',tipo_prova:'',curso:'Comput',tipo:''},1);
   webservices('connections/combo_ano.php',{},4);
})


function abreTooltip(){
  var tooltips=$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  return tooltips;
}
// Função timout desloga cliente em 33 minutos 	
var contador=0;
let limit=15000;


function logoutTimer(){
  $.post("connections/logout_usuario.php",function(retorno){})
  //location.href='login.php';

  clearInterval(validaAtividade(limit))
}

function validaAtividade(limit){
  var i=0
  setInterval(function(){
    $.post("connections/login_usuario.php",function(retorno){})

    //console.log(i+=1)
   },5300)

}

//validaAtividade(limit)
  
function pegaMouse(contador,limit){
	//console.log(contador);
	//console.log(limit);
	$(window).mousemove(function(event){
		  limit=5000
		//	console.log(limit);
	})
	setInterval(function(){
		limit-=1;
  	    //console.log(limit);
		if(limit==0){
				swal("Timeout!", "Tempo limite de inatividade ultrapassado!", "warning")
				.then((value) => {
          alert("deslogar")//location.href='login.php';
        });
        logoutTimer()
    }
    
	},10000);	
}
//pegaMouse(contador,limit)

function carrega_dataTable(tipo,tabela){
  //if ($.fn.DataTable.isDataTable(tabela))
     // {
        //$(".tabelaAgenteProduto").dataTable().fnClearTable();	
       // $(tabela).dataTable().fnDestroy();
    //  } 
  $(tabela).dataTable({
          fixedHeader: 			false,
          colReorder: 			false,
          responsive: 			false,
          deferRender:    	 false,
          scrollCollapse: 	  false,
          ordering: 			    true,
          //scrollY:        	'100%',
          //scrollX:        	true,
          paging:         	true,
          searching:      	true,
          select:				    true,
      dom: 'Bfrtip',
         buttons:
         [
          'copy', 'excel', 'pdf',
         ],
         language: 
              {
                url: "//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
              } 		
  });		
}	
 //FUNCAO RESPONSAVEL POR UM DELAY 
 function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function validaLinhaTotal(value,num){
  var linhaTotal=''

  if(value=="TOTAL DE VENDAS: "){
      linhaTotal='background-color:#8B8989;color:#FFFFFF;'
   }
   if(num%2==0) {
       linhaTotal='background-color:#8B8989;color:#FFFFFF'
  }else{
      linhaTotal='';
   }

   return linhaTotal;        
}

function formatNumber(num){
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
 
function segundoHora(tipo,segundos){
  
  numeral.locale('pt-br');

  switch (tipo) {
      case 1:
          hora = duas_casas(Math.floor(segundos / 3600));
          minuto = duas_casas(Math.floor((segundos % 3600) / 60));
          segundo = duas_casas(segundos % 60);    
          formatado = hora + ":" + minuto + ":" + segundo;
          break;
      case 2:
          minuto = duas_casas(Math.floor((segundos%3600)/60));
          segundo = duas_casas((segundos%3600)%60);  
          formatado = minuto + ":" + segundo;
          break;
      case 3:
          formatado = parseFloat(segundos).toFixed(0) +'%';
          formatado = formatado.replace('.',',');
          break;
      case 4:
          formatado = parseFloat(segundos).toFixed(2) + '%';
          formatado = formatado.replace('.',',');
          break;
      case 5:
      
          formatado = numeral(segundos).format('0,00');
          break;
          case 6:
                  formatado = segundos?parseFloat(segundos).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}):'R$0,00';

          break;

  
      default:
          formatado = parseFloat(segundos).toFixed(2);
      break;
  }

  function duas_casas(numero){
      if (numero <= 9){
          numero = "0"+ numero;
      }
      return numero;
  }

  return formatado;
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
      footer: '2018 - 2020 © Porto Seguro Mis Atendimento.'
  });
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

async function regraNegocio(tipo,result){
  
    switch(tipo){
        case 1:
          //carrega tabela com os dados de pdfs das provas e mostra no modal o pdf carregado
          let urlPdf;
          $('#tableProva').html(carregaTabelaProvas(result))
          setTimeout(function(){
            //$('#dataTable').DataTable();
            carrega_dataTable(tipo,'#table_provas')
          },10)
        $('span[id="pdf"]').click(function(){
          urlPdf=$(this).attr('data-id')
        $('#painel_pdf').html(mostrarPdf(urlPdf))
        })

        $('tr[id="prova_pdf"]').click(function(){
           var dados=($(this).attr('data-id')).split(',');
           
           console.log(dados)
           $('#ap_ano').attr('value',dados[0])
           $('#ap_tipoProva').attr('value',dados[1])
           $('#ap_tipo').attr('value',dados[3])
           $('#ap_pdf').attr('value',dados[4])

        })
        break;
        case 2:
           //carrega tabela com cursos ja cadastrados
           $('#tableCursos').html(carregaTabelaCursos(result));
           setTimeout(function(){
            carrega_dataTable(tipo,'#table_cursos')
          },10)
        break;
        case 3:
          if(result==1){
            alertSucess("success","Cadastro com sucesso!")
            webservices('connections/tabela_cursos.php',{},4)
        }else{
            alertSucess("error","Falha ao cadastrar , tente novamente !")
        }
        break;
        case 4:
          geraComboAno('#anoProva',result);
          webservices('connections/combo_curso.php',{},5);
        break;
        case 5:
          geraComboCurso('#tipoCursos',result);
          webservices('connections/combo_prova.php',{},6);
        break;
        case 6:
          geraComboProva('#tipoProva',result);
          webservices('connections/combo_tipo.php',{},7);
        break;
        case 7:
          geraComboTipo('#tipoDocumento',result);
        break;
        case 8:
          geraComboDiciplina('#n_diciplina',result);
           $('#n_diciplina').multiselect();
       
        break;

    }

} 

function alertSucess(icone,titulo){
  let timerInterval
  Swal.fire({
  icon: icone,
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
    console.log('I was closed by the timer')
    //window.location.replace("login.php");
  }
})
}

function mostrarPdf(url){
  var embed='';
  embed='<embed '+
    'src="'+url+'" '+
    'type="application/pdf" '+
   'class="responsive"'+
   ' width="100%"' +
    'height="900px"'+
    'background-color="0xFF525659" '+
    'top-toolbar-height="56" '+
    'full-frame="" '+
    'internalinstanceid="21" '+
    '/>'  ;
    
    webservices('connections/combo_diciplina.php',{},8);
return embed
}

cadastrarCurso=()=>{
    let tipoCurso=$('#tipoCurso').val();
    let curso=$('#curso').val();
    var parametro={tipo_curso:''+tipoCurso+'',curso:''+curso+''};
    if(tipoCurso==""){
        alertSucess("error","Preencha o campo 'Tipo Curso' ")
    }else if(curso==""){
        alertSucess("error","Preencha o campo 'Curso' ")
    }else{
        webservices('connections/cadastra_curso.php',parametro,3);
    }
}

excluirCurso=(id)=>{
           Swal.fire({
            title: 'Tem certeza?',
            text: "Você não será capaz de reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, deletar!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('tr[data-id="'+id+'"').hide('slow')
                        Swal.fire(
                            'Excluido!',
                            'Curso excluido.',
                            'success'
                        )
                      webservices('connections/exclui_curso.php',{id:id})  
                    }
                })
}

cadastrarAnalise=()=>{
 var array= new Array(); 
 var parametros=[]
 array= $('#n_diciplina').val();
 var ano=$('#ap_ano').val();
 var tipo_prova=$('#ap_tipoProva').val();
 var tipo=$('#ap_tipo').val();
 var pdf=$('#ap_pdf').val();
 var usuario=$('#ap_usuario').val();
 var n_questao=$('#n_questao').val();
 var nivelQuestao=$('#n_dificuldade').val();
 var i=array.length
  
 array.forEach(function(v,i){
  parametros={ano:''+ano+'',tipo_prova:''+tipo_prova+'',tipo:''+tipo+'',pdf:''+pdf+'',usuario:''+usuario+'',n_questao:''+n_questao+'',curso:''+n_curso+'',diciplina:''+v+'',dificuldade:''+nivelQuestao+''}
   console.log(parametros)
   webservices('connections/cadastra_analise.php',{parametros},0);

 })


}

function cadastrarDiciplinas(){

}

validaStatus=(status)=>{
  //console.log(parseInt(status))
  var span='';
  abreTooltip()
  switch(parseInt(status)){
    case 0:
      span='<span style="font-size: 19px;" data-toggle="tooltip" data-placement="top" title="Analise Pendente"  class=" text-warning far  fa-times-circle"></span>';
    break;
    case 1:
      span='<span style="font-size: 19px;" data-toggle="tooltip" data-placement="top" title="Prova Analisada"  class=" text-success  far  fa-check-circle"></span>';
    break;
  }
  return span;
}

geraComboAno=(element,result)=>{
  var option=''
  option+='<option value="">Selecione</option>'
  JSON.parse(result).forEach(function(v,i){
      option+='<option value="'+v.ano+'">'+v.ano+'</option>'
  })
  $(element).html(option);
}

geraComboProva=(element,result)=>{
  var option=''
  option+='<option value="">Selecione</option>'
  JSON.parse(result).forEach(function(v,i){
      option+='<option value="'+v.tipo_prova+'">'+v.tipo_prova+'</option>'
  })
  $(element).html(option)

}

geraComboCurso=(element,result)=>{
 var option=''
  option+='<option value="">Selecione</option>'
  $.each(JSON.parse(result),function(i,v){
       option+='<option value="'+v.curso+'">'+v.curso+'</option>'
  })
  $(element).html(option);
}

geraComboTipo=(element,result)=>{
  var option=''
  option+='<option value="">Selecione</option>'
  JSON.parse(result).forEach(function(v,i){
      option+='<option value="'+v.tipo+'">'+v.tipo+'</option>'
  })
  $(element).html(option)

}

geraComboDiciplina=(element,result)=>{
  var option=''
  JSON.parse(result).forEach(function(v,i){
      option+='<option style="font-size:12px;" value="'+v.descricao+'">'+v.descricao+'</option>'
      })
  $(element).html(option)
 
}

carregaTabelaCursos=(result)=>{
  let tableCurso='';
  let bodyCurso='';

  $.each(JSON.parse(result),function(i,v){
      bodyCurso+=
      '<tr id="cad_curso" style="" data-id="'+v.id+'">'+
        '<td class="align-middle"><div class="text-capitalize">'+v.tipo_curso+'</div></td>'+
        '<td class="align-middle">'+v.curso+'</td>'+
        '<td class="align-middle">'+v.dt_cadastro+'</td>'+
        '<td class="align-middle" id="remove_curso"><span id="removeCurso" onclick=excluirCurso('+v.id+') class="btn text-danger fas fa-trash-alt"  data-id="'+v.id+'"></span></td>'+
      '</tr>'
    });

  tableCurso='<table style="font-size:12px" class="table table-condensed text-center table-bordered table-striped  table-hover " id="table_cursos" >'+  
  '<thead class="thead-dark">'+
      '<tr>'+
        '<th scope="row">Tipo</th>'+
        '<th>Curso</th>'+
        '<th>Data Cadastro</th>'+
        '<th>Opções</th>'+
        '</tr>'+
    '</thead>'+
    '<tfoot>'+
        '<tr>'+
        '<th scope="row">Tipo</th>'+
        '<th>Curso</th>'+
        '<th>Data Cadastro</th>'+
        '<th>Opções</th>'+
        '</tr>'+
   '</tfoot>'+
    '<tbody>'+bodyCurso+'</tbody>'+
    '</table>'

    return tableCurso;

}

carregaTabelaProvas=(result)=>{
  abreTooltip()
  var table='';
  var body='';
    $.each(JSON.parse(result),function(i,v){
      body+=
      '<tr id="prova_pdf" style="" data-id="'+v.ano+','+v.tipo_prova+','+v.curso+','+v.tipo+','+v.pdf+'">'+
        '<td class="align-middle">'+v.ano+'</td>'+
        '<td class="align-middle">'+v.tipo_prova+'</td>'+
        '<td class="align-middle">'+v.curso+'</td>'+
        '<td class="align-middle">'+v.tipo+'</td>'+
        '<td class="align-middle"  data-toggle="tooltip" data-placement="top" title="Acessar PDF"><span id="pdf" style="font-size: 19px; color: Tomato;" class=" btn btn-sm  far fa-2x fa-file-pdf" data-id="'+v.pdf+'" data-toggle="modal"  data-target="#mostraPDF"></span></td>'+
        '<td class="align-middle">'+validaStatus(v.status)+'</td>'+
      '</tr>'
    });
    table='<table class="table table-responsive-sm table-condensed text-center table-bordered table-striped  table-hover " id="table_provas" style="overflow-x:scroll;width:100%">'+
        
              '<thead class="thead-dark">'+
                  '<tr>'+
                    '<th scope="row">Ano</th>'+
                    '<th>Prova</th>'+
                    '<th>Curso</th>'+
                    '<th>Tipo</th>'+
                    '<th>PDF</th>'+
                    '<th>Status</th>'+
                  '</tr>'+
                '</thead>'+
                '<tfoot>'+
                    '<tr>'+
                    '<th>Ano</th>'+
                    '<th>Prova</th>'+
                    '<th>Curso</th>'+
                    '<th>Tipo</th>'+
                    '<th>PDF</th>'+
                    '<th>Opções</th>'+
                    '</tr>'+
               '</tfoot>'+
                '<tbody>'+body+'</tbody>'+
                '</table>'
                
  return table;
}

$('#anoProva').change(function(){
  webservices('connections/tabela_provas.php',{ano:''+$('#anoProva').val()+'',tipo_prova:''+$('#tipoProva').val()+'',curso:''+$('#tipoCursos').val()+'',tipo:''+$('#tipoDocumento').val()+''},1);
})

$('#tipoCursos').change(function(){
  if($('#tipoCursos').val()=='' || $('#tipoCursos').val()==null){
    webservices('connections/tabela_provas.php',{ano:''+$('#anoProva').val()+'',tipo_prova:''+$('#tipoProva').val()+'',curso:'Compu',tipo:''+$('#tipoDocumento').val()+''},1);

  }else{
    webservices('connections/tabela_provas.php',{ano:''+$('#anoProva').val()+'',tipo_prova:''+$('#tipoProva').val()+'',curso:''+$('#tipoCursos').val()+'',tipo:''+$('#tipoDocumento').val()+''},1);
  }
 })

$('#tipoProva').change(function(){
  webservices('connections/tabela_provas.php',{ano:''+$('#anoProva').val()+'',tipo_prova:''+$('#tipoProva').val()+'',curso:''+$('#tipoCursos').val()+'',tipo:''+$('#tipoDocumento').val()+''},1);
})

$('#tipoDocumento').change(function(){
  webservices('connections/tabela_provas.php',{ano:''+$('#anoProva').val()+'',tipo_prova:''+$('#tipoProva').val()+'',curso:''+$('#tipoCursos').val()+'',tipo:''+$('#tipoDocumento').val()+''},1);
})