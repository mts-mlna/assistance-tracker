from django.db import models

# Create your models here.
class Asistencia(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    hora = models.TimeField(auto_now_add=True)
    fecha = models.DateField(auto_now_add=True)
    materia = models.CharField(max_length=100)
    presente = models.BooleanField(default=False)


    def __str__(self):
       presente = 'Presente' if self.presente else 'Ausente'
       return f"{self.nombre} - {self.fecha} {self.hora}"

class alumnos(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    asistencias = models.ManyToManyField(Asistencia, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - DNI: {self.dni}"


class empleados(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    puesto = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - DNI: {self.dni} - Puesto: {self.puesto}"

class administradores(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - DNI: {self.dni} - Area: {self.area}"