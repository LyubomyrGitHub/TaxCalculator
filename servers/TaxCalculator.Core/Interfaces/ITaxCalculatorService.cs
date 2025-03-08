using TaxCalculator.Core.Entities.Results;

namespace TaxCalculator.Core.Interfaces
{
    public interface ITaxCalculatorService
    {
        Task<SalaryCalculationResult> CalculateTaxAsync(decimal grossSalary, CancellationToken token);
    }
}
