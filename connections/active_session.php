<?php
//require 'conexaoDAOhomolog.php' ; 
session_start();
if((!isset ($_SESSION['email']) == true) and (!isset ($_SESSION['senha']) == true))
{
  unset($_SESSION['email']);
  unset($_SESSION['senha']);
  header('location:login.php');
  session_destroy();
 // header('location:login.php');
}else{
    $tipo=$_SESSION['tipo'];
    $id_usuario=$_SESSION['id'];
    $id_login=$_SESSION['id_login'];
    $nome_logado=$_SESSION['nome'];
    $sobrenome=$_SESSION['sobrenome'];
    $email=$_SESSION['email'];
    $senha=$_SESSION['senha'];
    $resenha=$_SESSION['resenha'];
    $time=time();

    
}


?>