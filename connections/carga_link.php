<?php         
// URL DO SITE
 $url = 'http://inep.gov.br/educacao-superior/enade/provas-e-gabaritos';
 // PEGANDO TODO CONTEUDO
 $dadosSite = file_get_contents($url);
 $var1 = explode('<div class="list-download__row">',$dadosSite);
 for($i=0;$i>=count($var1);$i++){
     $var2 = explode("</div>",$var1[$i]); 
 }
 foreach($var1 as $site){
     $var2 = explode("</div>",$site);     
     print_r($var2[0]);
 }

?>