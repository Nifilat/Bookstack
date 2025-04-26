# books/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, recommended_books, search_books

router = DefaultRouter()
# This registers all the standard CRUD routes under /api/books/
router.register('', BookViewSet, basename='books')

urlpatterns = [
    path('recommendations/', recommended_books, name='book-recommendations'),
    path('search/', search_books, name='book-search'),
    path('', include(router.urls)),
]
