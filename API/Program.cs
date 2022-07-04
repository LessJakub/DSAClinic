using System.Reflection;
using System.Text;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.DependencyInjection;
using API.Entities;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

// Add services to the container.

services.AddControllers();
services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

services.AddEndpointsApiExplorer();

services.AddScoped<ITokenService, TokenService>();

services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });

                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

                options.AddSecurityDefinition("jwt_auth", new OpenApiSecurityScheme {
                    Name = "Bearer",
                    BearerFormat = "JWT",
                    Scheme = "bearer",
                    Description = "Specify the authorization token.",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http
                    });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    { 
                        new OpenApiSecurityScheme 
                        { 
                            Reference = new OpenApiReference 
                            { 
                                Type = ReferenceType.SecurityScheme,
                                Id = "jwt_auth" 
                            } 
                        },
                    new string[] { } 
                    } 
                });
            });



services.AddCors();

byte[] tokenKey;
if(builder.Configuration["TokenKey"] != null) tokenKey = Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]);
else tokenKey = Encoding.UTF8.GetBytes("super secret dev key");

//services.AddDefaultIdentity<IdentityUser>()
/*
services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireClaim("Admin", "true"));
    options.AddPolicy("Doctor", policy => policy.RequireClaim("Doctor", "true"));
    options.AddPolicy("Registrant", policy => policy.RequireClaim("Registrant", "true"));
    options.AddPolicy("LabSupervisor", policy => policy.RequireClaim("LabSupervisor", "true"));
    options.AddPolicy("LabTechnician", policy => policy.RequireClaim("LabTechnician", "true"));
});
*/
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
    options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

services.AddCoreAdmin();

//services.AddDefaultIdentity<AppUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<DataContext>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options =>{ 
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1");
                    options.EnableTryItOutByDefault();
                    options.EnablePersistAuthorization();
                    });
}

//app.UseCoreAdminCustomUrl("admin");
// Currently, this NEEDS to be disabled for Docker to work. Otherwise it tries to use HTTPS for connection which is blocked by CORS.
// app.UseHttpsRedirection();

//Order of next calls is important! UseCors, UseAuthentication, UseAuthorization.
//app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200", "http://localhost:4200", "http://localhost:80", "http://localhost"));
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthentication();

app.UseRouting();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.UseCoreAdminCustomTitle("Admin");
app.UseCoreAdminCustomUrl("admin");
app.UseCoreAdminCustomAuth((serviceProvider) => Task.FromResult(true));

app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapFallbackToController("Index", "Fallback");
});

app.Run();