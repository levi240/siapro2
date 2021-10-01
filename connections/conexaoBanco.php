<?php
	require 'Iconexao.php';
	
    //error_reporting (0);
	class ConexaoBancoMisPg implements IConexao{
		private $conexao;		
		function __construct(){		
            $server="localhost";
            $database="unicid";
            $username="aplicacao";
            $pass="aplicacao";
            $port=3307;	
			//$this->conexao = odbc_connect('vm','','');
            $this->conexao = mysqli_connect($server,$username,$pass,$database,$port);
		}

		function executaRetorno($strsql){			
			$rs = mysqli_query($this->conexao,$strsql);
			if (mysqli_connect_error()){
               echo "Erro de conexão com o banco de dados";
         	}
			return $rs;
		}		
	}
	?>