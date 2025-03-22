using AutoMapper;
using TaxCalculator.Core.DTOs;
using TaxCalculator.Core.Entities;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Core.Models.Results;
using System;

namespace TaxCalculator.Core.Services
{
    public class TaxCalculatorService : ITaxCalculatorService
    {
        private readonly ITaxBandRepository _taxBandRepository;
        private readonly IMapper _mapper;

        public TaxCalculatorService(ITaxBandRepository taxBandRepository, IMapper mapper)
        {
            _taxBandRepository = taxBandRepository;
            _mapper = mapper;
        }

        public async Task<SalaryCalculationResult> CalculateTaxAsync(decimal grossSalary, CancellationToken token)
        {
            var taxBands = await _taxBandRepository.GetAllAsync(token);
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

            var result = new SalaryCalculationResultDto
            {
                GrossAnnualSalary = grossSalary,
                AnnualTaxPaid = totalTax
            };

            return _mapper.Map<SalaryCalculationResult>(result);
        }

        public async Task<List<TaxBandResult>> GetAllTaxBandAsync(CancellationToken token)
        {
            var taxBands = await _taxBandRepository.GetAllAsync(token);
            return _mapper.Map<List<TaxBand>, List<TaxBandResult>>(taxBands);
        }
    }
}