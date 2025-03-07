namespace TaxCalculator.Core.Entities
{
    public class TaxBand
    {
        public int Id { get; set; }
        public int LowerLimit { get; set; }
        public int? UpperLimit { get; set; }
        public int TaxRate { get; set; }
    }
}