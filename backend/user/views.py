from rest_framework import generics, permissions
from .models import File, Folder
from .serializers import *
from .email import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate,logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics


from django.http import JsonResponse
from django.views import View
from rest_framework.generics import UpdateAPIView

# Credentials

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        Folder.objects.get_or_create(name=user.username, user=user)


        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        elif not user.is_active:
            return Response({'error': 'Blocked'}, status=status.HTTP_403_FORBIDDEN)
        
         
        else:
            if not user.is_staff:

                refresh = RefreshToken.for_user(user)
                refresh['username'] = str(user.username)

                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                content = {
                    'userid':user.id,
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'isAdmin': user.is_superuser,
                    # 'isActive':user.is_active
                }
                return Response(content, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'This account is not a user account'}, status=status.HTTP_401_UNAUTHORIZED) 



class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                
                user = serializer.save(is_active=False) 
       
                send_otp(user.email)
                response_data = {
                    'message': 'OTP sent successfully.',
                    'email': user.email  
                }
                return Response(response_data, status=status.HTTP_200_OK)
            
            except Exception as e:
                print(f"Error during user registration: {e}")
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OTPVerificationView(APIView):
    def post(self, request):
        print('register working')
        serializer = OTPVerificationSerializer(data=request.data)
        print(serializer)
        
        if serializer.is_valid():
            print('valid serializer')
            try:
                email = serializer.validated_data.get('email')
                entered_otp = serializer.validated_data.get('otp')
                
                user = User.objects.get(email=email )
                print(user)
                
                if user.otp == entered_otp:
                    print('valid otp')
                    user.is_active = True
                    user.save()
                    Folder.objects.get_or_create(name=user.username, user=user)

                    return Response({'message': 'User registered and verified successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid OTP,Please Check your email and Verify'}, status=status.HTTP_400_BAD_REQUEST)
                
            except User.DoesNotExist:
                return Response({'error': 'User not found or already verified'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                print(f"Error during OTP verification: {e}")
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    



class UserDetails(APIView):
    def get(self, request):
        user = User.objects.get(id=request.user.id)
        print(user.is_superuser)
        data = UserSerializer(user).data
        content = data
        return Response(content)



class FileUploadView(generics.CreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)





class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        parent_id = self.request.query_params.get('parent', None)
        if parent_id:
            return File.objects.filter(user=self.request.user, folder=parent_id)
        return File.objects.filter(user=self.request.user, folder__isnull=True)
    
    

class FolderListCreateView(generics.ListCreateAPIView):
    serializer_class = FolderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        parent_id = self.request.query_params.get('parent', None)
        print(self.request.query_params)
        if parent_id:
            return Folder.objects.filter(user=self.request.user, parent_id=parent_id)
        return Folder.objects.filter(user=self.request.user, parent__isnull=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return Response({'message':'folder created'},status=status.HTTP_201_CREATED)
    



class GetFolderIdByPathView(View):
    def get(self, request):
        path = request.GET.get('path', None)

        if not path or path == '/':
            root_folder = Folder.objects.filter(parent__isnull=True).first()
            if root_folder:
                return JsonResponse({
                    'folderid': root_folder.id,
                    'name': root_folder.name,
                    'path': '/'
                })
            else:
                return JsonResponse({'error': 'Root folder not found'}, status=404)

        # Process the path to find the folder
        folder_names = path.split('/')
        parent = None
        
        try:
            for name in folder_names:
                folder = Folder.objects.get(name=name, parent=parent)
                parent = folder

            return JsonResponse({
                'folderid': folder.id,
                'name': folder.name,
                'path': path
            })
        except Folder.DoesNotExist:
            return JsonResponse({'error': 'Folder not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

class RenameFileView(UpdateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def patch(self, request, *args, **kwargs):
        try:
            file = self.get_object()
        except File.DoesNotExist:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(file, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    





class DeleteFileView(generics.DestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            file = self.get_object()
            file.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except File.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)




class RenameFolderView(UpdateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

    def patch(self, request, *args, **kwargs):
        try:
            file = self.get_object()
        except Folder.DoesNotExist:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(file, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteFolderView(generics.DestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            folder = self.get_object()
            folder.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Folder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
