using NUnit.Framework;
using TaxCalculator.Core.Utils;

namespace TaxCalculator.Tests
{
    [TestFixture]
    public class RoundUtilTests
    {
        [Test]
        public void UptoTwoDecimalPoints_WhenCalledWithDecimalValue_ShouldRoundCorrectly()
        {
            // Arrange
            decimal input = 2.345m;
            decimal expected = 2.35m;

            // Act
            decimal result = RoundUtil.UptoTwoDecimalPoints(input);

            // Assert
            Assert.AreEqual(expected, result);
        }

        [Test]
        public void UptoTwoDecimalPoints_WhenCalledWithNegativeValue_ShouldRoundCorrectly()
        {
            // Arrange
            decimal input = -2.345m;
            decimal expected = -2.35m;

            // Act
            decimal result = RoundUtil.UptoTwoDecimalPoints(input);

            // Assert
            Assert.AreEqual(expected, result);
        }

        [Test]
        public void UptoTwoDecimalPoints_WhenCalledWithZero_ShouldReturnZero()
        {
            // Arrange
            decimal input = 0.00m;
            decimal expected = 0.00m;

            // Act
            decimal result = RoundUtil.UptoTwoDecimalPoints(input);

            // Assert
            Assert.AreEqual(expected, result);
        }

        [Test]
        public void UptoTwoDecimalPoints_WhenCalledWithWholeNumber_ShouldReturnSameNumber()
        {
            // Arrange
            decimal input = 10m;
            decimal expected = 10m;

            // Act
            decimal result = RoundUtil.UptoTwoDecimalPoints(input);

            // Assert
            Assert.AreEqual(expected, result);
        }
    }
}