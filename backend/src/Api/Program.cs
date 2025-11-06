using Domain.Interfaces;
using Application.Services;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Web.Middleware;

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
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=GuideonDb.db", sqliteOptions =>
    {
        sqliteOptions.CommandTimeout(30);
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usar la política de CORS antes de redirección y autorización
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.MapControllers();

app.Run();
