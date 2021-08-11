from django.urls import path

from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name="token_obtain_pair"),

    path('register/', views.createUser, name="users-register"),
    path('profile/', views.getUser, name="users-profile"),
    path('update/', views.updateUser, name="users-update"),

    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUserById, name='admin-user-update'),
    path('delete/<str:pk>/', views.deleteUser, name='admin-user-delete'),
]
