using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidades
{
    public class DetalleVenta
    {
        public int IdDetalle { get; set; }
        public int IdMedicamento { get; set; }
        public int IdVenta { get; set; }
        public Decimal precio { get; set; }
        public int Cantidad { get; set; }
        public Decimal Subtotal { get; set; }
    }
}
