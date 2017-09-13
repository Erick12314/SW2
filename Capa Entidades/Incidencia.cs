using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class Incidencia
    {
        public int IdIncidencia { get; set; }
        public int IdOrdenCompra { get; set; }
        public DateTime Fecha { get; set; }
        public int IdTipoIncidencia { get; set; }
    }
}
