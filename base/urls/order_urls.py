from django.urls import path

from base.views import order_views as views

urlpatterns = [
    path('', views.getUserOrders, name="orders"),
    path('add/', views.createOrder, name="create-order"),

    path('<str:id>/', views.getOrder, name="order-details"),
    path('<str:id>/pay/', views.updateOrderToPaid, name="order-pay"),
]
