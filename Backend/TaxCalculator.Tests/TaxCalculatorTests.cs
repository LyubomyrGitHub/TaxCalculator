using Moq;
using NUnit.Framework;
using TaxCalculator.Core.Entities;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Core.Services;

namespace TaxCalculator.Tests
{
    public class TaxCalculatorTests
    {
        private TaxCalculatorService _service;
        private Mock<ITaxBandRepository> _mockRepo;

        [SetUp]
        public void Setup()
        {
            _mockRepo = new Mock<ITaxBandRepository>();
            _mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(new List<TaxBand>
            {
                new TaxBand { LowerLimit = 0, UpperLimit = 5000, TaxRate = 0 },
                new TaxBand { LowerLimit = 5000, UpperLimit = 20000, TaxRate = 20 },
                new TaxBand { LowerLimit = 20000, UpperLimit = null, TaxRate = 40 }
            });
            _service = new TaxCalculatorService(_mockRepo.Object);
        }

        [Test]
        public async Task CalculateTax_10000Salary_ReturnsCorrectTax()
        {
            var result = await _service.CalculateTaxAsync(10000);
            Assert.AreEqual(1000, result.AnnualTaxPaid);
            Assert.AreEqual(9000, result.NetAnnualSalary);
        }

        [Test]
        public async Task CalculateTax_40000Salary_ReturnsCorrectTax()
        {
            var result = await _service.CalculateTaxAsync(40000);
            Assert.AreEqual(11000, result.AnnualTaxPaid);
            Assert.AreEqual(29000, result.NetAnnualSalary);
        }
    }
}