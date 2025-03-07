using TaxCalculator.Core.Entities.Results;
using TaxCalculator.Core.Interfaces;

namespace TaxCalculator.Core.Services
{
    public class TaxCalculatorService : ITaxCalculatorService
    {
        private readonly ITaxBandRepository _taxBandRepository;

        public TaxCalculatorService(ITaxBandRepository taxBandRepository)
        {
            _taxBandRepository = taxBandRepository;
        }

        public async Task<SalaryCalculationResult> CalculateTaxAsync(decimal grossSalary, CancellationToken token)
        {
            var taxBands = await _taxBandRepository.GetAllAsync(token);
            var result = new SalaryCalculationResult { GrossAnnualSalary = grossSalary };
            decimal totalTax = 0;

            foreach (var band in taxBands.OrderBy(b => b.LowerLimit))
            {
                if (grossSalary <= band.LowerLimit) continue;

                decimal taxableAmount;
                if (band.UpperLimit.HasValue && grossSalary > band.UpperLimit.Value)
                {
                    taxableAmount = band.UpperLimit.Value - band.LowerLimit;
                }
                else
                {
                    taxableAmount = grossSalary - band.LowerLimit;
                }

                totalTax += taxableAmount * band.TaxRate / 100;
            }

            result.AnnualTaxPaid = totalTax;
            result.GrossMonthlySalary = result.GrossAnnualSalary / 12;
            result.NetAnnualSalary = result.GrossAnnualSalary - result.AnnualTaxPaid;
            result.NetMonthlySalary = result.NetAnnualSalary / 12;
            result.MonthlyTaxPaid = result.AnnualTaxPaid / 12;
            return result;
        }
    }
}