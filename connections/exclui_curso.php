<?php
    require 'conexaoDAOhomolog.php' ;
    $id=trim(strtoupper($_POST['id']));
   
    $strsql="update tbl_cursos set status=false where id=$id";
        if(inserir($strsql)){
            echo(json_encode(1));

        }else{
            echo(json_encode(0));
        }
    //echo($strsql);
    
   



?>