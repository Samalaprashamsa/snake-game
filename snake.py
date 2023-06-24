class Snake:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.direction = "right"
        self.body = []

    def move(self):
        if self.direction == "up":
            self.y -= 1
        elif self.direction == "down":
            self.y += 1
        elif self.direction == "left":
            self.x -= 1
        elif self.direction == "right":
            self.x += 1

    def change_direction(self, direction):
        if direction == "up" and self.direction != "down":
            self.direction = "up"
        elif direction == "down" and self.direction != "up":
            self.direction = "down"
        elif direction == "left" and self.direction != "right":
            self.direction = "left"
        elif direction == "right" and self.direction != "left":
            self.direction = "right"

    def grow(self):
        self.body.append((self.x, self.y))

    def check_collision(self, game_area):
        if (
            self.x < 0
            or self.x >= game_area
            or self.y < 0
            or self.y >= game_area
            or (self.x, self.y) in self.body
        ):
            return True
        return False
