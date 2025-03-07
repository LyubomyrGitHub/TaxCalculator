namespace TaxCalculator.Core.Utils
{
    public static class RoundUtil
    {
        public static decimal UptoTwoDecimalPoints(decimal result)
        {
            return Math.Round(result, 2, MidpointRounding.AwayFromZero);
        }
    }
}
