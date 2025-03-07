using TaxCalculator.Core.Entities;

namespace TaxCalculator.Core.Interfaces
{
    public interface ITaxBandRepository
    {
        Task<List<TaxBand>> GetAllAsync();
    }
}