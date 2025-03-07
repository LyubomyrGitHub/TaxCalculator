//var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseAuthorization();

//app.MapControllers();

//app.Run();

using Microsoft.EntityFrameworkCore;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Core.Services;
using TaxCalculator.Infrastructure.Data;
using TaxCalculator.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TaxDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ITaxBandRepository, TaxBandRepository>();
builder.Services.AddScoped<ITaxCalculatorService, TaxCalculatorService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseEndpoints(endpoints => endpoints.MapControllers());

// Initialize database
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TaxDbContext>();
    dbContext.Database.EnsureCreated();
}

app.Run();