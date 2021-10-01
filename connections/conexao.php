<?php
$server="localhost";
$database="unicid";
$username="aplicacao";
$pass="aplicacao";
$port=3307;


function con($server, $database, $username, $pass,$port){
    $conn= mysqli_connect($server,$username,$pass,$database,$port);
    $retorno="";
    if(!$conn){
        $retorno= die("Falha na conexão : " .mysqli_connect_error());
        }
    $dbase=mysqli_select_db( $conn,$database ) or die( 'Erro na seleção do banco' );
    //echo("Conexão Success " .$dbase);
    return $conn;
};
$conec= con ($server, $database, $username, $pass,$port);


function crud ($conn,$sql){
    $p1=explode(' ',$sql);
    $parametro=$p1[0];
    $dados="";
    $result="";
    $row="";
    switch ($parametro){
        case 'select':
            $result=mysqli_query($conn,$sql)or die("Erro ao consultar dados " .$sql);
            foreach($result as $retorno){
                $dados=json_encode($retorno);
                echo($dados);
            }
        break;    
        case 'insert':
            $result=mysqli_query($conn,$sql)or die("Erro ao inserir dados " .$sql);
        break;
        case 'delete':
            $result=mysqli_query($conn,$sql)or die("Erro ao excluir dados ".$sql);
        break;
        case 'update':
            $result=mysqli_query($conn,$sql)or die("Erro ao atualizar dados ".$sql);
        break;

    }
    return json_encode($dados,0,512);
}

//crud ($conec,"insert into tbl_cadastro_usuario (nome,sobrenome,email,senha,resenha,dt_cadastro) values('Levi','dias','levi@teste','123','123',now())");
//crud ($conec,"delete from tbl_cadastro_usuario where id=2");
//crud ($conec,"select * from tbl_cadastro_usuario");
?>