using Domain.Interfaces;
using Application.Services;
using Application.Interfaces;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Web.Middleware;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Api.Clients;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configurar CORS para permitir el frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IGameRepository, GameRepository>();
builder.Services.AddScoped<IGuideRepository, GuideRepository>();
builder.Services.AddScoped<IScoreRepository, ScoreRepository>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<GameService>();
builder.Services.AddScoped<GuideService>();
builder.Services.AddScoped<ScoreService>();
builder.Services.AddTransient<GlobalExceptionHandlingMiddleware>();


builder.Services.AddHttpClient<Application.Interfaces.IFreeToGameClient, FreeToGameClient>(client =>
{
    client.BaseAddress = new Uri("https://www.freetogame.com");
    client.Timeout = TimeSpan.FromSeconds(30);
    client.DefaultRequestHeaders.Add("Accept", "application/json");
    client.DefaultRequestHeaders.Add("User-Agent", "Guideon-App");
});


builder.Services.AddScoped<Application.Interfaces.IFreeToGameService, FreeToGameService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        "server=localhost;database=guideon;user=root;password=123456789;",
        new MySqlServerVersion(new Version(8, 0, 33)),
        mysqlOptions =>
        {
            mysqlOptions.CommandTimeout(30);
        }
    )
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.MapControllers();

app.Run();
