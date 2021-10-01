
<?php 
require_once('conexaoBanco.php');
// função com responsabilidade de entregar um array list 
    function carregar($sql){
        $con = new ConexaoBancoMisPg();
        $lista= array();
        $qr = $con -> executaRetorno($sql); 
                    
        while($ln = mysqli_fetch_assoc($qr)){
            array_push($lista, $ln);
        }
        return $lista;
    };
    function inserir($sql){
        $con=new ConexaoBancoMisPg();
        $qr=$con->executaRetorno($sql);
        //$linha=mysqli_num_rows($qr);
        if ($qr!='') {
            return 1;
        }else{
            return 0;
        }
    };
    function linhas($sql){
        $con=new ConexaoBancoMisPg();
        $qr=$con->executaRetorno($sql);
        $qt=mysqli_num_rows($qr); 
        return $qt;
    };

 ?>