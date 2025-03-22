namespace TaxCalculator.Core.Models.Results
{
    public class TaxBandResult
    {
        public int LowerLimit { get; set; }
        public int? UpperLimit { get; set; }
        public int TaxRate { get; set; }
    }
}