from django.urls import path

from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),

    path('<str:id>/', views.getProduct, name="product"),
    path('update/<str:id>/', views.updateProduct, name="product-update"),
    path('delete/<str:id>/', views.deleteProduct, name="product-delete"),
]
