using Microsoft.AspNetCore.Mvc;
using TaxCalculator.Core.Interfaces;

namespace TaxCalculator.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaryController : ControllerBase
    {
        private readonly ITaxCalculatorService _taxCalculatorService;
        private readonly ILogger<SalaryController> _logger;

        public SalaryController(ITaxCalculatorService taxCalculatorService, ILogger<SalaryController> logger)
        {
            _taxCalculatorService = taxCalculatorService;
            _logger = logger;
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] decimal grossSalary)
        {
            var result = await _taxCalculatorService.CalculateTaxAsync(grossSalary);
            return Ok(result);
        }
    }
}