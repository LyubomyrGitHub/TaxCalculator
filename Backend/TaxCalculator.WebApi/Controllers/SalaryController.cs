using Microsoft.AspNetCore.Mvc;
using TaxCalculator.Core.Interfaces;

namespace TaxCalculator.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaryController(ITaxCalculatorService taxCalculatorService, ILogger < SalaryController > logger) : ControllerBase
    {
        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] decimal grossSalary, CancellationToken token)
        {
            var result = await taxCalculatorService.CalculateTaxAsync(grossSalary, token);
            return Ok(result);
        }
    }
}