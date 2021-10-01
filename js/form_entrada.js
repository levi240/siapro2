
$(document).ready(function(){
   webservices('connections/tabela_provas.php',{ano:'2019',curso:'',tipo:''},3);
})


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
          fixedHeader: 			true,
          colReorder: 			true,
          responsive: 			true,
          deferRender:    	 true,
          scrollCollapse: 	  true,
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
          {
            extend: 'excel',
            text: 'Save current page',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }
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
  delay(1000);
    switch(tipo){
        case 1:
            console.log("ola"+ JSON.parse(result));
        break;
        case 2:
          console.log(result)
           validaUsuario(result)
        break;
        case 3:
          let urlPdf;
          $('#tableProva').html(carregaTabelaProvas(result))
          setTimeout(function(){
            //$('#dataTable').DataTable();
            carrega_dataTable(tipo,'#table_provas')
          },1)


         $('span[id="pdf"]').click(function(){
          urlPdf=$(this).attr('data-id')
         $('#painel_pdf').html(mostrarPdf(urlPdf))
         })

        break;
    }

} 


function alertSucess(icone,titulo){
  let timerInterval
  Swal.fire({
  icon:'success',
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
  console.log(url)
    embed='<embed '+
    'src="'+url+'" '+
    'type="application/pdf" '+
   'class="responsive"'+
   ' width="100%"' +
    'height="1024px"'+
    'background-color="0xFF525659" '+
    'top-toolbar-height="56" '+
    'full-frame="" '+
    'internalinstanceid="21" '+
'/>'  ;
//console.log(embed)
return embed

}


function carregaTabelaProvas(result){
  var table='';
  var body='';
    $.each(JSON.parse(result),function(i,v){
      body+=
      '<tr id="prova_pdf" style="" data-id="'+v.pdf+'">'+
        '<td class="align-middle">'+v.ano+'</td>'+
        '<td class="align-middle">'+v.tipo_prova+'</td>'+
        '<td class="align-middle">'+v.curso+'</td>'+
        '<td class="align-middle">'+v.tipo+'</td>'+
        '<td class="align-middle"><span id="pdf" style="" class=" btn btn-md  far fa-file-pdf" data-id="'+v.pdf+'" data-toggle="modal" data-target="#mostraPDF"></span></td>'+
        '<td class="align-middle"><i class="btn btn-md  fas fa-plus-square"></i></td>'+
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
                    '<th>Opções</th>'+
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