from rest_framework.routers import DefaultRouter
from app.api.views import *

router = DefaultRouter()
router.register('asistencia', asistenciaViewSet, basename='asistencia')
router.register('alumnos', alumnosViewSet, basename='alumnos')
router.register('empleados', empleadosViewSet, basename='empleados')
router.register('administradores', administradoresViewSet, basename='administradores')
urlpatterns = router.urls