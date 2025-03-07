using Microsoft.EntityFrameworkCore;
using TaxCalculator.Core.Entities;

namespace TaxCalculator.Infrastructure.Data
{
    public class TaxDbContext : DbContext
    {
        public TaxDbContext(DbContextOptions<TaxDbContext> options) : base(options) { }
        public DbSet<TaxBand> TaxBands { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaxBand>().HasData(
                new TaxBand { Id = 1, LowerLimit = 0, UpperLimit = 5000, TaxRate = 0 },
                new TaxBand { Id = 2, LowerLimit = 5000, UpperLimit = 20000, TaxRate = 20 },
                new TaxBand { Id = 3, LowerLimit = 20000, UpperLimit = null, TaxRate = 40 }
            );
        }
    }
}