from django.db import models

class ingredient(models.Model):
    name = models.CharField("Name", max_length=240)
    store = models.CharField("Store", max_length=240)
    price = models.FloatField("Price",)

    def __str__(self):
        return self.name