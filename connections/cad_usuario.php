<?php
    require 'conexaoDAOhomolog.php' ;
    $nome=ucwords($_POST['nome']);
    $sobrenome=ucwords($_POST['sobrenome']);
    $email=$_POST['email'];
    $senha=$_POST['senha'];
    $resenha=$_POST['resenha'];

    $strsql="select * from tbl_cadastro_usuario where lcase(email)='$email'";
    $array=carregar($strsql);
   // echo(count($array));
    if(count($array)==0){
        $strsql2="insert into tbl_cadastro_usuario (nome,sobrenome,email,senha,resenha,dt_cadastro)values('$nome','$sobrenome','$email','$senha','$resenha',now())";
        inserir($strsql2);
        echo(json_encode(0));
    }else{
        echo(json_encode(1));
    }

    //echo($strsql);
    
   



?>