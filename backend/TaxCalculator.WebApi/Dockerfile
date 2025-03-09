# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TaxCalculator.WebApi/TaxCalculator.WebApi.csproj", "TaxCalculator.WebApi/"]
COPY ["TaxCalculator.Core/TaxCalculator.Core.csproj", "TaxCalculator.Core/"]
COPY ["TaxCalculator.Infrastructure/TaxCalculator.Infrastructure.csproj", "TaxCalculator.Infrastructure/"]
RUN dotnet restore "TaxCalculator.WebApi/TaxCalculator.WebApi.csproj"
COPY TaxCalculator.WebApi/ TaxCalculator.WebApi/
COPY TaxCalculator.Core/ TaxCalculator.Core/
COPY TaxCalculator.Infrastructure/ TaxCalculator.Infrastructure/
WORKDIR "/src/TaxCalculator.WebApi"
RUN dotnet build "TaxCalculator.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TaxCalculator.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaxCalculator.WebApi.dll"]