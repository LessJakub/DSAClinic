using System.Text;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

// Add services to the container.

services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();

services.AddScoped<ITokenService, TokenService>();

services.AddSwaggerGen();

services.AddCors();

byte[] tokenKey;
if(builder.Configuration["TokenKey"] != null) tokenKey = Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]);
else tokenKey = Encoding.UTF8.GetBytes("super secret dev key");

services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin", "true"));
    options.AddPolicy("IsDoctor", policy => policy.RequireClaim("Doctor", "true"));
    options.AddPolicy("IsRegisterer", policy => policy.RequireClaim("Registerer", "true"));
});

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(tokenKey),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});



services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Currently, this NEEDS to be disabled for Docker to work. Otherwise it tries to use HTTPS for connection which is blocked by CORS.
// app.UseHttpsRedirection();

//Order of next calls is important! UseCors, UseAuthentication, UseAuthorization.
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200", "http://localhost:4200", "http://localhost:80", "http://localhost"));

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();