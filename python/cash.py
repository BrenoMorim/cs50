import cs50

# Guarantee a valid input from the user
while True:
    n = cs50.get_float("Change owned: ")
    if n > 0:
        break

n *= 100

coin_types = [25, 10, 5, 1]
coins = 0

# Iterating through each type of coin
for coin in coin_types:
    # Getting the amount of coins of this type we can add through an integer division
    coins += n // coin
    # Updating the value of n
    n -= (n // coin) * coin

print(int(coins))