using TaxCalculator.Core.Entities;

namespace TaxCalculator.Core.Interfaces
{
    public interface ITaxCalculatorService
    {
        Task<SalaryCalculationResult> CalculateTaxAsync(decimal grossSalary, CancellationToken token);
    }
}
