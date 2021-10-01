<?php
    require 'conexaoDAOhomolog.php' ; 
    if(!isset($_SESSION)){
        session_start();
    } 
    $email=$_POST['email'];
    $senha=$_POST['senha'];
    $strsql="select * from unicid.tbl_cadastro_usuario where email='$email' and senha='$senha'";
    
    $array=carregar($strsql);

    if($array == null){
        $json=json_encode(0);
        unset ($_SESSION['email']);
        unset ($_SESSION['senha']);
        session_destroy();
        echo($json);
        //header('location:../login.php');
        
    }else{

        $strctrl="insert into tbl_controle_login (data,email,dt_login) values (current_date,'$email',now())";
        inserir($strctrl); 
        $strsql="update 
                  unicid.tbl_cadastro_usuario 
                set 
                  id_login=(SELECT min(id) FROM unicid.tbl_controle_login 
                                  where
                                        data= current_date and 
                                        email='$email' and 
                                        dt_logout is null
                                        having min(dt_login)
                                        ) 
                                  where email='$email'";
                                inserir($strsql); 
        $strsql="select * from unicid.tbl_cadastro_usuario where email='$email' and senha='$senha'";

        $result=carregar($strsql);
        $json=json_encode($result);
        foreach($result as $retorno){
            $_SESSION['id']=$retorno['id'];
            $_SESSION['id_login']=$retorno['id_login'];
            $_SESSION['email'] = $email;
            $_SESSION['senha'] = $senha;
            $_SESSION['resenha'] =$retorno['resenha'];
            $_SESSION['tipo'] =$retorno['tipo'];
            $_SESSION['nome'] =$retorno['nome'];
            $_SESSION['sobrenome'] =$retorno['sobrenome'];
        }
        echo($json);
        
    }
    
   


       /* array_walk_recursive($array,function(&$val){
            if(is_string($val)){
                $val=mb_convert_encoding($val,'UTF-8','ISO-8859-1');
            }
        });*/

      


?>