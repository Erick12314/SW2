﻿using Capa_Entidades;
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
	public partial class Medicamentos : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}
		[WebMethod]
		public static List<Medicamento> ListarMedicamento()
		{
			List<Medicamento> Lista = null;
			Lista = MedicamentoLN.GetInstance().ListarMedicamento();
			return Lista;
		}
	}
}