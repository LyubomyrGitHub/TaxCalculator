using AutoMapper;
using Moq;
using NUnit.Framework;
using TaxCalculator.Core.Entities;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Core.Services;
using TaxCalculator.Infrastructure.Mappings;

namespace TaxCalculator.Tests
{
    public class TaxCalculatorTests
    {
        private TaxCalculatorService _service;
        private Mock<ITaxBandRepository> _mockRepo;
        private IMapper _mapper;

        [SetUp]
        public void Setup()
        {
            _mockRepo = new Mock<ITaxBandRepository>();
            _mockRepo.Setup(repo => repo.GetAllAsync(It.IsAny<CancellationToken>())).ReturnsAsync(new List<TaxBand>
            {
                new TaxBand { LowerLimit = 0, UpperLimit = 5000, TaxRate = 0 },
                new TaxBand { LowerLimit = 5000, UpperLimit = 20000, TaxRate = 20 },
                new TaxBand { LowerLimit = 20000, UpperLimit = null, TaxRate = 40 }
            });

            var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            _mapper = config.CreateMapper();
            _service = new TaxCalculatorService(_mockRepo.Object, _mapper);
        }

        [Test]
        public async Task CalculateTax_10000Salary_ReturnsCorrectTax()
        {
            // Arrange
            // Act
            var result = await _service.CalculateTaxAsync(10000, It.IsAny<CancellationToken>());

            // Assert
            Assert.AreEqual(10000, result.GrossAnnualSalary);
            Assert.AreEqual(833.33, result.GrossMonthlySalary);
            Assert.AreEqual(9000, result.NetAnnualSalary);
            Assert.AreEqual(750, result.NetMonthlySalary);
            Assert.AreEqual(1000, result.AnnualTaxPaid);
            Assert.AreEqual(83.33, result.MonthlyTaxPaid);
        }

        [Test]
        public async Task CalculateTax_40000Salary_ReturnsCorrectTax()
        {
            // Arrange
            // Act
            var result = await _service.CalculateTaxAsync(40000, It.IsAny<CancellationToken>());

            // Assert
            Assert.AreEqual(40000, result.GrossAnnualSalary);
            Assert.AreEqual(3333.33, result.GrossMonthlySalary);
            Assert.AreEqual(29000, result.NetAnnualSalary);
            Assert.AreEqual(2416.67, result.NetMonthlySalary);
            Assert.AreEqual(11000.00, result.AnnualTaxPaid);
            Assert.AreEqual(916.67, result.MonthlyTaxPaid);
        }
    }
}