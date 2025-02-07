from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import ingredient
from .serializers import *

@api_view(['GET', 'POST'])
def ingredient_list(request):
    if request.method == 'GET':
        data = ingredient.objects.all()

        serializer = IngredientSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def ingredient_detail(request, pk):
    try:
        ingredientobj = ingredient.objects.get(pk=pk)
    except ingredient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = IngredientSerializer(ingredientobj, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        ingredientobj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)