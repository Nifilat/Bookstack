from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Book
from .serializers import BookSerializer
import random

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    # filterset_fields = ['genre']
    search_fields = ['title', 'author', 'description']
    
    def get_queryset(self):
        qs = Book.objects.all()
        genre = self.request.query_params.get('genre')
        if genre:
            # iexact = case-insensitive exact match
            qs = qs.filter(genre__iexact=genre)
        return qs

@api_view(['GET'])
def recommended_books(request):
    all_books = list(Book.objects.all())
    recommendations = random.sample(all_books, min(len(all_books), 6))  # Return 6 random books
    serializer = BookSerializer(recommendations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def search_books(request):
    query = request.GET.get('q', '')
    if not query:
        return Response([])

    books = Book.objects.filter(
        title__icontains=query
    ) | Book.objects.filter(
        author__icontains=query
    ) | Book.objects.filter(
        description__icontains=query
    )
    serializer = BookSerializer(books.distinct(), many=True)
    return Response(serializer.data)
