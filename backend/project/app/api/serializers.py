from app.models import *
from rest_framework import serializers

class asistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = '__all__'

class alumnosSerializer(serializers.ModelSerializer):
    class Meta:
        model = alumnos
        fields = '__all__'

class empleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = empleados
        fields = '__all__'
    
class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model = administradores
        fields = '__all__'