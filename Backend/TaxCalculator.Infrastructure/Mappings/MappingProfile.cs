using AutoMapper;
using TaxCalculator.Core.DTOs;
using TaxCalculator.Core.Entities.Results;
using TaxCalculator.Core.Utils;

namespace TaxCalculator.Infrastructure.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SalaryCalculationResultDto, SalaryCalculationResult>()
                .ForMember(dest => dest.GrossAnnualSalary, opt => opt.MapFrom(src => RoundUtil.UptoTwoDecimalPoints(src.GrossAnnualSalary)))
                .ForMember(dest => dest.AnnualTaxPaid, opt => opt.MapFrom(src => RoundUtil.UptoTwoDecimalPoints(src.AnnualTaxPaid)))
                .ForMember(dest => dest.GrossMonthlySalary, opt => opt.MapFrom(src => RoundUtil.UptoTwoDecimalPoints(src.GrossAnnualSalary / 12)))
                .ForMember(dest => dest.NetAnnualSalary, opt => opt.MapFrom(src => RoundUtil.UptoTwoDecimalPoints(src.GrossAnnualSalary - src.AnnualTaxPaid)))
                .ForMember(dest => dest.NetMonthlySalary, opt => opt.MapFrom(src => RoundUtil.UptoTwoDecimalPoints((src.GrossAnnualSalary - src.AnnualTaxPaid) / 12)))
                .ForMember(dest => dest.MonthlyTaxPaid, opt => opt.MapFrom(src => RoundUtil.UptoTwoDecimalPoints(src.AnnualTaxPaid / 12)));
        }
    }
}