<!DOCTYPE html>
<html lang="pt-br">

<?php include 'css/head.php'; ?>

<style>
	/*style="overflow-x:scroll;*/
    .card-counter{
    box-shadow: 2px 2px 10px #DADADA;
    margin: 5px;
    padding: 20px 10px;
    background-color: #fff;
    height: 130px;
    border-radius: 5px;
    transition: .3s linear all;
  }
 
  option { font-size:15px;}
	
 /* .card-counter:hover{
    box-shadow: 4px 4px 20px #DADADA;
    transition: .3s linear all;
  }

  .card-counter.primary{
    background-color: #007bff;
    color: #FFF;
  }

  .card-counter.danger{
    background-color: #ef5350;
    color: #FFF;
  }  

  .card-counter.success{
    background-color: #66bb6a;
    color: #FFF;
  }  

  .card-counter.info{
    background-color: #26c6da;
    color: #FFF;
  }  

  .card-counter i{
    font-size: 5em;
    opacity: 0.2;
  }

  .card-counter .count-numbers{
    position: absolute;
    right: 35px;
    top: 20px;
    font-size: 32px;
    display: block;
  }

  .card-counter .count-name{
    position: absolute;
    right: 35px;
    top: 60px;
    font-style: italic;
    text-transform: capitalize;
    opacity: 0.5;
    display: block;
    font-size: 25px;
    text-align: center;
  }*/

	
		
		tbody,td{
			font-size:12px;
			font-family:verdana;
		}
/*thead,th{
			background-color:#37474F;
			color:#FFFFFF;	
		}
*/		
	
		.card {
			border: 0rem;
			border-radius: 0rem;
		}
			
	/*	.card-header {
			background-color: #37474F;
			border-radius: 0 !important;
			color:	white;
			margin-bottom: 0;
			padding:	1rem;
		}
	*/		
		.card-block {
			border: 1px solid #cccccc;	
		}
		
		.shadow {
			box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
						0 1px 18px 0 rgba(0, 0, 0, 0.12),
						0 3px 5px -1px rgba(0, 0, 0, 0.2);
		}
	/*	.dataTables_filter{
			float: right;
		}
    */
		

		
			
		</style>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?php include 'css/menu_lateral.php'; ?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <?php include 'css/top.php'; ?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <h1 class="h3 mb-4 text-gray-800">Analise de Questões</h1>
                   
                    <div class="row-fluid">
                         <!-- DataTales Example -->
                      <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            
                            <form>
                              <div class="form-row ">
                                  <div class="form-group col-md-2">
                                      <label>Ano:</label>
                                      <div class="input-group ">
                                         <select name="anoProva" id="anoProva" class="form-control">
                                            <option>Carregando...</option>
                                          </select>
                                      </div>
                                  </div>
                                    <div class="form-group col-md-4">
                                          <label>Curso</label>
                                          <div class="input-group ">
                                              <select name="tipoCursos" id="tipoCursos" class="form-control">
                                                <option>Carregando...</option>
                                              </select>
                                          </div>
                                      </div>
                                  
                                    <div class="form-group col-md-3">
                                        <label>Prova</label>
                                        <div class="input-group ">
                                            <select name="tipoProva" id="tipoProva" class="form-control">
                                              <option>Carregando...</option>
                                            </select>
                                        </div>
                                    </div>
                                  <div class="form-group col-md-3">
                                     <div class="input-group ">
                                      <label>  Tipo </label>
                                        <div class="input-group ">
                                            <select name="tipoDocumento" id="tipoDocumento"  class="form-control">
                                              <option>Carregando...</option>
                                            </select>
                                        </div>
                                      </div>
                                  </div>
                              </div>          
                            </form>
                        </div>
                        
                      
                            <div class="card-body">
                                <div class="table" id="tableProva" style="">
                                  
                                </div>
                            </div>
                            </div>
                    </div>  
                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->
                   
           
            <!-- End of Main Content -->

            <!-- Footer -->
                <?php include 'css/footer.php'; ?>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="connections/logout_usuario.php">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Mostrar PDF-->
<div class="modal fade" id="mostraPDF" data-backdrop="" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Visualizando PDF</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
        <div class="row-fluid">
        <form>
            <input name="ap_ano" id="ap_ano" type="text" />
            <input name="ap_tipoProva" id="ap_tipoProva" type="text" />
            <input name="ap_tipo" id="ap_tipo" type="text" />
            <input name="ap_pdf" id="ap_pdf" type="text" />
            <input name="ap_usuario" id="ap_usuario" type="text" value="<?php echo($email); ?>" >
            <div class="form-row ">
                <div class="form-group col-md-2">
                    <label>Questão Nº :</label>
                    <div class="input-group ">
                        <input type="text" id="n_questao" class="form-control " placeholder="">
                    </div>
                </div>
                <div class="form-group col-md-2">
                    <label>Curso</label>
                    <div class="input-group ">
                        <input type="text" id="n_curso" class="form-control " placeholder="">
                    </div>
                </div>
                
                <div class="form-group col-md-4">
                    <label>Diciplina</label>
                    <div class="input-group   ">
                        <select style="" name='n_diciplina' id="n_diciplina" class="form-control" placeholder="Selecione"  multiple="multiple" >
                          <option>Carregando...</option>
                        </select> 
                    </div>
                    
  

                </div>
                <div class="form-group col-md-2">
                    <label>Dificuldade</label>
                    <div class="input-group ">
                        <select name="n_dificuldade" id="n_dificuldade" class="form-control " placeholder="" style="size:10px;">
                          <option>Selecione</option>
                          <option>Fácil</option>
                          <option>Médio</option>
                          <option>Difícil</option>
                        </select>
                    </div>
                </div>
                <div class="form-group col-md-2">
                    <label>_</label>
                    <div class="input-group ">
                    <div  class="form-control btn btn-sm btn-success" onclick=cadastrarAnalise(); >Salvar</div>
                    </div>
                </div>
            </div>          
        </form>

        </div>
        <div class="row-fluid">
          <div id="painel_pdf" class="painel_pdf"></div>
        </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
       
      </div>
    </div>
  </div>
</div>

    <!-- Bootstrap core JavaScript-->

    
    
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script> 

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
   
    <!-- Custom scripts for all pages-->
       <!-- Page level plugins -->
      
       
       <script src="//cdn.datatables.net/1.11.2/js/jquery.dataTables.min.js"></script>
       <!--<script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>-->
    <script src="vendor/sweetalert/sweetalert.js"></script>
    <!-- Page level custom scripts -->
    <!--<script src="js/demo/datatables-demo.js"></script>-->
    <script src="js/sb-admin-2.min.js"></script>
    <script src="vendor/multselect/bootstrap-multiselect.js"></script>
    <script src="js/script_index.js"></script>
    

</body>

</html>