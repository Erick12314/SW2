using Capa_Entidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Datos
{
	public class OrdenCompraDAO
	{
		#region "PATRON SINGLETON"
		private static OrdenCompraDAO ocompra = null;

		private OrdenCompraDAO() { }
		public static OrdenCompraDAO GetInstance()
		{
			if (ocompra == null)
			{
				ocompra = new OrdenCompraDAO();
			}
			return ocompra;
		}
		#endregion

		public string GenerarNroOC()
		{
			string resultado = "C";
			int valor = 0;
			SqlConnection cn = null;
			SqlCommand cmd = null;
			SqlDataReader dr = null;
			try
			{
				cn = Conexion.GetInstance().ConexionDB();

				cmd = new SqlCommand("select top 1 CODORDCOMPRA FROM ORDENDECOMPRA ORDER BY CODORDCOMPRA DESC", cn);
				cn.Open();
				dr = cmd.ExecuteReader();
				if (dr.Read())
				{
					valor = Convert.ToInt32(Convert.ToString(dr[0]).Replace("C", "")) + 1;
					resultado = string.Format(resultado + "{0}", valor);
				}
				else
				{
					resultado = "C1";
				}
			}
			catch (SqlException ex)
			{
				throw ex;
			}
			finally
			{
				cn.Close();
			}
			return resultado;
		}

		public bool RegistrarOC(OrdenCompra obj)
		{
			bool resultado = false;
			SqlConnection cn = null;
			SqlCommand cmd = null;

			try
			{
				cn = Conexion.GetInstance().ConexionDB();

				cmd = new SqlCommand("SP_REGORDENCOMPRA", cn);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@CODORDCOMPRA", obj.CodOrdCompra);
				cmd.Parameters.AddWithValue("@FECORDCOMPRA", obj.FecOrdCompra);
				cmd.Parameters.AddWithValue("@IGV", obj.Igv);
				cmd.Parameters.AddWithValue("@TOTAL", obj.Total);
				cmd.Parameters.AddWithValue("@RUCPRO", obj.RucPro);
				cn.Open();
				resultado = cmd.ExecuteNonQuery() >= 1 ? true : false;

			}
			catch (SqlException ex)
			{
				throw ex;
			}
			finally
			{
				cn.Close();
			}

			return resultado;
		}

		public bool RegistrarDetalleOC(DetalleOrdenCompra obj)
		{
			bool resultado = false;
			SqlConnection cn = null;
			SqlCommand cmd = null;

			try
			{
				cn = Conexion.GetInstance().ConexionDB();

				cmd = new SqlCommand("SP_REGDETALLEORDENCOMPRA", cn);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@PREUNITARIO", obj.Precio);
				cmd.Parameters.AddWithValue("@CANTIDAD", obj.Cantidad);
				cmd.Parameters.AddWithValue("@SUBTOTAL", obj.Subtotal);
				cmd.Parameters.AddWithValue("@CODMEDICAMENTO", obj.CodMedicamento);
				cmd.Parameters.AddWithValue("@CODORDCOMPRA", obj.CodOrdCompra);
				cn.Open();
				resultado = cmd.ExecuteNonQuery() >= 1 ? true : false;

			}
			catch (SqlException ex)
			{
				throw ex;
			}
			finally
			{
				cn.Close();
			}

			return resultado;
		}
		
	}
}
