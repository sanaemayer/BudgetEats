from rest_framework import serializers
from .models import ingredient

class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = ingredient
        fields = ('name', 'store', 'price')