namespace TaxCalculator.Core.Entities
{
    public class SalaryCalculationResult
    {
        public decimal GrossAnnualSalary { get; set; }
        //public decimal GrossMonthlySalary { get; set; }
        //public decimal NetAnnualSalary { get; set; }
        //public decimal NetMonthlySalary { get; set; }
        //public decimal AnnualTaxPaid { get; set; }
        //public decimal MonthlyTaxPaid { get; set; }
        public decimal GrossMonthlySalary => GrossAnnualSalary / 12;
        public decimal NetAnnualSalary => GrossAnnualSalary - AnnualTaxPaid;
        public decimal NetMonthlySalary => NetAnnualSalary / 12;
        public decimal AnnualTaxPaid { get; set; }
        public decimal MonthlyTaxPaid => AnnualTaxPaid / 12;
    }
}