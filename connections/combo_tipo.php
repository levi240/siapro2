<?php
      require_once 'conexaoDAOhomolog.php' ; 
      date_default_timezone_set('America/Sao_Paulo');
      $dataLocal = date('Y-m-d', time());
      //echo($dataLocal);
      /*
      $data=date('d-m-Y');
      $diaAnt =date("d",$dataLocal);
      $mesAt = date("m",$dataLocal);
      $anoAt = date("Y",$dataLocal);
      $novadata = date ("d-m-Y",gmmktime(0,0,0,$mesAt,$diaAnt-1,$anoAt));
     */
      $dataFracionada=explode("-",$dataLocal);
      //echo($dataFracionada[0]);
      $anoAtual=isset($_POST['ano'])?$_POST['ano']:$dataFracionada[0]; //Esta linha define o limite de dias para visualizar os graficos não pode ser inferior a 0
      $mesAtual=isset($_POST['mes'])?$_POST['mes']:$dataFracionada[1];
      $diaAtual=isset($_POST['dia'])?$_POST['dia']:$dataFracionada[2];
      $dt_periodo=isset($_POST['dt_periodo'])?$_POST['dt_periodo']:$anoAtual.'-'.$mesAtual.'-'.$diaAtual;
      $curso=isset($_POST['curso'])?$_POST['curso']:"Inform";
      $tipo=isset($_POST['tipo'])?$_POST['tipo']:"Prova";
  
      $strsql="SELECT distinct tipo FROM tbl_pdf_provas order by 1 desc";
          carregadados($strsql);
                  function carregadados($sql)
                      {
                          $listas =carregar(utf8_encode($sql));
                         /* array_walk_recursive($listas,function(&$val){
                              if(is_string($val)){
                                  $val=mb_convert_encoding($val,'UTF-8','ISO-8859-1');
                              }
                          });*/
                          echo json_encode($listas);
                      }	
?>