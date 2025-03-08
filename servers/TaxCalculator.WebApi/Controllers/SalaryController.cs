using Microsoft.AspNetCore.Mvc;
using TaxCalculator.Core.Entities.Requests;
using TaxCalculator.Core.Interfaces;

namespace TaxCalculator.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaryController(ITaxCalculatorService taxCalculatorService, ILogger < SalaryController > logger) : ControllerBase
    {
        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] TaxRequest request, CancellationToken token)
        {
            if (request.GrossSalary <= 0)
                return BadRequest("Gross Salary must be greater than zero.");

            var result = await taxCalculatorService.CalculateTaxAsync(request.GrossSalary, token);
            return Ok(result);
        }
    }
}