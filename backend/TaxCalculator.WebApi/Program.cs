using Microsoft.EntityFrameworkCore;
using TaxCalculator.Core.Interfaces;
using TaxCalculator.Core.Services;
using TaxCalculator.Infrastructure.Data;
using TaxCalculator.Infrastructure.Mappings;
using TaxCalculator.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add CORS Policy for Dev env
if (builder.Environment.IsDevelopment()) 
{
    builder.Services.AddCors(options =>
    {

        options.AddDefaultPolicy(
            policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
    });
}

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TaxDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ITaxBandRepository, TaxBandRepository>();
builder.Services.AddScoped<ITaxCalculatorService, TaxCalculatorService>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();

// Enable CORS before using controllers for Dev env
if (builder.Environment.IsDevelopment())
{
    app.UseCors();
}

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