using TaxCalculator.Core.Models.Results;

namespace TaxCalculator.Core.Interfaces
{
    public interface ITaxCalculatorService
    {
        Task<SalaryCalculationResult> CalculateTaxAsync(decimal grossSalary, CancellationToken token);
        Task<List<TaxBandResult>> GetAllTaxBandAsync(CancellationToken token);
    }
}