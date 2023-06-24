import random

class Food:
    def __init__(self, game_area):
        self.x = random.randint(0, game_area - 1)
        self.y = random.randint(0, game_area - 1)

    def generate(self, game_area):
        self.x = random.randint(0, game_area - 1)
        self.y = random.randint(0, game_area - 1)
