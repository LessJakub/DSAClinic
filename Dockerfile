FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /src
COPY ["my-new-app.csproj", "./"]
RUN dotnet restore "my-new-app.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "my-new-app.csproj" -c Release -o /app/build

# Node
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y build-essential nodejs
# End node

FROM build AS publish
RUN dotnet publish "my-new-app.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "my-new-app.dll"]
