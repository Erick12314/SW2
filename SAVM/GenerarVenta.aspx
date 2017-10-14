﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Home.Master" AutoEventWireup="true" CodeBehind="GenerarVenta.aspx.cs" Inherits="SAVM.GenerarVenta" %>
<asp:Content ID="Content_GV" ContentPlaceHolderID="MainContent" runat="server">
	<header class="titulo">
        <div class="container-fluid">
            <h2 style="text-align: left"><strong>Generar Venta</strong></h2>
        </div>
    </header>
	<div class="container-fluid">
		<br>
			<div class="row">
					<fieldset class="col-md-6">
						<legend>Datos del Cliente</legend>
						Dni/RUC
						<div class="row">
							<div class="col-md-11">
							<input type="number" class="form-control" id="txtnumdoc">
							</div>
						</div><br>
						Nombres/Razón Social:
						<div class="row">
							<div class="col-md-11">
							<input type="text" class="form-control" id="txtrs">
							</div>
						</div><br>
					</fieldset>

					<fieldset class="col-md-6">
						<legend>Datos del Medicamento</legend>
						Código:
						<div class="row">
							<div class="col-md-6">
							<input type="text" class="form-control" id="txtcodmedicamento" disabled>
							</div>
							<div class="col-md-6">
								<button type="button" class="btn btn-primary" id="btnBuscarMedicamento" data-toggle="modal" data-target="#modalMedicamentos">Buscar Medicamentos</button>
							</div>
						</div>
						Nombre:
						<div class="row">
							<div class="col-md-11">
							<input type="text" class="form-control" id="txtnombre" disabled>
							</div>
						</div>
						Precio Unit.:
						<div style="width:100px">
						<input type="number" class="form-control" id="txtprecio" disabled>
						</div>
						Cantidad:
						<div class="row">
							<div class="col-md-3">
							<input type="number" class="form-control" id="txtcantidad">
							</div>
							<div class="col-md-6 col-md-offset-3">
								<input type="button" class="btn btn-primary" value="Agregar Medicamento" id="btnAgregar">
							</div>
						</div>.
						<br>
					</fieldset>
			</div><br>	
			<div class="row">
			<fieldset>
				<legend>Datos de la Venta</legend>
				<div class="row">
					<div class="col-md-8 form-inline">
						<label>N° de la Venta:</label>&nbsp;&nbsp;&nbsp;
						<input type="text" class="form-control" style="width: 100px" id="txtnumventa" disabled>
					</div>
						
					<div  class="form-inline col-md-4">
						<label for="">Fecha:</label>&nbsp;&nbsp;&nbsp;
						<input type="text" class="form-control" id="txtfecha" disabled>
					</div>
				</div><br>
	
				<table class="table">
					<thead>
						<tr>
							<td>Cod. Med</td>
							<td>Medicamento</td>
							<td>PUnitario</td>
							<td>Cantidad</td>
							<td>Subtotal</td>
							<td>Eliminar</td>	
						</tr>
					</thead>
					<tbody id="tabladetalleventa">

					</tbody>
				</table>
				<br><br><br><br>
				<div class="col-md-offset-9 col-md-2">
						Monto:
						<input type="text" class="form-control" id="txtmonto" disabled>
						I.G.V(18%):
						<input type="text" class="form-control" id="txtigv" disabled>
						Monto Total:
						<input type="text" class="form-control" id="txtmontototal" disabled><br>
				</div>
			</fieldset>
			</div><br>
			<div class="row">
				<div class="col-md-1">
					<input type="button" class="btn btn-primary" value="Volver">
				</div>
				<div class="col-md-6">
					<input type="button" class="btn btn-success" value="Grabar" id="btnGrabar">
				</div><br><br>
			</div>
       </div>
		
		<!-- Modal -->
		<div class="modal fade" id="modalMedicamentos" role="dialog">
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
								<tbody id="tablaMedicamentosVenta">

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