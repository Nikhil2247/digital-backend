@echo off
echo Generating NestJS Modules, Services, and Controllers...

REM Core Modules
call nest g module user
call nest g module event
call nest g module table
call nest g module menu
call nest g module order
call nest g module websocket

REM Services
call nest g service auth
call nest g service user
call nest g service event
call nest g service table
call nest g service menu
call nest g service order
call nest g service websocket

REM Controllers
call nest g controller auth
call nest g controller user
call nest g controller event
call nest g controller table
call nest g controller menu
call nest g controller order
call nest g controller websocket

echo All modules, services, and controllers generated successfully!
pause
