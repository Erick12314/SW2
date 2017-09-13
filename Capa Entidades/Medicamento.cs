using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class Medicamento
    {
        public int IdMedicamento { get; set; }
        public string Descripcion { get; set; }
        public Decimal PrecioCompra { get; set; }
        public Decimal PrecioVenta { get; set; }
        public int Stock { get; set; }
        public int StockMinimo { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public int IdTipoMedicamento { get; set; }
        public int IdProveedor { get; set; }
    }
}
