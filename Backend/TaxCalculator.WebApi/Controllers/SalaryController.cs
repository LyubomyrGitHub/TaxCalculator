using Microsoft.AspNetCore.Mvc;
using TaxCalculator.Core.Interfaces;

namespace TaxCalculator.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaryController : ControllerBase//todo add logger and token
    {
        private readonly ITaxCalculatorService _taxCalculatorService;

        public SalaryController(ITaxCalculatorService taxCalculatorService)
        {
            _taxCalculatorService = taxCalculatorService;
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] decimal grossSalary)
        {
            var result = await _taxCalculatorService.CalculateTaxAsync(grossSalary);
            return Ok(result);
        }
    }
}