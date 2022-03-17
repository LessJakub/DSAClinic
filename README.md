# DSAClinic

## Using .NET to run both Frontend and Backend of the application:
```sh
# After cloning the repository and cd'ing into it:
dotnet run

# Requires .NET 6.0, Angular@12, Node 16.12, Entity Framework and maybe something else.
```

## Using Docker to run Frontend
```sh
# Change directory to ClientApp
cd ClientApp

# Run Docker using pre-set environment:
docker composer up

# Your local frontend runs on localhost:80
# To stop it, use:
docker composer down

# Hot-reload is supported on both Windows and macOS. While your docker is running, you can change
# files inside of ClientApp and changes will be reflected almost instantly.
```

## Using Docker to run Backend .NET
```sh
# Work in progress
```
