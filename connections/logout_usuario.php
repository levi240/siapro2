<?php
require 'conexaoDAOhomolog.php' ; 
require 'active_session.php' ; 
// Inicializa a sessão.
// Se estiver sendo usado session_name("something"), não esqueça de usá-lo agora!


// Apaga todas as variáveis da sessão
$_SESSION = array();

// Se é preciso matar a sessão, então os cookies de sessão também devem ser apagados.
// Nota: Isto destruirá a sessão, e não apenas os dados!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

//$strctrl="insert into tbl_controle_login (data,email,dt_logout) values (current_date,$email,now())";
$strctrl="update unicid.tbl_controle_login set dt_logout=now()  where  id=$id_login";

inserir($strctrl); 
// Por último, destrói a sessão
session_destroy();
header('location:../login.php');

?>