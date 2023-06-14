# MediscreenFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Docker
1. Build image

```bash
docker image build -t mediscreenFront .
```

2. Run container

```bash
docker container run --name mediscreenFront -p 8086:80 -d mediscreenFront
```

3. Access the app

```bash
http://localhost:8086
```

## Author

Aimé Malcorps
