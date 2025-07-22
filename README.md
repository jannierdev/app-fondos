
# App Manejo de fondos
## Instalación

Descargamos el repositorio, instalamos dependencias y ejecutamos la app

```bash
  git clone https://github.com/jannierdev/app-fondos.git
```
Entramos a la carpeta del proyecto e instalamos las dependencias

```bash
  cd app-fondos && npm install
```
Ejecutamos la app

```bash
  ionic serve
```

## Generar apk android

Creamos la carpeta android
```bash
  cordova platform add android
```
Luego, construimos la app
```bash
  ionic serve
  cordova build android
```



