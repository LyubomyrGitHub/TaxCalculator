using AutoMapper;
using Moq;
using NUnit.Framework;
using TaxCalculator.Core.Entities;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Core.Models.Results;
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

        [Test]
        public async Task GetAllTaxBandAsync_ReturnsMappedTaxBands()
        {
            // Arrange
            var taxBands = new List<TaxBand>
            {
                new TaxBand { LowerLimit = 0, UpperLimit = 20000, TaxRate = 20 },
                new TaxBand { LowerLimit = 20000, UpperLimit = null, TaxRate = 40 }
            };
            _mockRepo.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>())).ReturnsAsync(taxBands);

            var expectedResults = new List<TaxBandResult>
            {
                new TaxBandResult { LowerLimit = 0, UpperLimit = 20000, TaxRate = 20 },
                new TaxBandResult { LowerLimit = 20000, UpperLimit = null, TaxRate = 40 }
            };

            // Act
            var result = await _service.GetAllTaxBandAsync(CancellationToken.None);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result[0].LowerLimit, Is.EqualTo(expectedResults[0].LowerLimit));
            Assert.That(result[0].UpperLimit, Is.EqualTo(expectedResults[0].UpperLimit));
            Assert.That(result[0].TaxRate, Is.EqualTo(expectedResults[0].TaxRate));
            Assert.That(result[1].LowerLimit, Is.EqualTo(expectedResults[1].LowerLimit));
            Assert.That(result[1].UpperLimit, Is.EqualTo(expectedResults[1].UpperLimit));
            Assert.That(result[1].TaxRate, Is.EqualTo(expectedResults[1].TaxRate));
            _mockRepo.Verify(r => r.GetAllAsync(It.IsAny<CancellationToken>()), Times.Once());
        }

        [Test]
        public async Task GetAllTaxBandAsync_EmptyList_ReturnsEmptyList()
        {
            // Arrange
            _mockRepo.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>())).ReturnsAsync(new List<TaxBand>());

            // Act
            var result = await _service.GetAllTaxBandAsync(CancellationToken.None);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(0));
            _mockRepo.Verify(r => r.GetAllAsync(It.IsAny<CancellationToken>()), Times.Once());
        }

        [Test]
        public void GetAllTaxBandAsync_CancellationRequested_ThrowsOperationCanceledException()
        {
            // Arrange
            var cts = new CancellationTokenSource();
            cts.Cancel();
            _mockRepo.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>())).Throws(new OperationCanceledException());

            // Act
            // Assert
            var exception = Assert.ThrowsAsync<OperationCanceledException>(async () =>
                await _service.GetAllTaxBandAsync(cts.Token));
            Assert.That(exception.Message, Is.EqualTo("The operation was canceled."));
            _mockRepo.Verify(r => r.GetAllAsync(It.IsAny<CancellationToken>()), Times.Once());
        }

        [Test]
        public void GetAllTaxBandAsync_RepositoryThrowsException_PropagatesException()
        {
            // Arrange
            var exceptionMessage = "Database error";
            _mockRepo.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>())).Throws(new Exception(exceptionMessage));

            // Act
            // Assert
            var exception = Assert.ThrowsAsync<Exception>(async () =>
                await _service.GetAllTaxBandAsync(CancellationToken.None));
            Assert.That(exception.Message, Is.EqualTo(exceptionMessage));
            _mockRepo.Verify(r => r.GetAllAsync(It.IsAny<CancellationToken>()), Times.Once());
        }
    }
}