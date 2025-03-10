using Microsoft.EntityFrameworkCore;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Core.Services;
using TaxCalculator.Infrastructure.Data;
using TaxCalculator.Infrastructure.Mappings;
using TaxCalculator.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("ConfiguredOrigins", policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    });
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TaxDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ITaxBandRepository, TaxBandRepository>();
builder.Services.AddScoped<ITaxCalculatorService, TaxCalculatorService>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();
if (builder.Environment.IsDevelopment())
{
    app.UseCors("ConfiguredOrigins");
}
app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.MapControllers();

// Initialize database
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TaxDbContext>();
    dbContext.Database.EnsureCreated();
}

app.Run();