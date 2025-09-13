# Migraciones

## Crear

``` bash
  dotnet ef migrations add InitialMigration --project src/Infrastructure --startup-project src/Api
```

## Actualizar

``` bash
  dotnet ef database update --project src/Infrastructure --startup-project src/Api
```