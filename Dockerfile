# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY API/*.csproj API/
WORKDIR /app/API/
RUN dotnet restore

# Copy everything else and build
WORKDIR /app
COPY . .
# Building .NET part of the application. Switch working directory to /API.
RUN dotnet publish -c Debug -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
ENV ASPNETCORE_ENVIRONMENT=Development
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]
CMD ["dotnet", "src/index.js"]