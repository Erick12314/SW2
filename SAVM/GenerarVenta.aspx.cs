using Capa_Entidades;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SAVM
{
	public partial class GenerarVenta : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

		[WebMethod]
		public static string RegistrarVenta(string _Codventa, string _FecVenta, decimal _Igv, decimal _Total)
		{
			bool resultado = false;
			Venta venta = new Venta()
			{
				CodVenta = _Codventa,
				FecVenta = _FecVenta,
				Igv = _Igv,
				Total = _Total
			};

			resultado = VentaLN.GetInstance().RegistrarVenta(venta);

			return resultado == true ? "Correcto" : "Incorrecto";
		}
		[WebMethod]
		public static string RegistrarDetalleVenta(decimal _precio, int _cantidad, decimal _subtotal, string _codmedicamento, string _codventa)
		{
			bool resultado = false;
			DetalleVenta detalle = new DetalleVenta()
			{
				Precio = _precio,
				Cantidad = _cantidad,
				Subtotal = _subtotal,
				CodMedicamento = _codmedicamento,
				CodVenta = _codventa
			};

			resultado = VentaLN.GetInstance().RegistrarDetalleVenta(detalle);

			return resultado == true ? "Correcto" : "Incorrecto";
		}

		[WebMethod]
		public static string GenerarNroVenta()
		{
			string resultado = "";

			resultado = VentaLN.GetInstance().GenerarNroVenta();

			return resultado;
		}

	}
}