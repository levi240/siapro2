<?php
    require 'conexaoDAOhomolog.php' ;
    $tipo_curso=trim(strtoupper($_POST['tipo_curso']));
    $curso=trim(ucwords($_POST['curso']));

    $strsql2="insert into tbl_cursos (tipo_curso,curso,status,dt_cadastro)values('$tipo_curso','$curso',true,now())";
        if(inserir($strsql2)){
            echo(json_encode(1));

        }else{
            echo(json_encode(0));
        }
    //echo($strsql);
    
   



?>