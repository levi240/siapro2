<?php
require_once('conexaoBanco.php');
// função com responsabilidade de entregar um array list
    function carregar($sql){
        $con = new ConexaoBancoMisPg();
        $lista= array();
        $qr = $con -> executaRetorno($sql);
        while($ln = odbc_fetch_array($qr)){
            array_push($lista, $ln);
        }
        return $lista;
    };
    function verifica($sql){
        $con=new ConexaoBancoMisPg();
        $qr=$con->executaRetorno($sql);

        if (odbc_num_rows($qr)>=1) {
            return 1;
        }else{

            return 0;
        }
    };

    function linhas($sql){
        $con=new ConexaoBancoMisPg();
        $qr=$con->executaRetorno($sql);
        $qt=odbc_num_rows($qr);
        return $qt;
    };
 ?>
