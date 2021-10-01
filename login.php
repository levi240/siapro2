<!DOCTYPE html>
<html lang="en">
<?php //include 'css/head.php'; ?>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="EasyQuery ">

    <title>Siapro - Login</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    <link rel="sortcut icon" href="img/favicon.ico" type="image/x-icon" />

</head>

<body class="bg-gradient-primary">

    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-6 col-lg-8 col-md-7">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                          
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Bem Vindo ao SIAPRO!</h1>
                                    </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <input type="email" id="email" name="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="E-mail...">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" id="senha" name="senha" class="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Senha...">
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck">
                                                    <label class="custom-control-label" for="customCheck">Lembrar senha</label>
                                                </div>
                                            </div>
                                            <div id="btnLogar" onClick=logar() class="btn btn-primary btn-user btn-block">
                                                Login
                                            </div>
                                        </form>
                                    <hr>
                                    <!--<div class="text-center">
                                        <a class="small" href="forgot-password.html">Esqueceu sua senha?</a>
                                    </div>-->
                                    <div class="text-center">
                                        <a class="small" href="register.php">Criar uma conta!</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.php">Esqueci minha senha!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="vendor/sweetalert/sweetalert.js"></script>
    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>
    <script src="js/script_login.js"></script>

</body>

</html>