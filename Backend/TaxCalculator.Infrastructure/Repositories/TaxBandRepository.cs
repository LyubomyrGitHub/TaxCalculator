using Microsoft.EntityFrameworkCore;
using TaxCalculator.Core.Entities;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Infrastructure.Data;

namespace TaxCalculator.Infrastructure.Repositories
{
    public class TaxBandRepository : ITaxBandRepository
    {
        private readonly TaxDbContext _context;

        public TaxBandRepository(TaxDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaxBand>> GetAllAsync()
        {
            return await _context.TaxBands.ToListAsync();
        }
    }
}