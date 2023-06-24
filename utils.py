import pygame

def draw_grid(screen, game_area, grid_size):
    for x in range(0, game_area, grid_size):
        pygame.draw.line(screen, (255, 255, 255), (x, 0), (x, game_area))
    for y in range(0, game_area, grid_size):
        pygame.draw.line(screen, (255, 255, 255), (0, y), (game_area, y))

def show_game_over(screen, game_area):
    font = pygame.font.Font(None, 36)
    text = font.render("Game Over", True, (255, 255, 255))
    text_rect = text.get_rect(center=(game_area // 2, game_area // 2))
    screen.blit(text, text_rect)

def show_score(screen, score):
    font = pygame.font.Font(None, 24)
    text = font.render(f"Score: {score}", True, (255, 255, 255))
    screen.blit(text, (10, 10))
