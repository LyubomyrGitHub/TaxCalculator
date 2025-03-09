FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5000

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