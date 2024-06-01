import random, os, time, sys

HORSES = 3
SPEED = 0.4
DISTANCE = 50

class Horse:
	def __init__(self, name):
		self.name = name
		self.position = 0

	def __str__(self):
		return self.name

	def move(self):
		self.position += random.randint(1, 3)

def clear_screen():
    # Clear the screen based on the OS
    if sys.platform.startswith('win'):
    	# For Windows
        os.system('cls')  
    else:
    	# For Linux and macOS
        os.system('clear')  

def config():
	global HORSES, SPEED, DISTANCE
	HORSES = int(input("Enter number of horses: "))
	SPEED = float(input("Enter speed (1-100): "))
	SPEED = max(1, min(SPEED, 100))
	SPEED = (100 - SPEED) / 99 * 0.99 + 0.01
	DISTANCE = int(input("Enter distance (10-100): "))
	DISTANCE = max(10, min(DISTANCE, 100))

def main():
	horses = [Horse(f"Horse {i}") for i in range(1, HORSES+1)]
	print(horses)
	
	while True:
		clear_screen()
		for horse in horses:
			horse.move()
			print(f"{horse}: {'-'*horse.position}")
		
		time.sleep(SPEED)
		if any(horse.position >= DISTANCE for horse in horses):
			break

	print("Winner is", max(horses, key=lambda x: x.position))

if __name__ == "__main__":
	config_game = input("Do you want to configure the game? (y/n): ")
	if config_game.lower() == "y":
		config()
	main()