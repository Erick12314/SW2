﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GenerarOrdenCompra.aspx.cs" Inherits="SAVM.GenerarOrdenCompra" %>
<asp:Content ID="Content_GOC" ContentPlaceHolderID="MainContent" runat="server">
	<header class="titulo">
        <div class="container-fluid">
            <h2 style="text-align: left"><strong>Generar Orden de Compra</strong></h2>
        </div>
    </header>
	<div class="container-fluid">
		<br>
			<div class="row">
					<fieldset class="col-md-6">
						<legend>Datos de Proveedor</legend>
						RUC:
						<div class="row">
							<div class="col-md-6">
							<input type="text" class="form-control" id="txtrucOC" disabled value="20330025213">
							</div>
							<div class="col-md-6">
								<input type="button" class="btn btn-primary" value="Buscar Proveedor">
							</div>
						</div><br>
						Razón Social:
						<div class="row">
							<div class="col-md-6">
							<input type="text" class="form-control" id="txtrazonsocialOC" disabled>
							</div>
							<div class="col-md-6">
								<input type="button" class="btn btn-primary" value="Registrar Proveedor">
							</div>
						</div><br>
						Contacto:
						<input type="text" class="form-control" style="width:200px" id="txtcontactoOC" disabled><br><br>
					</fieldset>

					<fieldset class="col-md-6">
						<legend>Datos del Medicamento</legend>
						Código:
						<div class="row">
							<div class="col-md-6">
							<input type="text" class="form-control" id="txtcodmedicamentoOC" disabled>
							</div>
							<div class="col-md-6">
								<button type="button" class="btn btn-primary" id="btnBuscarMedicamentoOC"
									data-toggle="modal" data-target="#modalMedicamentosOC" >Buscar Medicamento
									</button>
							</div>
						</div>
						Nombre:
						<div class="row">
							<div class="col-md-6">
							<input type="text" class="form-control" id="txtnombreOC" disabled>
							</div>
							<div class="col-md-6">
								<input type="button" class="btn btn-primary" value="Registrar Medicamento">
							</div>
						</div>
						Precio Unit.:
						<div style="width:100px">
						<input type="number" class="form-control" id="txtprecioOC" disabled>
						</div>
						Cantidad:
						<div class="row">
							<div class="col-md-3">
							<input type="number" class="form-control" id="txtcantidadOC">
							</div>
							<div class="col-md-6 col-md-offset-3">
								<input type="button" class="btn btn-primary" value="Agregar Medicamento" id="btnAgregarOC">
							</div>
						</div>
						<br>
					</fieldset>
			</div><br>	
			<div class="row">
			<fieldset>
				<legend>Datos de la O/C</legend>
				<div class="row">
					<div class="col-md-8 form-inline">
						<label for="txtnumocOC">N° de O/C:</label>&nbsp;&nbsp;&nbsp;
						<input type="text" class="form-control" style="width: 100px" id="txtnumocOC" disabled>
					</div>
						
					<div  class="form-inline col-md-4">
						<label for="txtfechaOC">Fecha:</label>&nbsp;&nbsp;&nbsp;
						<input type="text" class="form-control" id="txtfechaOC" disabled>
					</div>
				</div><br>
	
				<table class="table">
					<thead>
						<tr>
							<td>Medicamento</td>
							<td>PUnitario</td>
							<td>Cantidad</td>
							<td>Subtotal</td>
							<td>Eliminar</td>	
						</tr>
					</thead>
					<tbody id="tableDetalleBodyOC">

					</tbody>
				</table>
				<br><br><br><br>
				<div class="col-md-offset-9 col-md-2">
						Monto:
						<input type="number" class="form-control" id="txtmontoOC" disabled>
						I.G.V(18%):
						<input type="number" class="form-control" id="txtigvOC" disabled>
						Monto Total:
						<input type="number" class="form-control" id="txtmontototalOC" disabled><br>
				</div>
			</fieldset>
			</div><br>
			<div class="row">
				<div class="col-md-1">
					<input type="button" class="btn btn-primary" value="Volver">
				</div>
				<div class="col-md-6">
					<input type="button" class="btn btn-success" value="Grabar" id="btnGrabarOC">
				</div><br><br>
			</div>
       </div>

		
		<!-- Modal -->
		<div class="modal fade" id="modalMedicamentosOC" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<!-- Modal Header -->
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">×</span>
							<span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Buscar</h4>
					</div>
            
					<!-- Modal Body -->
					<div class="modal-body">
						<p class="statusMsg"></p>
                			<input type="text" placeholder="Ingrese criterio de búsqueda" class="form-control">
							<br>
							<table class="table table-bordered">
								<thead>
                    				<tr>
                        				<td>Cod. Med</td>
										<td>Medicamento</td>
										<td>Precio</td>
										<td>Stock</td>
										<td>Fec. Venc</td>
										<td>Tipo</td>
										<td>Proveedor</td>
										<td>Opción</td>
									</tr>
								</thead>
								<tbody id="tablaMedicamentosOC">

								</tbody>
							</table>
					</div>
            
					<!-- Modal Footer -->
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
					</div>
				</div>
			</div>
		</div>
</asp:Content>
