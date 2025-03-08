# IncomeTaxCalculator

## Overview
This is a solution for a UK Income Tax Calculator built with .NET 9 (backend) and Angular 19 (frontend). It calculates tax based on predefined tax bands stored in an MS SQL Server database and provides a responsive UI.

## Structure
- **Backend/**: .NET 9 Web API with clean architecture.
  - `TaxCalculator.Core/`: Domain entities, DTOs, and services.
  - `TaxCalculator.Infrastructure/`: Data layer with MS SQL Server integration.
  - `TaxCalculator.WebApi/`: RESTful API with Swagger.
  - `TaxCalculator.Tests/`: NUnit tests.
- **Frontend/**: Angular 19 application with Material UI and routing.
  - `TaxCalculator.UI/`: Angular project.

## Dependencies
- **Backend**:
  - Microsoft.EntityFrameworkCore.SqlServer (9.0.0-preview)
  - Swashbuckle.AspNetCore (6.5.0)
  - AutoMapper (13.0.1)
  - NUnit (3.13.2) + Moq (4.18.4)
- **Frontend**:
  - Angular 19
  - @angular/material (19.0.0-next)
  - rxjs (7.8.0)
- **Database**: MS SQL Server

## How to Run
1. **Backend**:
   - Navigate to `Backend/TaxCalculator.WebApi/`.
   - Run `dotnet run`.
   - Access Swagger at `http://localhost:5000/swagger`.
2. **Frontend**:
   - Navigate to `Frontend/TaxCalculator.UI/`.
   - Run `npm install` and `ng serve`.
   - Access the app at `http://localhost:4200`.

## Docker Setup
- Ensure Docker is installed.
- Run `docker-compose up --build` from the root directory.
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:4200`
- SQL Server: `localhost:1433`

## Features
- Clean architecture
- Dependency injection
- Reactive programming with RxJS
- Responsive design with Angular Material
- Form validation
- Loading states
- Unit testing (NUnit + Jasmine/Karma)
- RESTful API with Swagger
- MS SQL Server integration with code-first approach
- AutoMapper for DTO mapping
- CancellationToken support

## Notes
- Update the connection string in `appsettings.json` or Docker environment variables to match your SQL Server setup.