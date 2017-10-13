using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class IndicenteProveedor
    {
        public int IdIncPro { get; set; }
        public string FecIncidente { get; set; }
		public string Descripcion { get; set; }
		public long RucPro { get; set; }
		public int IdTipoIncidencia { get; set; }
    }
}
