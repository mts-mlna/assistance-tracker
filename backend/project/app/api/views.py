from rest_framework import viewsets
from app.models import *
from app.api.serializers import *

class asistenciaViewSet(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    serializer_class = asistenciaSerializer

class alumnosViewSet(viewsets.ModelViewSet):
    queryset = alumnos.objects.all()
    serializer_class = alumnosSerializer

class empleadosViewSet(viewsets.ModelViewSet):
    queryset = empleados.objects.all()
    serializer_class = empleadoSerializer  

class administradoresViewSet(viewsets.ModelViewSet):
    queryset = administradores.objects.all()
    serializer_class = adminSerializer