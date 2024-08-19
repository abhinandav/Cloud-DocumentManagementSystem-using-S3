from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(serializer_class=MyTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('folders/', FolderListCreateView.as_view(), name='folder-list-create'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('otp/', OTPVerificationView.as_view(), name='otp'),
    path('user-details/',UserDetails.as_view(),name='user-details'),

    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('files/', FileListView.as_view(), name='file-list'),
    path('folders/get_folder_id/', GetFolderIdByPathView.as_view(), name='get_folder_id_by_path'),
    path('files/<int:pk>/rename/', RenameFileView.as_view(), name='rename-file'),
    path('files/<int:pk>/delete/', DeleteFileView.as_view(), name='delete-file'),
    path('folder/<int:pk>/rename/', RenameFolderView.as_view(), name='rename-folder'),
    path('folder/<int:pk>/delete/', DeleteFolderView.as_view(), name='delete-folder'),


]
